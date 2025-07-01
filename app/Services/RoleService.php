<?php

namespace App\Services;

use App\Models\Privilege;
use App\Models\PrivilegeRole;
use App\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class RoleService
{
    public function getAll()
    {
        return Role::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Role::with('users')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateRoleId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:roles,id',
        ]);
    }

    public function getPrivileges($data)
    {
        $role_id = $data['id'] ?? null;
        $role    = Role::with('privileges')->find($role_id);

        $allPrivileges = Privilege::all();

        $totalChecked = $allPrivileges->filter(function ($privilege) use ($role) {
            return $role && $role->privileges->contains($privilege->id);
        })->count();

        $groupedPrivileges = $allPrivileges->groupBy(function ($privilege) {
            return explode(' ', $privilege->name)[0];
        });

        $groupedPrivilegesArray = $groupedPrivileges->map(function ($group) use ($role) {
            return $group->map(function ($privilege) use ($role) {
                $privilege->checked = $role && $role->privileges->contains($privilege->id) ? 1 : 0;

                return [
                    'id'          => $privilege->id,
                    'name'        => $privilege->name,
                    'description' => $privilege->description,
                    'created_at'  => $privilege->created_at,
                    'updated_at'  => $privilege->updated_at,
                    'deleted_at'  => $privilege->deleted_at,
                    'checked'     => $privilege->checked,
                ];
            })->values();
        });

        return [
            'privileges'   => $groupedPrivilegesArray,
            'totalChecked' => $totalChecked,
            'checkedRole'  => $data['id'],
        ];
    }

    public function validateCreateRoleData($data)
    {
        return Validator::make($data, [
            'name' => 'required|string|unique:roles,name',
        ]);
    }

    public function createRole($data)
    {
        $role_name   = $data['name']        ?? null;
        $role_id     = $data['role_id']     ?? null;
        $score_count = $data['score_count'] ?? null;
        $privileges  = $data['privileges']  ?? [];

        if (is_string($privileges)) {
            $privileges = json_decode($privileges, true);
        }

        if (! is_array($privileges)) {
            $privileges = [];
        }

        $role = Role::create([
            'name'      => $role_name,
            'parent_id' => $role_id,
            'score'     => $score_count,
        ]);

        if ($role) {
            $privilegeRoleData = [];
            foreach ($privileges as $privilege_id) {
                $privilegeRoleData[] = [
                    'id'           => Str::uuid()->toString(), // Generate UUID for each record
                    'role_id'      => $role->id,
                    'privilege_id' => $privilege_id,
                ];
            }

            if (! empty($privilegeRoleData)) {
                PrivilegeRole::insert($privilegeRoleData);
            }
        }

        return $role;
    }

    public function getRoleById($id)
    {
        $role          = Role::find($id);
        $allPrivileges = Privilege::all();

        $totalChecked = $allPrivileges->filter(function ($privilege) use ($role) {
            return $role && $role->privileges->contains($privilege->id);
        })->count();

        $groupedPrivileges = $allPrivileges->groupBy(function ($privilege) {
            return explode(' ', $privilege->name)[0];
        });

        $groupedPrivilegesArray = $groupedPrivileges->map(function ($group) use ($role) {
            return $group->map(function ($privilege) use ($role) {
                $privilege->checked = $role && $role->privileges->contains($privilege->id) ? 1 : 0;

                return [
                    'id'          => $privilege->id,
                    'name'        => $privilege->name,
                    'description' => $privilege->description,
                    'created_at'  => $privilege->created_at,
                    'updated_at'  => $privilege->updated_at,
                    'deleted_at'  => $privilege->deleted_at,
                    'checked'     => $privilege->checked,
                ];
            })->values();
        });

        return [
            'role'         => $role,
            'privileges'   => $groupedPrivilegesArray,
            'totalChecked' => $totalChecked,
        ];
    }

    public function validateUpdateRoleData($data)
    {
        $rules = [
            'id'   => 'required|string|exists:roles,id',
            'name' => 'required',
        ];

        return Validator::make($data, $rules);
    }

    public function updateRole($data)
    {
        $role        = Role::findOrFail($data['id']);
        $role_name   = $data['name']        ?? null;
        $parent_id   = $data['role_id']     ?? null;
        $score_count = $data['score_count'] ?? null;
        $privileges  = $data['privileges']  ?? [];

        if ($role->id) {
            PrivilegeRole::where('role_id', $role->id)->delete();
        }
        if (is_string($privileges)) {
            $privileges = json_decode($privileges, true);
        }

        if (! is_array($privileges)) {
            $privileges = [];
        }

        $role->update([
            'name'      => $role_name,
            'parent_id' => $parent_id,
            'score'     => $score_count,
        ]);

        if ($role) {
            $privilegeRoleData = [];
            foreach ($privileges as $privilege_id) {
                $privilegeRoleData[] = [
                    'id'           => Str::uuid()->toString(), // Generate UUID for each record
                    'role_id'      => $role->id,
                    'privilege_id' => $privilege_id,
                ];
            }
            if (! empty($privilegeRoleData)) {
                PrivilegeRole::insert($privilegeRoleData);
            }
        }

        return $role;
    }

    public function deleteRole($id)
    {
        $role = Role::findOrFail($id);

        if ($role->id) {
            PrivilegeRole::where('role_id', $role->id)->delete();
        }

        $role->delete();

        return $role;
    }
}
