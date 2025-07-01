<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Services\DeliveryPersonService;
use Illuminate\Http\Request;

class DeliveryPersonController extends Controller
{
    protected $deliveryPersonService;

    public function __construct(DeliveryPersonService $deliveryPersonService)
    {
        $this->deliveryPersonService = $deliveryPersonService;
    }

    public function getAll()
    {
        $deliveryPersons = $this->deliveryPersonService->getAll();

        if ($deliveryPersons->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Delivery Persons Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Delivery Persons Retrieved Successfully.',
            'data'    => $deliveryPersons,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $deliveryPersons = $this->deliveryPersonService->getPaginate($request->all());

            if ($deliveryPersons->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Delivery Persons Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Persons Retrieved Successfully.',
                'data'    => $deliveryPersons,
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
            // Validate request data
            $validator = $this->deliveryPersonService->validateCreateDeliveryPersonData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $deliveryPerson = $this->deliveryPersonService->createDeliveryPerson($request);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Person Added Successfully.',
                'data'    => $deliveryPerson,
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
            $validator = $this->deliveryPersonService->validateDeliveryPersonId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $deliveryPerson = $this->deliveryPersonService->getDeliveryPersonById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Person Retrieved Successfully.',
                'data'    => $deliveryPerson,
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
            // Validate request data
            $validator = $this->deliveryPersonService->validateUpdateDeliveryPersonData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $deliveryPerson = $this->deliveryPersonService->updateDeliveryPerson($request);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Person Updated Successfully.',
                'data'    => $deliveryPerson,
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
            $validator = $this->deliveryPersonService->validateDeliveryPersonId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $deliveryPerson = $this->deliveryPersonService->deleteDeliveryPerson($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Delivery Person Deleted Successfully.',
                'data'    => $deliveryPerson,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
