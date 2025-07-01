<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\AddressService;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    protected $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    public function getAll()
    {
        $addresses = $this->addressService->getAll();
        if ($addresses->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Addresses Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Addresses Retrieved Successfully.',
            'data'    => $addresses,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $addresses = $this->addressService->getPaginate($request->all());

            if ($addresses->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Addresses Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Addresses Retrieved Successfully.',
                'data'    => $addresses,
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
            $validator = $this->addressService->validateCreateAddressData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $address = $this->addressService->createAddress($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Address Added Successfully.',
                'data'    => $address,
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
            $validator = $this->addressService->validateAddressId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $address = $this->addressService->getAddressById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Address Retrieved Successfully.',
                'data'    => $address,
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
            $validator = $this->addressService->validateUpdateAddressData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $address = $this->addressService->updateAddress($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Address Updated Successfully.',
                'data'    => $address,
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
            $validator = $this->addressService->validateAddressId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $address = $this->addressService->deleteAddress($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Address Deleted Successfully.',
                'data'    => $address,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
