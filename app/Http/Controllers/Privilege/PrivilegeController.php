<?php

namespace App\Http\Controllers\Privilege;

use App\Http\Controllers\Controller;
use App\Services\PrivilegeService;
use Illuminate\Http\Request;

class PrivilegeController extends Controller
{
    protected $privilegeService;

    public function __construct(PrivilegeService $privilegeService)
    {
        $this->privilegeService = $privilegeService;
    }

    public function getPaginate(Request $request)
    {
        try {
            $privilege = $this->privilegeService->getPaginate($request->all());

            if ($privilege->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Privilege Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Privilege Retrieved Successfully.',
                'data'    => $privilege,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function getAll()
    {
        try {
            $privilege = $this->privilegeService->getAll();

            if ($privilege->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Privilege Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'All Privilege Retrieved Successfully.',
                'data'    => $privilege,
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
            $validator = $this->privilegeService->validatePrivilegeId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privilege = $this->privilegeService->getPrivilegeById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Privilege Retrieved Successfully.',
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
            $validator = $this->privilegeService->validateCreatePrivilegeData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privilege = $this->privilegeService->createPrivilege($request->all());

            return response()->json([
                'status'    => true,
                'message'   => 'Privilege Added Successfully.',
                'privilege' => $privilege,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => 'An unexpected error occurred.',
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $validator = $this->privilegeService->validateUpdatePrivilegeData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $privilege = $this->privilegeService->updatePrivilege($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Privilege Updated Successfully.',
                'data'    => $privilege,
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
            $validator = $this->privilegeService->validatePrivilegeId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->privilegeService->deletePrivilege($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Privilege Deleted Successfully.',
                'data'    => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
