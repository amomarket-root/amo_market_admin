<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\ContactUsService;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    protected $contactUsService;

    public function __construct(ContactUsService $contactUsService)
    {
        $this->contactUsService = $contactUsService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $contactUsEntries = $this->contactUsService->getPaginate($request->all());

            if ($contactUsEntries->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Contact Us Entries Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Contact Us Entries Retrieved Successfully.',
                'data'    => $contactUsEntries,
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
            $validator = $this->contactUsService->validateCreateContactUsData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $contactUs = $this->contactUsService->createContactUs($request);

            return response()->json([
                'status'  => true,
                'message' => 'Contact Us Entry Added Successfully.',
                'data'    => $contactUs,
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
            $validator = $this->contactUsService->validateContactUsId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $contactUs = $this->contactUsService->getContactUsById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Contact Us Entry Retrieved Successfully.',
                'data'    => $contactUs,
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
            $validator = $this->contactUsService->validateUpdateContactUsData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $contactUs = $this->contactUsService->updateContactUs($request);

            return response()->json([
                'status'  => true,
                'message' => 'Contact Us Entry Updated Successfully.',
                'data'    => $contactUs,
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
            $validator = $this->contactUsService->validateContactUsId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $contactUs = $this->contactUsService->deleteContactUs($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Contact Us Entry Deleted Successfully.',
                'data'    => $contactUs,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
