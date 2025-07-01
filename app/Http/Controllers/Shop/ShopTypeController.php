<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Services\ShopTypeService;
use Illuminate\Http\Request;

class ShopTypeController extends Controller
{
    protected $shopTypeService;

    public function __construct(ShopTypeService $shopTypeService)
    {
        $this->shopTypeService = $shopTypeService;
    }

    public function getAll()
    {
        $shopTypes = $this->shopTypeService->getAll();

        if ($shopTypes->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Shop Types Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Shop Types Retrieved Successfully.',
            'data'    => $shopTypes,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $shopTypes = $this->shopTypeService->getPaginate($request->all());

            if ($shopTypes->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Shop Types Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Shop Types Retrieved Successfully.',
                'data'    => $shopTypes,
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
            $validator = $this->shopTypeService->validateShopTypeId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopType = $this->shopTypeService->getShopTypeById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Type Retrieved Successfully.',
                'data'    => $shopType,
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
            $validator = $this->shopTypeService->validateCreateShopTypeData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopType = $this->shopTypeService->createShopType($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Shop Type Added Successfully.',
                'data'    => $shopType,
            ], 201);
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
            $validator = $this->shopTypeService->validateUpdateShopTypeData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopType = $this->shopTypeService->updateShopType($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Shop Type Updated Successfully.',
                'data'    => $shopType,
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
            $validator = $this->shopTypeService->validateShopTypeId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopType = $this->shopTypeService->deleteShopType($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Type Deleted Successfully.',
                'data'    => $shopType,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
