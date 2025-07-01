<?php

namespace App\Services;

use App\Models\ProductInformation;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class ProductInfoService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return ProductInformation::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return ProductInformation::with('product')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateProductInfoData($data)
    {
        return Validator::make($data, [
            'product_id'                 => 'required|string|exists:products,id',
            'product_type'               => 'nullable|string',
            'product_flavour'            => 'nullable|string',
            'product_Ingredients'        => 'nullable|string',
            'product_attraction'         => 'nullable|string',
            'key_features'               => 'nullable|string',
            'fssai_license'              => 'nullable|string',
            'other_license'              => 'nullable|string',
            'shelf_life'                 => 'nullable|string',
            'manufacturer_details'       => 'nullable|string',
            'seller'                     => 'nullable|string',
            'seller_fssai'               => 'nullable|string',
            'country_of_origin'          => 'nullable|string',
            'state_of_origin'            => 'nullable|string',
            'return_policy'              => 'nullable|string',
            'disclaimer'                 => 'nullable|string',
            'second_unit_weight'         => 'nullable|string',
            'second_unit_price'          => 'nullable|numeric',
            'second_unit_original_price' => 'nullable|numeric',
            'second_unit_discount'       => 'nullable|string',
            'total_second_unit'          => 'nullable|string',
            'second_unit_image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'third_unit_weight'          => 'nullable|string',
            'third_unit_price'           => 'nullable|numeric',
            'third_unit_original_price'  => 'nullable|numeric',
            'third_unit_discount'        => 'nullable|string',
            'total_third_unit'           => 'nullable|string',
            'third_unit_image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_image_one'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_image_two'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_image_three'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_image_four'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_image_five'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_extra_image'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    }

    public function createProductInfo($data)
    {
        $productInfoData = [
            'product_id'                 => $data['product_id'],
            'product_type'               => $data['product_type']               ?? null,
            'product_flavour'            => $data['product_flavour']            ?? null,
            'product_Ingredients'        => $data['product_Ingredients']        ?? null,
            'product_attraction'         => $data['product_attraction']         ?? null,
            'key_features'               => $data['key_features']               ?? null,
            'fssai_license'              => $data['fssai_license']              ?? null,
            'other_license'              => $data['other_license']              ?? null,
            'shelf_life'                 => $data['shelf_life']                 ?? null,
            'manufacturer_details'       => $data['manufacturer_details']       ?? null,
            'seller'                     => $data['seller']                     ?? null,
            'seller_fssai'               => $data['seller_fssai']               ?? null,
            'country_of_origin'          => $data['country_of_origin']          ?? null,
            'state_of_origin'            => $data['state_of_origin']            ?? null,
            'return_policy'              => $data['return_policy']              ?? null,
            'disclaimer'                 => $data['disclaimer']                 ?? null,
            'second_unit_weight'         => $data['second_unit_weight']         ?? null,
            'second_unit_price'          => $data['second_unit_price']          ?? null,
            'second_unit_original_price' => $data['second_unit_original_price'] ?? null,
            'second_unit_discount'       => $data['second_unit_discount']       ?? null,
            'total_second_unit'          => $data['total_second_unit']          ?? null,
            'third_unit_weight'          => $data['third_unit_weight']          ?? null,
            'third_unit_price'           => $data['third_unit_price']           ?? null,
            'third_unit_original_price'  => $data['third_unit_original_price']  ?? null,
            'third_unit_discount'        => $data['third_unit_discount']        ?? null,
            'total_third_unit'           => $data['total_third_unit']           ?? null,
            'status'                     => $data['status']                     ?? 1,
        ];

        // Handle file uploads
        $fileFields = [
            'second_unit_image',
            'third_unit_image',
            'product_image_one',
            'product_image_two',
            'product_image_three',
            'product_image_four',
            'product_image_five',
            'product_extra_image',
        ];

        foreach ($fileFields as $field) {
            if (isset($data[$field]) && $data[$field] instanceof UploadedFile) {
                $dirPath                 = '/products/images/'.$data['product_id'];
                $productInfoData[$field] = $this->fileHandlerService->saveFileToStorage($data[$field], $dirPath);
            }
        }

        return ProductInformation::create($productInfoData);
    }

    public function validateProductInfoId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:product_information,id',
        ]);
    }

    public function getProductInfoById($id)
    {
        return ProductInformation::with('product')->findOrFail($id);
    }

    public function validateUpdateProductInfoData(array $data)
    {
        $rules = [
            'id'                         => 'required|string|exists:product_information,id',
            'product_id'                 => 'required|string|exists:products,id',
            'product_type'               => 'nullable|string',
            'product_flavour'            => 'nullable|string',
            'product_Ingredients'        => 'nullable|string',
            'product_attraction'         => 'nullable|string',
            'key_features'               => 'nullable|string',
            'fssai_license'              => 'nullable|string',
            'other_license'              => 'nullable|string',
            'shelf_life'                 => 'nullable|string',
            'manufacturer_details'       => 'nullable|string',
            'seller'                     => 'nullable|string',
            'seller_fssai'               => 'nullable|string',
            'country_of_origin'          => 'nullable|string',
            'state_of_origin'            => 'nullable|string',
            'return_policy'              => 'nullable|string',
            'disclaimer'                 => 'nullable|string',
            'second_unit_weight'         => 'nullable|string',
            'second_unit_price'          => 'nullable|numeric',
            'second_unit_original_price' => 'nullable|numeric',
            'second_unit_discount'       => 'nullable|string',
            'total_second_unit'          => 'nullable|string',
            'third_unit_weight'          => 'nullable|string',
            'third_unit_price'           => 'nullable|numeric',
            'third_unit_original_price'  => 'nullable|numeric',
            'third_unit_discount'        => 'nullable|string',
            'total_third_unit'           => 'nullable|string',
        ];

        // Add image validation rules only if the field is a file upload
        $imageFields = [
            'second_unit_image',
            'third_unit_image',
            'product_image_one',
            'product_image_two',
            'product_image_three',
            'product_image_four',
            'product_image_five',
            'product_extra_image',
        ];

        foreach ($imageFields as $field) {
            if (isset($data[$field]) && $data[$field] instanceof UploadedFile) {
                $rules[$field] = 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048';
            }
        }

        return Validator::make($data, $rules);
    }

    public function updateProductInfo(array $data)
    {
        // Find the product information by ID
        $productInfo = ProductInformation::findOrFail($data['id']);

        // Handle file uploads for product images
        $imageFields = [
            'second_unit_image'   => '/products/second_unit_images',
            'third_unit_image'    => '/products/third_unit_images',
            'product_image_one'   => '/products/extra_images',
            'product_image_two'   => '/products/extra_images',
            'product_image_three' => '/products/extra_images',
            'product_image_four'  => '/products/extra_images',
            'product_image_five'  => '/products/extra_images',
            'product_extra_image' => '/products/extra_images',
        ];

        foreach ($imageFields as $field => $dirPath) {
            if (isset($data[$field]) && $data[$field] instanceof UploadedFile) {
                // Delete old file if exists
                if ($productInfo->{$field}) {
                    $this->fileHandlerService->deleteFileFromStorage($productInfo->{$field});
                }
                // Save new file
                $data[$field] = $this->fileHandlerService->saveFileToStorage($data[$field], $dirPath);
            } else {
                // Retain the existing file if no new file is uploaded
                $data[$field] = $productInfo->{$field};
            }
        }

        // Update the product information
        $productInfo->update([
            'product_id'                 => $data['product_id']                 ?? $productInfo->product_id,
            'product_type'               => $data['product_type']               ?? $productInfo->product_type,
            'product_flavour'            => $data['product_flavour']            ?? $productInfo->product_flavour,
            'product_Ingredients'        => $data['product_Ingredients']        ?? $productInfo->product_Ingredients,
            'product_attraction'         => $data['product_attraction']         ?? $productInfo->product_attraction,
            'key_features'               => $data['key_features']               ?? $productInfo->key_features,
            'fssai_license'              => $data['fssai_license']              ?? $productInfo->fssai_license,
            'other_license'              => $data['other_license']              ?? $productInfo->other_license,
            'shelf_life'                 => $data['shelf_life']                 ?? $productInfo->shelf_life,
            'manufacturer_details'       => $data['manufacturer_details']       ?? $productInfo->manufacturer_details,
            'seller'                     => $data['seller']                     ?? $productInfo->seller,
            'seller_fssai'               => $data['seller_fssai']               ?? $productInfo->seller_fssai,
            'country_of_origin'          => $data['country_of_origin']          ?? $productInfo->country_of_origin,
            'state_of_origin'            => $data['state_of_origin']            ?? $productInfo->state_of_origin,
            'return_policy'              => $data['return_policy']              ?? $productInfo->return_policy,
            'disclaimer'                 => $data['disclaimer']                 ?? $productInfo->disclaimer,
            'second_unit_weight'         => $data['second_unit_weight']         ?? $productInfo->second_unit_weight,
            'second_unit_price'          => $data['second_unit_price']          ?? $productInfo->second_unit_price,
            'second_unit_original_price' => $data['second_unit_original_price'] ?? $productInfo->second_unit_original_price,
            'second_unit_discount'       => $data['second_unit_discount']       ?? $productInfo->second_unit_discount,
            'total_second_unit'          => $data['total_second_unit']          ?? $productInfo->total_second_unit,
            'second_unit_image'          => $data['second_unit_image']          ?? $productInfo->second_unit_image,
            'third_unit_weight'          => $data['third_unit_weight']          ?? $productInfo->third_unit_weight,
            'third_unit_price'           => $data['third_unit_price']           ?? $productInfo->third_unit_price,
            'third_unit_original_price'  => $data['third_unit_original_price']  ?? $productInfo->third_unit_original_price,
            'third_unit_discount'        => $data['third_unit_discount']        ?? $productInfo->third_unit_discount,
            'total_third_unit'           => $data['total_third_unit']           ?? $productInfo->total_third_unit,
            'third_unit_image'           => $data['third_unit_image']           ?? $productInfo->third_unit_image,
            'product_image_one'          => $data['product_image_one']          ?? $productInfo->product_image_one,
            'product_image_two'          => $data['product_image_two']          ?? $productInfo->product_image_two,
            'product_image_three'        => $data['product_image_three']        ?? $productInfo->product_image_three,
            'product_image_four'         => $data['product_image_four']         ?? $productInfo->product_image_four,
            'product_image_five'         => $data['product_image_five']         ?? $productInfo->product_image_five,
            'product_extra_image'        => $data['product_extra_image']        ?? $productInfo->product_extra_image,
        ]);

        return $productInfo;
    }

    public function deleteProductInfo($id)
    {
        $product = ProductInformation::findOrFail($id);

        if ($product->image) {
            $this->fileHandlerService->deleteFileFromStorage($product->image);
        }

        $product->delete();

        return $product;
    }
}
