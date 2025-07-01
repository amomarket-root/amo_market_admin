<?php

namespace App\Services;

use App\Models\ActiveLog;
use Illuminate\Support\Facades\Validator;

class ActiveLogService
{
    public function getAll()
    {
        return ActiveLog::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return ActiveLog::leftJoin('users', 'activity_log.causer_id', '=', 'users.id')
            ->select('activity_log.*', 'users.name as user_name')
            ->orderBy($sortBy, $sortOrder)
            ->paginate($pageSize);
    }

    public function validateActiveLogId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:activity_log,id',
        ]);
    }

    public function getActiveLogById($id)
    {
        $activelog = ActiveLog::findOrFail($id);

        $data = json_decode($activelog->properties);

        $attributes = isset($data->attributes) ? $data->attributes : [];
        $old        = isset($data->old) ? $data->old : [];

        return [
            'attributes' => $attributes,
            'old'        => $old,
            'logs'       => $activelog,
        ];
    }

    public function validateUpdateRequest($data)
    {
        return Validator::make($data, [
            'log_id'  => 'required|string|exists:activity_log,id',
            'user_id' => 'required',
        ]);
    }

    public function updateActiveLog($data)
    {
        $activelog = ActiveLog::findOrFail($data['log_id']);

        $value = [
            'causer_id'   => $data['user_id'],
            'causer_type' => 'App\Models\User',
        ];

        $activelog->update($value);

        return $activelog;
    }

    public function deleteActiveLog($id)
    {
        $activelog = ActiveLog::findOrFail($id);
        $activelog->delete();

        return $activelog;
    }
}
