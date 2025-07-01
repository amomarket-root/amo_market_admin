<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\PrivacyPolicyService;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    protected $privacyPolicyService;

    public function __construct(PrivacyPolicyService $privacyPolicyService)
    {
        $this->privacyPolicyService = $privacyPolicyService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $privacyPolicies = $this->privacyPolicyService->getPaginate($request->all());

            if ($privacyPolicies->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Privacy Policies Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Privacy Policies Retrieved Successfully.',
                'data'    => $privacyPolicies,
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
            $validator = $this->privacyPolicyService->validateCreatePrivacyPolicyData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privacyPolicy = $this->privacyPolicyService->createPrivacyPolicy($request);

            return response()->json([
                'status'  => true,
                'message' => 'Privacy Policy Added Successfully.',
                'data'    => $privacyPolicy,
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
            $validator = $this->privacyPolicyService->validatePrivacyPolicyId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privacyPolicy = $this->privacyPolicyService->getPrivacyPolicyById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Privacy Policy Retrieved Successfully.',
                'data'    => $privacyPolicy,
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
            $validator = $this->privacyPolicyService->validateUpdatePrivacyPolicyData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privacyPolicy = $this->privacyPolicyService->updatePrivacyPolicy($request);

            return response()->json([
                'status'  => true,
                'message' => 'Privacy Policy Updated Successfully.',
                'data'    => $privacyPolicy,
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
            $validator = $this->privacyPolicyService->validatePrivacyPolicyId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privacyPolicy = $this->privacyPolicyService->deletePrivacyPolicy($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Privacy Policy Deleted Successfully.',
                'data'    => $privacyPolicy,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
