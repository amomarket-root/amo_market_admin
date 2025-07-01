<?php

namespace App\Http\Controllers\ActiveLog;

use App\Http\Controllers\Controller;
use App\Services\ActiveLogService;
use Illuminate\Http\Request;

class ActiveLogController extends Controller
{
    protected $activeLogService;

    public function __construct(ActiveLogService $activeLogService)
    {
        $this->activeLogService = $activeLogService;
    }

    public function getAll()
    {
        $active_logs = $this->activeLogService->getAll();

        if ($active_logs->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No active_log List Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'active_log Retrieved Successfully.',
            'data'    => $active_logs,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $active_log = $this->activeLogService->getPaginate($request->all());

            if ($active_log->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Active Log Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Active Log Retrieved Successfully.',
                'data'    => $active_log,
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
            $validator = $this->activeLogService->validateActiveLogId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $data = $this->activeLogService->getActiveLogById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Active Log Retrieved Successfully.',
                'data'    => $data,
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
            $validator = $this->activeLogService->validateUpdateRequest($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $data = $this->activeLogService->updateActiveLog($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Active Log Updated Successfully.',
                'data'    => $data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function share(Request $request)
    {
        try {
            $validator = $this->activeLogService->validateActiveLogId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $data = $this->activeLogService->getActiveLogById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Active Log Retrieved Successfully.',
                'data'    => $data,
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
            $validator = $this->activeLogService->validateActiveLogId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $activelog = $this->activeLogService->deleteActiveLog($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Active Log Deleted Successfully.',
                'data'    => $activelog,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
