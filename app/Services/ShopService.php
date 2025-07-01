<?php

namespace App\Services;

use App\Models\Shop;
use App\Models\ShopType;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class ShopService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getShopType()
    {
        return ShopType::orderBy('id', 'asc')->get();
    }

    public function getAll()
    {
        return Shop::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Shop::with('shopType')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateShopData($data)
    {
        return Validator::make($data, [
            'shop_name'            => 'required|string|unique:shops,name',
            'shop_type_name'       => 'nullable|string',
            'contact_number'       => 'required|string|unique:shops,number',
            'location'             => 'required|string',
            'latitude'             => 'required',
            'longitude'            => 'required',
            'product_description'  => 'required|string',
            'delivery_time'        => 'required|string',
            'any_offer'            => 'nullable|string',
            'online_status'        => 'required|numeric',
            'status'               => 'required|numeric',
            'main_image_file'      => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'profile_picture_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);
    }

    public function createShop($data)
    {

        $mainImageUrl      = null;
        $profilePictureUrl = null;
        if (isset($data['main_image_file']) && $data['main_image_file'] instanceof UploadedFile) {
            $name         = $data['shop_name'];
            $dir_path     = '/shop/main_image/'.$name;
            $mainImageUrl = $this->fileHandlerService->saveFileToStorage($data['main_image_file'], $dir_path);
        }
        if (isset($data['profile_picture_file']) && $data['profile_picture_file'] instanceof UploadedFile) {
            $name              = $data['shop_name'];
            $dir_path          = '/shop/profile_picture/'.$name;
            $profilePictureUrl = $this->fileHandlerService->saveFileToStorage($data['profile_picture_file'], $dir_path);
        }

        return Shop::create([
            'name'            => $data['shop_name'],
            'shop_type_id'    => $data['shop_type_name'],
            'number'          => $data['contact_number'],
            'image'           => $mainImageUrl,
            'profile_picture' => $profilePictureUrl,
            'time'            => $data['delivery_time'],
            'offer'           => $data['any_offer'],
            'description'     => $data['product_description'],
            'location'        => $data['location'],
            'latitude'        => $data['latitude'],
            'longitude'       => $data['longitude'],
            'online_status'   => $data['online_status'],
            'status'          => $data['status'],
        ]);
    }

    public function validateShopId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:shops,id',
        ]);
    }

    public function getShopById($id)
    {
        return Shop::findOrFail($id);
    }

    public function validateUpdateShopData($data)
    {
        return Validator::make($data, [
            'shop_id'              => 'required|string|exists:shops,id',
            'shop_name'            => 'required|string',
            'shop_type_name'       => 'nullable|string',
            'contact_number'       => 'nullable|unique:shops,number,'.$data['shop_id'],
            'location'             => 'required|string',
            'latitude'             => 'required',
            'longitude'            => 'required',
            'product_description'  => 'required|string',
            'delivery_time'        => 'required|string',
            'any_offer'            => 'nullable|string',
            'online_status'        => 'required|numeric',
            'status'               => 'required|numeric',
            'main_image_file'      => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'profile_picture_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);
    }

    public function updateShop($data)
    {
        $shop = Shop::findOrFail($data['shop_id']);

        $mainImageUrl      = null;
        $profilePictureUrl = null;
        if (isset($data['main_image_file']) && $data['main_image_file'] instanceof UploadedFile) {
            $name         = $data['shop_name'];
            $dir_path     = '/shop/main_image/'.$name;
            $mainImageUrl = $this->fileHandlerService->saveFileToStorage($data['main_image_file'], $dir_path);
        } else {
            $mainImageUrl = $shop->image;
        }

        if (isset($data['profile_picture_file']) && $data['profile_picture_file'] instanceof UploadedFile) {
            $name              = $data['shop_name'];
            $dir_path          = '/shop/profile_picture/'.$name;
            $profilePictureUrl = $this->fileHandlerService->saveFileToStorage($data['profile_picture_file'], $dir_path);
        } else {
            $profilePictureUrl = $shop->profile_picture;
        }

        $shop->update([
            'name'            => $data['shop_name'],
            'shop_type_id'    => $data['shop_type_name'],
            'number'          => $data['contact_number'],
            'image'           => $mainImageUrl,
            'profile_picture' => $profilePictureUrl,
            'time'            => $data['delivery_time'],
            'offer'           => $data['any_offer'],
            'description'     => $data['product_description'],
            'location'        => $data['location'],
            'latitude'        => $data['latitude'],
            'longitude'       => $data['longitude'],
            'online_status'   => $data['online_status'],
            'status'          => $data['status'],
        ]);

        return $shop;
    }

    public function deleteShop($id)
    {
        $shop = Shop::findOrFail($id);

        if ($shop->image) {
            $this->fileHandlerService->deleteFileFromStorage($shop->image);
        }
        if ($shop->profile_picture) {
            $this->fileHandlerService->deleteFileFromStorage($shop->profile_picture);
        }
        $shop->delete();

        return $shop;
    }
}
