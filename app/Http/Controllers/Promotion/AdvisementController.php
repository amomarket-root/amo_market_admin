<?php

namespace App\Http\Controllers\Promotion;

use App\Http\Controllers\Controller;
use App\Services\AdvisementService;
use Illuminate\Http\Request;

class AdvisementController extends Controller
{
    protected $advisementService;

    public function __construct(AdvisementService $advisementService)
    {
        $this->advisementService = $advisementService;
    }

    public function getAll()
    {
        $advisementPages = $this->advisementService->getAll();

        if ($advisementPages->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Advisement Pages Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Advisement Pages Retrieved Successfully.',
            'data'    => $advisementPages,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $advisementPages = $this->advisementService->getPaginate($request->all());

            if ($advisementPages->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Advisement Pages Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Advisement Pages Retrieved Successfully.',
                'data'    => $advisementPages,
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
            // Validate request data
            $validator = $this->advisementService->validateCreateAdvisementPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $advisementPage = $this->advisementService->createAdvisementPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Advisement Page Added Successfully.',
                'data'    => $advisementPage,
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
            $validator = $this->advisementService->validateAdvisementPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $advisementPage = $this->advisementService->getAdvisementPageById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Advisement Page Retrieved Successfully.',
                'data'    => $advisementPage,
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
            // Validate request data
            $validator = $this->advisementService->validateUpdateAdvisementPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $advisementPage = $this->advisementService->updateAdvisementPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Advisement Page Updated Successfully.',
                'data'    => $advisementPage,
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
            $validator = $this->advisementService->validateAdvisementPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $advisementPage = $this->advisementService->deleteAdvisementPage($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Advisement Page Deleted Successfully.',
                'data'    => $advisementPage,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
