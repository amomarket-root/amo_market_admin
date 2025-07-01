<?php

namespace App\Services;

use App\Models\Address;
use Illuminate\Support\Facades\Validator;

class AddressService
{
    public function getAll()
    {
        return Address::with('user')->orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Address::with('user')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateAddressData($data)
    {
        return Validator::make($data, [
            'user_id'            => 'required|exists:users,id',
            'full_name'          => 'required|string',
            'phone_number'       => 'required|string',
            'alternative_number' => 'nullable|string',
            'pin_code'           => 'required|string',
            'state'              => 'required|string',
            'city'               => 'required|string',
            'building_details'   => 'required|string',
            'location'           => 'required|string',
            'is_default'         => 'nullable|string',
            'address_type'       => 'nullable|string',
            'delivery_note'      => 'nullable|string',
            'status'             => 'required|integer',
            'full_address'       => 'required|string',
            'latitude'           => 'required|string',
            'longitude'          => 'required|string',
        ]);
    }

    public function createAddress($data)
    {
        return Address::create([
            'user_id'            => $data['user_id'],
            'full_name'          => $data['full_name'],
            'phone_number'       => $data['phone_number'],
            'alternative_number' => $data['alternative_number'] ?? null,
            'pin_code'           => $data['pin_code'],
            'state'              => $data['state'],
            'city'               => $data['city'],
            'building_details'   => $data['building_details'],
            'location'           => $data['location'],
            'is_default'         => $data['is_default']    ?? null,
            'address_type'       => $data['address_type']  ?? null,
            'delivery_note'      => $data['delivery_note'] ?? null,
            'status'             => $data['status'],
            'full_address'       => $data['full_address'],
            'latitude'           => $data['latitude'],
            'longitude'          => $data['longitude'],
        ]);
    }

    public function validateAddressId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:addresses,id',
        ]);
    }

    public function getAddressById($id)
    {
        return Address::with('user')->findOrFail($id);
    }

    public function validateUpdateAddressData($data)
    {
        return Validator::make($data, [
            'address_id'         => 'required|string|exists:addresses,id',
            'user_id'            => 'required|exists:users,id',
            'full_name'          => 'required|string',
            'phone_number'       => 'required|string',
            'alternative_number' => 'nullable|string',
            'pin_code'           => 'required|string',
            'state'              => 'required|string',
            'city'               => 'required|string',
            'building_details'   => 'required|string',
            'location'           => 'required|string',
            'is_default'         => 'nullable|string',
            'address_type'       => 'nullable|string',
            'delivery_note'      => 'nullable|string',
            'status'             => 'required|integer',
            'full_address'       => 'required|string',
            'latitude'           => 'required|string',
            'longitude'          => 'required|string',
        ]);
    }

    public function updateAddress($data)
    {
        $address = Address::findOrFail($data['address_id']);

        $address->update([
            'user_id'            => $data['user_id'],
            'full_name'          => $data['full_name'],
            'phone_number'       => $data['phone_number'],
            'alternative_number' => $data['alternative_number'] ?? $address->alternative_number,
            'pin_code'           => $data['pin_code'],
            'state'              => $data['state'],
            'city'               => $data['city'],
            'building_details'   => $data['building_details'],
            'location'           => $data['location'],
            'is_default'         => $data['is_default']    ?? $address->is_default,
            'address_type'       => $data['address_type']  ?? $address->address_type,
            'delivery_note'      => $data['delivery_note'] ?? $address->delivery_note,
            'status'             => $data['status'],
            'full_address'       => $data['full_address'],
            'latitude'           => $data['latitude'],
            'longitude'          => $data['longitude'],
        ]);

        return $address;
    }

    public function deleteAddress($id)
    {
        $address = Address::findOrFail($id);
        $address->delete();

        return $address;
    }
}
