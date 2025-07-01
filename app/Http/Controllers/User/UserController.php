<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\RegistrationMail;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

/**
 * @OA\Tag(
 *     name="Users",
 *     description="API Documentation for Users Management"
 * )
 */
class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @OA\Get(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Get paginated users",
     *
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         required=false,
     *         description="Users per page",
     *
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\Response(response=200, description="Users Retrieved Successfully"),
     *     @OA\Response(response=404, description="No Users Found")
     * )
     */
    public function getPaginate(Request $request)
    {
        try {
            $user = $this->userService->getPaginate($request->all());

            if ($user->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Users Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'User Retrieved Successfully.',
                'data'    => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Create a new user",
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"name","email","password","password_confirmation","role_id","status"},
     *
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string"),
     *             @OA\Property(property="password_confirmation", type="string"),
     *             @OA\Property(property="role_id", type="integer"),
     *             @OA\Property(property="status", type="integer")
     *         )
     *     ),
     *
     *     @OA\Response(response=200, description="User Added Successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function create(Request $request)
    {
        try {
            $validator = $this->userService->validateCreateUserData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->userService->createUser($request->all());

            // Mask the password for the email
            $maskedPassword = substr($request->password, 0, 2).str_repeat('*', strlen($request->password) - 2);

            // Send registration email
            Mail::to($user->email)->queue(new RegistrationMail($user->email, $maskedPassword));

            return response()->json([
                'status'  => true,
                'message' => 'User Added Successfully.',
                'user'    => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/users/get",
     *     tags={"Users"},
     *     summary="Get a user by ID",
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"id"},
     *
     *             @OA\Property(property="id", type="string")
     *         )
     *     ),
     *
     *     @OA\Response(response=200, description="User Retrieved Successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function get(Request $request)
    {
        try {
            $validator = $this->userService->validateUserId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->userService->getUserById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'User Retrieved Successfully.',
                'data'    => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Update a user",
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"user_id", "name", "email", "role_id", "status"},
     *
     *             @OA\Property(property="user_id", type="string"),
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="role_id", type="integer"),
     *             @OA\Property(property="status", type="integer")
     *         )
     *     ),
     *
     *     @OA\Response(response=200, description="User Updated Successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function update(Request $request)
    {
        try {
            $validator = $this->userService->validateUpdateUserData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->userService->updateUser($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'User Updated Successfully.',
                'data'    => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Delete a user",
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"id"},
     *
     *             @OA\Property(property="id", type="string")
     *         )
     *     ),
     *
     *     @OA\Response(response=200, description="User Deleted Successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function delete(Request $request)
    {
        try {
            $validator = $this->userService->validateUserId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->userService->deleteUser($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'User Deleted Successfully.',
                'data'    => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/users/change-password",
     *     tags={"Users"},
     *     summary="Change user password",
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"user_id", "old_password", "password", "password_confirmation"},
     *
     *             @OA\Property(property="user_id", type="string"),
     *             @OA\Property(property="old_password", type="string"),
     *             @OA\Property(property="password", type="string"),
     *             @OA\Property(property="password_confirmation", type="string")
     *         )
     *     ),
     *
     *     @OA\Response(response=200, description="Password Updated Successfully"),
     *     @OA\Response(response=400, description="Validation error or incorrect old password")
     * )
     */
    public function changePassword(Request $request)
    {
        try {
            $validator = $this->userService->validateChangePassword($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $user = $this->userService->changePassword($request->all());

            return response()->json([
                'status'  => true,
                'message' => 'Password Updated Successfully.',
                'user'    => $user,
            ], 200);
        } catch (\Exception $e) {
            if ($e->getMessage() === 'Old password is incorrect.') {
                return response()->json([
                    'status'  => false,
                    'message' => $e->getMessage(),
                ], 400);
            }

            return response()->json([
                'status'  => false,
                'message' => 'An error occurred.',
            ], 500);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => 'An error occurred.',
            ], 500);
        }
    }
}
