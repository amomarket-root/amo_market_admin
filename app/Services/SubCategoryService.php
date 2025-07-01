<?php

namespace App\Services;

use App\Models\SubCategory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class SubCategoryService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return SubCategory::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return SubCategory::with('category')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateSubCategoryData($data)
    {
        return Validator::make($data, [
            'subcategory_name' => 'required|string|unique:sub_categories,name',
            'category'         => 'nullable|exists:categories,id',
            'image_file'       => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description'      => 'nullable|string',
            'product_code'     => 'nullable|string',
            'status'           => 'required|numeric',
        ]);
    }

    public function createSubCategory($data)
    {
        $subcategoryImageUrl = null;

        if (isset($data['image_file']) && $data['image_file'] instanceof UploadedFile) {
            $dirPath             = '/subcategory/images/'.$data['subcategory_name'];
            $subcategoryImageUrl = $this->fileHandlerService->saveFileToStorage($data['image_file'], $dirPath);
        }

        return SubCategory::create([
            'category_id'  => $data['category'],
            'name'         => $data['subcategory_name'],
            'image'        => $subcategoryImageUrl,
            'description'  => $data['description'],
            'product_code' => $data['product_code'] ?? null,
            'status'       => $data['status'],
        ]);
    }

    public function validateSubCategoryId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:sub_categories,id',
        ]);
    }

    public function getSubCategoryById($id)
    {
        return SubCategory::with('category')->findOrFail($id);
    }

    public function validateUpdateSubCategoryData($data)
    {
        return Validator::make($data, [
            'subcategory_id'   => 'required|string|exists:sub_categories,id',
            'subcategory_name' => 'required|string',
            'category'         => 'nullable|exists:categories,id',
            'image_file'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description'      => 'nullable|string',
            'product_code'     => 'nullable|string',
            'status'           => 'required|numeric',
        ]);
    }

    public function updateSubCategory($data)
    {
        $subcategory = SubCategory::findOrFail($data['subcategory_id']);

        $subcategoryImageUrl = $subcategory->image;

        if (isset($data['image_file']) && $data['image_file'] instanceof UploadedFile) {
            $dirPath             = '/subcategory/images/'.$data['subcategory_name'];
            $subcategoryImageUrl = $this->fileHandlerService->saveFileToStorage($data['image_file'], $dirPath);
        }

        $subcategory->update([
            'category_id'  => $data['category'],
            'name'         => $data['subcategory_name'],
            'image'        => $subcategoryImageUrl,
            'description'  => $data['description'],
            'product_code' => $data['product_code'] ?? null,
            'status'       => $data['status'],
        ]);

        return $subcategory;
    }

    public function deleteSubCategory($id)
    {
        $subcategory = SubCategory::findOrFail($id);

        if ($subcategory->image) {
            $this->fileHandlerService->deleteFileFromStorage($subcategory->image);
        }

        $subcategory->delete();

        return $subcategory;
    }
}
