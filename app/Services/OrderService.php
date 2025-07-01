<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class OrderService
{
    public function getAll()
    {
        return Order::with(['user', 'shops'])->orderBy('id', 'desc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Order::with(['user', 'shops'])
            ->orderBy($sortBy, $sortOrder)
            ->paginate($pageSize);
    }

    public function validateOrderId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:orders,id',
        ]);
    }

    public function getOrderById($id)
    {
        return Order::with(['user', 'address', 'deliveryPerson', 'userCart', 'shops'])
            ->findOrFail($id);
    }
}
