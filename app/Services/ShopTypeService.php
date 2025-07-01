<?php

namespace App\Services;

use App\Models\ShopType;
use Illuminate\Support\Facades\Validator;

class ShopTypeService
{
    public function getAll()
    {
        return ShopType::orderBy('name', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'name';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return ShopType::orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateShopTypeData($data)
    {
        return Validator::make($data, [
            'name'            => 'required|string|unique:shop_types,name',
            'has_services'    => 'required|boolean',
            'delivery_charge' => 'required|boolean',
            'platform_charge' => 'required|boolean',
        ]);
    }

    public function createShopType($data)
    {
        return ShopType::create([
            'name'            => $data['name'],
            'has_services'    => $data['has_services'],
            'delivery_charge' => $data['delivery_charge'],
            'platform_charge' => $data['platform_charge'],
        ]);
    }

    public function validateShopTypeId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:shop_types,id',
        ]);
    }

    public function getShopTypeById($id)
    {
        return ShopType::findOrFail($id);
    }

    public function validateUpdateShopTypeData($data)
    {
        return Validator::make($data, [
            'id'              => 'required|string|exists:shop_types,id',
            'name'            => 'required|string|unique:shop_types,name,'.$data['id'],
            'has_services'    => 'required|boolean',
            'delivery_charge' => 'required|boolean',
            'platform_charge' => 'required|boolean',
        ]);
    }

    public function updateShopType($data)
    {
        $shopType = ShopType::findOrFail($data['id']);

        $shopType->update([
            'name'            => $data['name'],
            'has_services'    => $data['has_services'],
            'delivery_charge' => $data['delivery_charge'],
            'platform_charge' => $data['platform_charge'],
        ]);

        return $shopType;
    }

    public function deleteShopType($id)
    {
        $shopType = ShopType::findOrFail($id);
        $shopType->delete();

        return $shopType;
    }
}
