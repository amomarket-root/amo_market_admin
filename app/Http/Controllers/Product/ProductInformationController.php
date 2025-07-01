<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Services\ProductInfoService;
use Illuminate\Http\Request;

class ProductInformationController extends Controller
{
    protected $productInfoService;

    public function __construct(ProductInfoService $productInfoService)
    {
        $this->productInfoService = $productInfoService;
    }

    public function getAll()
    {
        $productsInfo = $this->productInfoService->getAll();
        if ($productsInfo->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Products Information List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Products Information Retrieved Successfully.',
            'data'    => $productsInfo,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $productsInfo = $this->productInfoService->getPaginate($request->all());

            if ($productsInfo->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Product Information Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Product Information Retrieved Successfully.',
                'data'    => $productsInfo,
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
            $validator = $this->productInfoService->validateCreateProductInfoData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $productInfo = $this->productInfoService->createProductInfo($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Product Information Added Successfully.',
                'data'    => $productInfo,
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
            $validator = $this->productInfoService->validateProductInfoId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $productInfo = $this->productInfoService->getProductInfoById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Product Information Retrieved Successfully.',
                'data'    => $productInfo,
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
            // Validate the request data
            $validator = $this->productInfoService->validateUpdateProductInfoData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Update the product information
            $productInfo = $this->productInfoService->updateProductInfo($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Product Information Updated Successfully.',
                'data'    => $productInfo,
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
            $validator = $this->productInfoService->validateProductInfoId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $productInfo = $this->productInfoService->deleteProductInfo($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Product Information Deleted Successfully.',
                'data'    => $productInfo,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
