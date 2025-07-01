<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Services\ShopDocumentService;
use Illuminate\Http\Request;

class ShopDocumentController extends Controller
{
    protected $shopDocumentService;

    public function __construct(ShopDocumentService $shopDocumentService)
    {
        $this->shopDocumentService = $shopDocumentService;
    }

    public function getAll()
    {
        $documents = $this->shopDocumentService->getAll();
        if ($documents->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Shop Documents Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Shop Documents Retrieved Successfully.',
            'data'    => $documents,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $documents = $this->shopDocumentService->getPaginate($request->all());

            if ($documents->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Shop Documents Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Shop Documents Retrieved Successfully.',
                'data'    => $documents,
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
            $validator = $this->shopDocumentService->validateCreateDocumentData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $document = $this->shopDocumentService->createDocument($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Shop Document Added Successfully.',
                'data'    => $document,
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
            $validator = $this->shopDocumentService->validateDocumentId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $document = $this->shopDocumentService->getDocumentById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Document Retrieved Successfully.',
                'data'    => $document,
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
            $validator = $this->shopDocumentService->validateUpdateDocumentData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $document = $this->shopDocumentService->updateDocument($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Shop Document Updated Successfully.',
                'data'    => $document,
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
            $validator = $this->shopDocumentService->validateDocumentId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $document = $this->shopDocumentService->deleteDocument($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Document Deleted Successfully.',
                'data'    => $document,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
