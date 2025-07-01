<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Services\SubCategoryService;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    protected $subCategoryService;

    public function __construct(SubCategoryService $subCategoryService)
    {
        $this->subCategoryService = $subCategoryService;
    }

    public function getAll()
    {
        $subcategories = $this->subCategoryService->getAll();

        if ($subcategories->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Subcategories List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Subcategories Retrieved Successfully.',
            'data'    => $subcategories,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $subcategories = $this->subCategoryService->getPaginate($request->all());

            if ($subcategories->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Subcategories Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Subcategories Retrieved Successfully.',
                'data'    => $subcategories,
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
            $validator = $this->subCategoryService->validateCreateSubCategoryData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $subcategory = $this->subCategoryService->createSubCategory($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Subcategory Added Successfully.',
                'data'    => $subcategory,
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
            $validator = $this->subCategoryService->validateSubCategoryId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $subcategory = $this->subCategoryService->getSubCategoryById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Subcategory Retrieved Successfully.',
                'data'    => $subcategory,
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
            $validator = $this->subCategoryService->validateUpdateSubCategoryData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $subcategory = $this->subCategoryService->updateSubCategory($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Subcategory Updated Successfully.',
                'data'    => $subcategory,
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
            $validator = $this->subCategoryService->validateSubCategoryId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $subcategory = $this->subCategoryService->deleteSubCategory($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Subcategory Deleted Successfully.',
                'data'    => $subcategory,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
