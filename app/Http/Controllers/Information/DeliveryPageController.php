<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\DeliveryPageService;
use Illuminate\Http\Request;

class DeliveryPageController extends Controller
{
    protected $deliveryPageService;

    public function __construct(DeliveryPageService $deliveryPageService)
    {
        $this->deliveryPageService = $deliveryPageService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $deliveryPages = $this->deliveryPageService->getPaginate($request->all());

            if ($deliveryPages->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Delivery Pages Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Pages Retrieved Successfully.',
                'data'    => $deliveryPages,
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
            $validator = $this->deliveryPageService->validateCreateDeliveryPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $deliveryPage = $this->deliveryPageService->createDeliveryPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Page Added Successfully.',
                'data'    => $deliveryPage,
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
            $validator = $this->deliveryPageService->validateDeliveryPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $deliveryPage = $this->deliveryPageService->getDeliveryPageById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Page Retrieved Successfully.',
                'data'    => $deliveryPage,
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
            $validator = $this->deliveryPageService->validateUpdateDeliveryPageData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $deliveryPage = $this->deliveryPageService->updateDeliveryPage($request);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Page Updated Successfully.',
                'data'    => $deliveryPage,
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
            $validator = $this->deliveryPageService->validateDeliveryPageId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $deliveryPage = $this->deliveryPageService->deleteDeliveryPage($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Page Deleted Successfully.',
                'data'    => $deliveryPage,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
