<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\CareerService;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    protected $careerService;

    public function __construct(CareerService $careerService)
    {
        $this->careerService = $careerService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $careers = $this->careerService->getPaginate($request->all());

            if ($careers->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Careers Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Careers Retrieved Successfully.',
                'data'    => $careers,
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
            $validator = $this->careerService->validateCreateCareerData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $career = $this->careerService->createCareer($request);

            return response()->json([
                'status'  => true,
                'message' => 'Career Added Successfully.',
                'data'    => $career,
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
            $validator = $this->careerService->validateCareerId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $career = $this->careerService->getCareerById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Career Retrieved Successfully.',
                'data'    => $career,
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
            $validator = $this->careerService->validateUpdateCareerData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $career = $this->careerService->updateCareer($request);

            return response()->json([
                'status'  => true,
                'message' => 'Career Updated Successfully.',
                'data'    => $career,
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
            $validator = $this->careerService->validateCareerId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $career = $this->careerService->deleteCareer($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Career Deleted Successfully.',
                'data'    => $career,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
