<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Services\RoleService;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function getAll()
    {
        $roles = $this->roleService->getAll();

        if ($roles->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No roles List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'roles Retrieved Successfully.',
            'data'    => $roles,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $role = $this->roleService->getPaginate($request->all());

            if ($role->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Role Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Role Retrieved Successfully.',
                'data'    => $role,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function getPrivileges(Request $request)
    {
        try {
            // Validate the role ID
            $validator = $this->roleService->validateRoleId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Fetch privileges with ordering and pagination
            $privileges = $this->roleService->getPrivileges($request->all());

            return response()->json([
                'status'       => true,
                'message'      => 'Privileges retrieved successfully.',
                'data'         => $privileges['privileges'],
                'totalChecked' => $privileges['totalChecked'],
                'checkedRole'  => $privileges['checkedRole'],
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
            $validator = $this->roleService->validateCreateRoleData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $role = $this->roleService->createRole($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Role Added Successfully.',
                'user'    => $role,
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
            $validator = $this->roleService->validateRoleId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->roleService->getRoleById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Role Retrieved Successfully.',
                'data'    => $user,
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
            $validator = $this->roleService->validateUpdateRoleData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $role = $this->roleService->updateRole($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Role Updated Successfully.',
                'data'    => $role,
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
            $validator = $this->roleService->validateRoleId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $role = $this->roleService->deleteRole($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Role Deleted Successfully.',
                'data'    => $role,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
