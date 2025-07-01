<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class ProductService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return Product::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Product::with('sub_category')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateProductData($data)
    {
        return Validator::make($data, [
            'product_name'   => 'required|string|unique:products,name',
            'sub_category'   => 'nullable|exists:sub_categories,id',
            'image_file'     => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'about_product'  => 'nullable|string',
            'product_weight' => 'required|string',
            'selling_price'  => 'required|numeric',
            'original_price' => 'required|numeric',
            'discount'       => 'nullable|string',
            'delivery_time'  => 'required|numeric',
            'total_unit'     => 'required|numeric',
            'product_code'   => 'nullable|string',
            'status'         => 'required|numeric',
        ]);
    }

    public function createProduct($data)
    {
        $productImageUrl = null;

        if (isset($data['image_file']) && $data['image_file'] instanceof UploadedFile) {
            $dirPath         = '/products/images/'.$data['product_name'];
            $productImageUrl = $this->fileHandlerService->saveFileToStorage($data['image_file'], $dirPath);
        }

        return Product::create([
            'sub_category_id' => $data['sub_category'],
            'name'            => $data['product_name'],
            'image'           => $productImageUrl,
            'weight'          => $data['product_weight'],
            'price'           => $data['selling_price'],
            'original_price'  => $data['original_price'],
            'discount'        => $data['discount'],
            'delivery_time'   => $data['delivery_time'],
            'about_product'   => $data['about_product'],
            'unit'            => $data['total_unit'],
            'product_code'    => $data['product_code'] ?? null,
            'status'          => $data['status'],
        ]);
    }

    public function validateProductId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:products,id',
        ]);
    }

    public function getProductById($id)
    {
        return Product::with('sub_category')->findOrFail($id);
    }

    public function validateUpdateProductData($data)
    {
        return Validator::make($data, [
            'product_id'     => 'required|string|exists:products,id',
            'product_name'   => 'required|string',
            'sub_category'   => 'nullable|exists:sub_categories,id',
            'image_file'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'about_product'  => 'nullable|string',
            'product_weight' => 'required|string',
            'selling_price'  => 'required|numeric',
            'original_price' => 'required|numeric',
            'discount'       => 'nullable|string',
            'delivery_time'  => 'required|numeric',
            'total_unit'     => 'required|numeric',
            'product_code'   => 'nullable|string',
            'status'         => 'required|numeric',
        ]);
    }

    public function updateProduct($data)
    {
        $product = Product::findOrFail($data['product_id']);

        $productImageUrl = $product->image;

        if (isset($data['image_file']) && $data['image_file'] instanceof UploadedFile) {
            $dirPath         = '/subcategory/images/'.$data['product_name'];
            $productImageUrl = $this->fileHandlerService->saveFileToStorage($data['image_file'], $dirPath);
        }

        $product->update([
            'sub_category_id' => $data['sub_category'],
            'name'            => $data['product_name'],
            'image'           => $productImageUrl,
            'weight'          => $data['product_weight'],
            'price'           => $data['selling_price'],
            'original_price'  => $data['original_price'],
            'discount'        => $data['discount'],
            'delivery_time'   => $data['delivery_time'],
            'about_product'   => $data['about_product'],
            'unit'            => $data['total_unit'],
            'product_code'    => $data['product_code'] ?? null,
            'status'          => $data['status'],
        ]);

        return $product;
    }

    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            $this->fileHandlerService->deleteFileFromStorage($product->image);
        }

        $product->delete();

        return $product;
    }
}
