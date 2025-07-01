<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Models\DeliveryPersonBankAccount;
use App\Services\DeliveryPersonBankAccountService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class DeliveryPersonBankAccountController extends Controller
{
    protected $bankAccountService;

    public function __construct(DeliveryPersonBankAccountService $bankAccountService)
    {
        $this->bankAccountService = $bankAccountService;
    }

    public function getAll()
    {
        $accounts = $this->bankAccountService->getAll();

        if ($accounts->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Bank Accounts Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Bank Accounts Retrieved Successfully.',
            'data'    => $accounts,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $accounts = $this->bankAccountService->getPaginate($request->all());

            if ($accounts->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Bank Accounts Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Bank Accounts Retrieved Successfully.',
                'data'    => $accounts,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $validator = $this->bankAccountService->validateCreateAccountData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $account = $this->bankAccountService->createAccount($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Bank Account Added Successfully.',
                'data'    => $account,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function get(Request $request)
    {
        try {
            $validator = $this->bankAccountService->validateAccountId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $account = $this->bankAccountService->getAccountById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Bank Account Retrieved Successfully.',
                'data'    => $account,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $validator = $this->bankAccountService->validateUpdateAccountData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $account = $this->bankAccountService->updateAccount($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Bank Account Updated Successfully.',
                'data'    => $account,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $validator = $this->bankAccountService->validateAccountId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $account = $this->bankAccountService->deleteAccount($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Bank Account Deleted Successfully.',
                'data'    => $account,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function verify(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'id' => 'required|uuid|exists:delivery_person_bank_accounts,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $validator->errors(),
            ], 422);
        }

        try {
            // Verify authorization
            $bankAccount = DeliveryPersonBankAccount::find($request->id);
            $user        = Auth::user();
            if (! $user) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Unauthorized action',
                ], 403);
            }

            // Process verification
            $result = $this->bankAccountService->verifyAccountWithCashfree($request->id);

            return response()->json([
                'status'           => $result['success'],
                'message'          => $result['message'],
                'is_valid'         => $result['is_valid']          ?? false,
                'name_match_score' => $result['name_match_score']  ?? 0,
                'data'             => $result['cashfree_response'] ?? null,
            ], $result['success'] ? 200 : 400);
        } catch (\Throwable $th) {
            Log::error('Bank verification controller error', [
                'error'   => $th->getMessage(),
                'request' => $request->all(),
            ]);

            return response()->json([
                'status'  => false,
                'message' => 'Verification processing error',
                'error'   => env('APP_DEBUG') ? $th->getMessage() : null,
            ], 500);
        }
    }
}
