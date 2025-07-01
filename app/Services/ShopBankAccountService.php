<?php

namespace App\Services;

use App\Models\ShopBankAccount;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ShopBankAccountService
{
    public function getAll()
    {
        return ShopBankAccount::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return ShopBankAccount::with('shop')
            ->orderBy($sortBy, $sortOrder)
            ->paginate($pageSize);
    }

    public function validateCreateAccountData($data)
    {
        return Validator::make($data, [
            'shop_id'             => 'required|uuid|exists:shops,id',
            'account_holder_name' => 'required|string|max:255',
            'account_number'      => 'required|string|max:50|unique:shop_bank_accounts,account_number',
            'bank_name'           => 'required|string|max:255',
            'branch_name'         => 'required|string|max:255',
            'ifsc_code'           => 'required|string|max:20',
            'account_type'        => 'required|string|in:savings,current',
            'upi_id'              => 'nullable|string|max:255',
            'is_verified'         => 'boolean',
        ]);
    }

    public function createAccount($data)
    {
        return ShopBankAccount::create([
            'shop_id'             => $data['shop_id'],
            'account_holder_name' => $data['account_holder_name'],
            'account_number'      => $data['account_number'],
            'bank_name'           => $data['bank_name'],
            'branch_name'         => $data['branch_name'],
            'ifsc_code'           => $data['ifsc_code'],
            'account_type'        => $data['account_type'],
            'upi_id'              => $data['upi_id']      ?? null,
            'is_verified'         => $data['is_verified'] ?? false,
        ]);
    }

    public function validateAccountId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:shop_bank_accounts,id',
        ]);
    }

    public function getAccountById($id)
    {
        return ShopBankAccount::with('shop')->findOrFail($id);
    }

    public function validateUpdateAccountData($data)
    {
        return Validator::make($data, [
            'id'                  => 'required|uuid|exists:shop_bank_accounts,id',
            'shop_id'             => 'required|uuid|exists:shops,id',
            'account_holder_name' => 'required|string|max:255',
            'account_number'      => 'required|string|max:50|unique:shop_bank_accounts,account_number,'.$data['id'],
            'bank_name'           => 'required|string|max:255',
            'branch_name'         => 'required|string|max:255',
            'ifsc_code'           => 'required|string|max:20',
            'account_type'        => 'required|string|in:savings,current',
            'upi_id'              => 'nullable|string|max:255',
            'is_verified'         => 'boolean',
        ]);
    }

    public function updateAccount($data)
    {
        $account = ShopBankAccount::findOrFail($data['id']);

        $account->update([
            'shop_id'             => $data['shop_id'],
            'account_holder_name' => $data['account_holder_name'],
            'account_number'      => $data['account_number'],
            'bank_name'           => $data['bank_name'],
            'branch_name'         => $data['branch_name'],
            'ifsc_code'           => $data['ifsc_code'],
            'account_type'        => $data['account_type'],
            'upi_id'              => $data['upi_id']      ?? $account->upi_id,
            'is_verified'         => $data['is_verified'] ?? $account->is_verified,
        ]);

        return $account;
    }

    public function deleteAccount($id)
    {
        $account = ShopBankAccount::findOrFail($id);
        $account->delete();

        return $account;
    }

    public function verifyAccountWithCashfree($accountId)
    {
        try {
            // Get bank account details with shop relationship
            $bankAccount = ShopBankAccount::with('shop.user')->findOrFail($accountId);

            // Validate required fields
            if (empty($bankAccount->account_number) || empty($bankAccount->ifsc_code) || empty($bankAccount->account_holder_name)) {
                throw new \Exception('Missing required bank account details');
            }

            // Prepare request data for Cashfree
            $requestData = [
                'bank_account' => $bankAccount->account_number,
                'ifsc'         => $bankAccount->ifsc_code,
                'name'         => $bankAccount->account_holder_name,
                // Phone is optional but recommended
                'phone' => $bankAccount->shop->user->phone ?? '0000000000',
            ];

            // Make API request to Cashfree
            $response = Http::withHeaders([
                'x-client-id'     => config('services.cashfree.api_id'),
                'x-client-secret' => config('services.cashfree.secret_key'),
                'Content-Type'    => 'application/json',
                'x-api-version'   => config('services.cashfree.version'),
            ])->post(config('services.cashfree.base_url').'/verification/bank-account/sync', $requestData);

            // Handle response
            if ($response->failed()) {
                throw new \Exception('Cashfree API error: '.$response->body());
            }

            $responseData = $response->json();

            // Determine verification status based on Cashfree response
            $isValid        = $responseData['account_status'] === 'VALID';
            $nameMatchScore = $responseData['name_match_score'] ?? 0;

            // Update verification status
            $bankAccount->update([
                'is_verified'           => $isValid,
                'verification_response' => $responseData,
                'name_match_score'      => $nameMatchScore,
            ]);

            return [
                'success'           => true,
                'message'           => 'Bank account validated successfully',
                'is_valid'          => $isValid,
                'cashfree_response' => $responseData,
                'name_match_score'  => $nameMatchScore,
            ];
        } catch (\Exception $e) {
            Log::error("Cashfree Shop Bank verification failed: {$e->getMessage()}", [
                'account_id' => $accountId,
                'trace'      => $e->getTraceAsString(),
            ]);

            return [
                'success'           => false,
                'message'           => 'Bank verification service temporarily unavailable',
                'cashfree_response' => null,
            ];
        }
    }
}
