<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Avatar;
use App\Services\AvatarService;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Users",
 *     description="API Documentation for Avatar Management"
 * )
 */
class AvatarController extends Controller
{
    protected $avatarService;

    public function __construct(AvatarService $avatarService)
    {
        $this->avatarService = $avatarService;
    }

    /**
     * @OA\Get(
     *     path="/api/user/avatars",
     *     summary="Get top 20 avatars",
     *     tags={"Avatars"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="List of avatars",
     *
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Avatar"))
     *     )
     * )
     */
    public function index()
    {
        $avatars = Avatar::take(20)->get(); // or you can use Avatar::limit(10)->get();

        return response()->json($avatars);
    }

    public function getAll()
    {
        $avatars = $this->avatarService->getAll();

        if ($avatars->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Avatars Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Avatars Retrieved Successfully.',
            'data'    => $avatars,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $avatars = $this->avatarService->getPaginate($request->all());

            if ($avatars->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Avatars Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Avatars Retrieved Successfully.',
                'data'    => $avatars,
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
            $validator = $this->avatarService->validateAvatarId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $avatar = $this->avatarService->getAvatarById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Avatar Retrieved Successfully.',
                'data'    => $avatar,
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
            $validator = $this->avatarService->validateCreateAvatarData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $avatar = $this->avatarService->createAvatar($request);

            return response()->json([
                'status'  => true,
                'message' => 'Avatar Created Successfully.',
                'data'    => $avatar,
            ], 201);
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
            $validator = $this->avatarService->validateUpdateAvatarData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $avatar = $this->avatarService->updateAvatar($request);

            return response()->json([
                'status'  => true,
                'message' => 'Avatar Updated Successfully.',
                'data'    => $avatar,
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
            $validator = $this->avatarService->validateAvatarId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $avatar = $this->avatarService->deleteAvatar($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Avatar Deleted Successfully.',
                'data'    => $avatar,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
