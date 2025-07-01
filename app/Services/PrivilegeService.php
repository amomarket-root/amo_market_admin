<?php

namespace App\Services;

use App\Models\Privilege;
use Illuminate\Support\Facades\Validator;

class PrivilegeService
{
    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Privilege::orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function getAll()
    {
        $privileges = Privilege::get();

        // Group privileges by the prefix in the name
        $groupedPrivileges = $privileges->groupBy(function ($privilege) {
            // Extract the category from the privilege name
            return explode(' ', $privilege->name)[0];
        });

        // Transform grouped privileges into an associative array with category names as keys
        $groupedPrivilegesArray = $groupedPrivileges->map(function ($group) {
            return $group->map(function ($privilege) {
                return [
                    'id'          => $privilege->id,
                    'name'        => $privilege->name,
                    'description' => $privilege->description,
                    'created_at'  => $privilege->created_at,
                    'updated_at'  => $privilege->updated_at,
                    'deleted_at'  => $privilege->deleted_at,
                ];
            })->values(); // Reset the array indices
        });

        return $groupedPrivilegesArray;
    }

    public function validateCreatePrivilegeData($data)
    {
        return Validator::make($data, [
            'prefix_privilege_name' => 'required|string',
            'suffix_privilege_name' => 'required|string',
            'prefix_description'    => 'required|string',
            'suffix_description'    => 'required|string',
        ]);
    }

    public function createPrivilege($data)
    {
        if (empty($data['prefix_privilege_name']) || empty($data['suffix_privilege_name'])) {
            throw new \Exception('Prefix and Suffix Privilege Names are required.');
        }

        if (empty($data['prefix_description']) || empty($data['suffix_description'])) {
            throw new \Exception('Prefix and Suffix Descriptions are required.');
        }

        $name        = $data['prefix_privilege_name'].' - '.$data['suffix_privilege_name'];
        $description = $data['prefix_description'].'@'.$data['suffix_description'];

        $duplicate = Privilege::where('name', $name)->orWhere('description', $description)->first();

        if ($duplicate) {
            throw new \Exception('Please check. The same Privilege Name and Description already exist!');
        }

        // Create the privilege
        return Privilege::create([
            'name'        => $name,
            'description' => $description,
        ]);
    }

    public function validatePrivilegeId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:privileges,id',
        ]);
    }

    public function getPrivilegeById($id)
    {
        $privilege = Privilege::findOrFail($id);

        if (! $privilege) {
            throw new \Exception('Privilege not found');
        }

        // Split name into prefix and suffix
        $nameParts             = explode(' - ', $privilege->name);
        $prefix_privilege_name = $nameParts[0] ?? null;
        $suffix_privilege_name = $nameParts[1] ?? null;

        // Split description into prefix and suffix
        $descriptionParts   = explode('@', $privilege->description);
        $prefix_description = $descriptionParts[0] ?? null;
        $suffix_description = $descriptionParts[1] ?? null;

        return [
            'privilege_id'          => $privilege->id ?? $id,
            'prefix_privilege_name' => $prefix_privilege_name,
            'suffix_privilege_name' => $suffix_privilege_name,
            'prefix_description'    => $prefix_description,
            'suffix_description'    => $suffix_description,
        ];
    }

    public function validateUpdatePrivilegeData($data)
    {
        $rules = [
            'privilege_id'          => 'required|string|exists:privileges,id',
            'prefix_privilege_name' => 'required|string',
            'suffix_privilege_name' => 'required|string',
            'prefix_description'    => 'required|string',
            'suffix_description'    => 'required|string',
        ];

        return Validator::make($data, $rules);
    }

    public function updatePrivilege($data)
    {
        $privilege = Privilege::findOrFail($data['privilege_id']);

        $newName        = $data['prefix_privilege_name'].' - '.$data['suffix_privilege_name'];
        $newDescription = $data['prefix_description'].'@'.$data['suffix_description'];

        // Check for duplicates (excluding the current privilege)
        $duplicate = Privilege::where(function ($query) use ($newName, $newDescription) {
            $query->where('name', $newName)->orWhere('description', $newDescription);
        })->where('id', '!=', $privilege->id)->first();

        if ($duplicate) {
            throw new \Exception('Please check. The same Privilege Name and Description already exist!');
        }

        $privilege->update([
            'name'        => $newName,
            'description' => $newDescription,
        ]);

        return $privilege;
    }

    public function deletePrivilege($id)
    {
        $privilege = Privilege::findOrFail($id);
        $privilege->delete();

        return $privilege;
    }
}
