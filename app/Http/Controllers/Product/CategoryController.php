<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function getAll()
    {
        $categories = $this->categoryService->getAll();

        if ($categories->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Categories List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Categories Retrieved Successfully.',
            'data'    => $categories,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $categories = $this->categoryService->getPaginate($request->all());

            if ($categories->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Categories Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Categories Retrieved Successfully.',
                'data'    => $categories,
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
            $validator = $this->categoryService->validateCreateCategoryData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $category = $this->categoryService->createCategory($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Category Added Successfully.',
                'user'    => $category,
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
            $validator = $this->categoryService->validateCategoryId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $category = $this->categoryService->getCategoryById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Category Retrieved Successfully.',
                'data'    => $category,
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
            $validator = $this->categoryService->validateUpdateCategoryData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $category = $this->categoryService->updateCategory($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Category Updated Successfully.',
                'data'    => $category,
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
            $validator = $this->categoryService->validateCategoryId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $category = $this->categoryService->deleteCategory($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Category Deleted Successfully.',
                'data'    => $category,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
