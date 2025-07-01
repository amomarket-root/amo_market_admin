<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function getAll()
    {
        $products = $this->productService->getAll();
        if ($products->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Products List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Products Retrieved Successfully.',
            'data'    => $products,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $products = $this->productService->getPaginate($request->all());

            if ($products->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Products Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Products Retrieved Successfully.',
                'data'    => $products,
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
            $validator = $this->productService->validateCreateProductData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $product = $this->productService->createProduct($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Product Added Successfully.',
                'data'    => $product,
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
            $validator = $this->productService->validateProductId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $product = $this->productService->getProductById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Product Retrieved Successfully.',
                'data'    => $product,
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
            $validator = $this->productService->validateUpdateProductData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $product = $this->productService->updateProduct($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Product Updated Successfully.',
                'data'    => $product,
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
            $validator = $this->productService->validateProductId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $product = $this->productService->deleteProduct($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Product Deleted Successfully.',
                'data'    => $product,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
