<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\SecurityPageService;
use Illuminate\Http\Request;

class SecurityPageController extends Controller
{
    protected $securityPageService;

    public function __construct(SecurityPageService $securityPageService)
    {
        $this->securityPageService = $securityPageService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $securityPages = $this->securityPageService->getPaginate($request->all());

            if ($securityPages->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Security Pages Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Security Pages Retrieved Successfully.',
                'data'    => $securityPages,
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
            $validator = $this->securityPageService->validateCreateSecurityPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $securityPage = $this->securityPageService->createSecurityPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Security Page Added Successfully.',
                'data'    => $securityPage,
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
            $validator = $this->securityPageService->validateSecurityPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $securityPage = $this->securityPageService->getSecurityPageById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Security Page Retrieved Successfully.',
                'data'    => $securityPage,
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
            $validator = $this->securityPageService->validateUpdateSecurityPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $securityPage = $this->securityPageService->updateSecurityPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Security Page Updated Successfully.',
                'data'    => $securityPage,
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
            $validator = $this->securityPageService->validateSecurityPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $securityPage = $this->securityPageService->deleteSecurityPage($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Security Page Deleted Successfully.',
                'data'    => $securityPage,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
