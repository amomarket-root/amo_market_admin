<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class CategoryService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return Category::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Category::with('shop')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateCategoryData($data)
    {
        return Validator::make($data, [
            'category_name'      => 'required|string|unique:categories,name',
            'shop_name'          => 'nullable|string',
            'description'        => 'nullable|string',
            'status'             => 'required|numeric',
            'content_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_file'         => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    }

    public function createCategory($data)
    {
        $contentImageUrl = null;
        $imageUrl        = null;
        if (isset($data['content_image_file']) && $data['content_image_file'] instanceof UploadedFile) {
            $name            = $data['category_name'];
            $dir_path        = '/category/content_image/'.$name;
            $contentImageUrl = $this->fileHandlerService->saveFileToStorage($data['content_image_file'], $dir_path);
        }
        if (isset($data['image_file']) && $data['image_file'] instanceof UploadedFile) {
            $name     = $data['category_name'];
            $dir_path = '/category/image/'.$name;
            $imageUrl = $this->fileHandlerService->saveFileToStorage($data['image_file'], $dir_path);
        }

        return Category::create([
            'name'          => $data['category_name'],
            'shop_id'       => $data['shop_name'],
            'description'   => $data['description'],
            'content_image' => $contentImageUrl,
            'image'         => $imageUrl,
            'status'        => $data['status'],
        ]);
    }

    public function validateCategoryId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:categories,id',
        ]);
    }

    public function getCategoryById($id)
    {
        return Category::findOrFail($id);
    }

    public function validateUpdateCategoryData($data)
    {
        return Validator::make($data, [
            'category_id'        => 'required|string|exists:categories,id',
            'category_name'      => 'required|string',
            'shop_name'          => 'nullable|string',
            'description'        => 'nullable|string',
            'status'             => 'required|numeric',
            'content_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_file'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    }

    public function updateCategory($data)
    {
        $category = Category::findOrFail($data['category_id']);

        $contentImageUrl = null;
        $imageUrl        = null;
        if (isset($data['content_image_file']) && $data['content_image_file'] instanceof UploadedFile) {
            $name            = $data['category_name'];
            $dir_path        = '/category/content_image/'.$name;
            $contentImageUrl = $this->fileHandlerService->saveFileToStorage($data['content_image_file'], $dir_path);
        } else {
            $contentImageUrl = $category->content_image;
        }

        if (isset($data['image_file']) && $data['image_file'] instanceof UploadedFile) {
            $name     = $data['category_name'];
            $dir_path = '/category/image/'.$name;
            $imageUrl = $this->fileHandlerService->saveFileToStorage($data['image_file'], $dir_path);
        } else {
            $imageUrl = $category->image;
        }

        $category->update([
            'name'          => $data['category_name'],
            'shop_id'       => $data['shop_name'],
            'description'   => $data['description'],
            'content_image' => $contentImageUrl,
            'image'         => $imageUrl,
            'status'        => $data['status'],
        ]);

        return $category;
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);

        if ($category->content_image) {
            $this->fileHandlerService->deleteFileFromStorage($category->content_image);
        }
        if ($category->image) {
            $this->fileHandlerService->deleteFileFromStorage($category->image);
        }
        $category->delete();

        return $category;
    }
}
