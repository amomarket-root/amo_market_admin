<?php

namespace App\Services;

use App\Models\Avatar;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return User::with('role', 'avatar')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateUserData($data)
    {
        return Validator::make($data, [
            'name'     => 'required',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role_id'  => 'required',
            'status'   => 'required|numeric',
        ])->sometimes('main_avatar', 'image|mimes:jpeg,png,jpg,gif,webp|max:2048', function ($input) {
            return is_file($input->main_avatar);
        })->sometimes('main_avatar', 'integer', function ($input) {
            return is_numeric($input->main_avatar) && ! is_file($input->main_avatar);
        });
    }

    public function createUser($data)
    {
        $userData = [
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id'  => $data['role_id'],
            'status'   => $data['status'],
        ];

        // Only process avatar if main_avatar is provided and not null
        if (isset($data['main_avatar']) && $data['main_avatar'] !== null) {
            if ($data['main_avatar'] instanceof UploadedFile) {
                $email     = $data['email'];
                $dir_path  = '/avatar/'.$email;
                $avatarUrl = $this->fileHandlerService->saveFileToStorage($data['main_avatar'], $dir_path);

                $avatar = Avatar::create([
                    'path' => $avatarUrl,
                ]);
                $userData['avatar_id'] = $avatar->id;
            } elseif (is_numeric($data['main_avatar'])) {
                $userData['avatar_id'] = $data['main_avatar'];
            }
        }

        return User::create($userData);
    }

    public function validateUserId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:users,id',
        ]);
    }

    public function getUserById($id)
    {
        return User::with('avatar')->findOrFail($id);
    }

    public function validateUpdateUserData($data)
    {
        return Validator::make($data, [
            'user_id' => 'required|string|exists:users,id',
            'name'    => 'required',
            'role_id' => 'required',
            'email'   => 'required|email|exists:users,email',
            'status'  => 'required|numeric',
        ])->sometimes('main_avatar', 'image|mimes:jpeg,png,jpg,gif,webp|max:2048', function ($input) {
            return is_file($input->main_avatar);
        })->sometimes('main_avatar', 'integer', function ($input) {
            return is_numeric($input->main_avatar) && ! is_file($input->main_avatar);
        });
    }

    public function updateUser($data)
    {
        $user = User::findOrFail($data['user_id']);

        // Only process avatar if main_avatar is provided
        if (isset($data['main_avatar']) && $data['main_avatar'] !== null) {
            if ($data['main_avatar'] instanceof UploadedFile) {
                $email     = $data['email'];
                $dir_path  = '/avatar/'.$email;
                $avatarUrl = $this->fileHandlerService->saveFileToStorage($data['main_avatar'], $dir_path);

                $avatar = Avatar::create([
                    'path' => $avatarUrl,
                ]);
                $avatarId = $avatar->id;
            } elseif (is_numeric($data['main_avatar'])) {
                $avatarId = $data['main_avatar'];
            }

            // Only update avatar_id if we have a new value
            $user->avatar_id = $avatarId ?? $user->avatar_id;
        }

        // Update other fields
        $user->name    = $data['name'];
        $user->role_id = $data['role_id'];
        $user->status  = $data['status'];

        $user->save();

        return $user;
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->avatar_id) {
            $avatar = Avatar::find($user->avatar_id);

            if ($avatar) {
                $this->fileHandlerService->deleteFileFromStorage($avatar->path);
                $avatar->delete();
            }
        }
        $user->delete();

        return $user;
    }

    public function validateChangePassword($data)
    {
        return Validator::make($data, [
            'user_id'      => 'required|string|exists:users,id',
            'old_password' => 'required|string|min:6',
            'password'     => 'required|string|min:6|confirmed',
        ]);
    }

    public function changePassword($data)
    {
        $user = User::findOrFail($data['user_id']);

        if (isset($data['old_password']) && isset($data['password'])) {
            if (Hash::check($data['old_password'], $user->password)) {
                $data['password'] = Hash::make($data['password']);
            } else {
                throw new \Exception('Old password is incorrect.');
            }
        } else {
            $data['password'] = $user->password;
        }

        $user->update([
            'password' => $data['password'],
        ]);

        return $user;
    }
}
