<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Services\ShopService;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    protected $shopService;

    public function __construct(ShopService $shopService)
    {
        $this->shopService = $shopService;
    }

    public function getShopType()
    {
        $shopTypes = $this->shopService->getShopType();

        if ($shopTypes->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Shop Types Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Shop Types Retrieved Successfully.',
            'data'    => $shopTypes,
        ], 200);
    }

    public function getAll()
    {
        $shops = $this->shopService->getAll();

        if ($shops->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Shop List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Shops Retrieved Successfully.',
            'data'    => $shops,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $privilege = $this->shopService->getPaginate($request->all());

            if ($privilege->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Shop Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Shop Retrieved Successfully.',
                'data'    => $privilege,
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
            $validator = $this->shopService->validateCreateShopData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shop = $this->shopService->createShop($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Shop Added Successfully.',
                'user'    => $shop,
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
            $validator = $this->shopService->validateShopId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shop = $this->shopService->getShopById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Retrieved Successfully.',
                'data'    => $shop,
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
            $validator = $this->shopService->validateUpdateShopData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shop = $this->shopService->updateShop($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Shop Updated Successfully.',
                'data'    => $shop,
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
            $validator = $this->shopService->validateShopId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shop = $this->shopService->deleteShop($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Deleted Successfully.',
                'data'    => $shop,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
