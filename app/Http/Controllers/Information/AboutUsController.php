<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\AboutUsService;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    protected $aboutUsService;

    public function __construct(AboutUsService $aboutUsService)
    {
        $this->aboutUsService = $aboutUsService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $aboutUsPages = $this->aboutUsService->getPaginate($request->all());

            if ($aboutUsPages->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No About Us Pages Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'About Us Pages Retrieved Successfully.',
                'data'    => $aboutUsPages,
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
            $validator = $this->aboutUsService->validateCreateAboutUsData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $aboutUs = $this->aboutUsService->createAboutUs($request);

            return response()->json([
                'status'  => true,
                'message' => 'About Us Page Added Successfully.',
                'data'    => $aboutUs,
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
            $validator = $this->aboutUsService->validateAboutUsId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $aboutUs = $this->aboutUsService->getAboutUsById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'About Us Page Retrieved Successfully.',
                'data'    => $aboutUs,
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
            $validator = $this->aboutUsService->validateUpdateAboutUsData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $aboutUs = $this->aboutUsService->updateAboutUs($request);

            return response()->json([
                'status'  => true,
                'message' => 'About Us Page Updated Successfully.',
                'data'    => $aboutUs,
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
            $validator = $this->aboutUsService->validateAboutUsId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $aboutUs = $this->aboutUsService->deleteAboutUs($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'About Us Page Deleted Successfully.',
                'data'    => $aboutUs,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
