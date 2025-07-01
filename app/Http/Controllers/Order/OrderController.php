<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function getAll()
    {
        $orders = $this->orderService->getAll();
        if ($orders->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Order List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Orders Retrieved Successfully.',
            'data'    => $orders,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $orders = $this->orderService->getPaginate($request->all());

            if ($orders->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Orders Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Orders Retrieved Successfully.',
                'data'    => $orders,
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
            $validator = $this->orderService->validateOrderId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $order = $this->orderService->getOrderById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Order Retrieved Successfully.',
                'data'    => $order,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
