<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\ShopPageService;
use Illuminate\Http\Request;

class ShopPageController extends Controller
{
    protected $shopPageService;

    public function __construct(ShopPageService $shopPageService)
    {
        $this->shopPageService = $shopPageService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $shopPages = $this->shopPageService->getPaginate($request->all());

            if ($shopPages->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Shop Pages Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Shop Pages Retrieved Successfully.',
                'data'    => $shopPages,
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
            $validator = $this->shopPageService->validateCreateShopPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopPage = $this->shopPageService->createShopPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Page Added Successfully.',
                'data'    => $shopPage,
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
            $validator = $this->shopPageService->validateShopPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopPage = $this->shopPageService->getShopPageById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Page Retrieved Successfully.',
                'data'    => $shopPage,
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
            $validator = $this->shopPageService->validateUpdateShopPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopPage = $this->shopPageService->updateShopPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Page Updated Successfully.',
                'data'    => $shopPage,
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
            $validator = $this->shopPageService->validateShopPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $shopPage = $this->shopPageService->deleteShopPage($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Shop Page Deleted Successfully.',
                'data'    => $shopPage,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
