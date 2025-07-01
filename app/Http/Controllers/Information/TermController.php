<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Controller;
use App\Services\TermService;
use Illuminate\Http\Request;

class TermController extends Controller
{
    protected $termService;

    public function __construct(TermService $termService)
    {
        $this->termService = $termService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $terms = $this->termService->getPaginate($request->all());

            if ($terms->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Terms Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Terms Retrieved Successfully.',
                'data'    => $terms,
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
            $validator = $this->termService->validateCreateTermData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $term = $this->termService->createTerm($request);

            return response()->json([
                'status'  => true,
                'message' => 'Term Added Successfully.',
                'data'    => $term,
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
            $validator = $this->termService->validateTermId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $term = $this->termService->getTermById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Term Retrieved Successfully.',
                'data'    => $term,
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
            $validator = $this->termService->validateUpdateTermData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $term = $this->termService->updateTerm($request);

            return response()->json([
                'status'  => true,
                'message' => 'Term Updated Successfully.',
                'data'    => $term,
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
            $validator = $this->termService->validateTermId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $term = $this->termService->deleteTerm($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Term Deleted Successfully.',
                'data'    => $term,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
