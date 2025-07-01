<?php

namespace App\Services;

use App\Models\Avatar;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class AvatarService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return Avatar::orderBy('created_at', 'desc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'created_at';
        $sortOrder = $data['sort_order'] ?? 'desc';

        return Avatar::orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateAvatarData($data)
    {
        return Validator::make($data, [
            'avatar_file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);
    }

    public function createAvatar($request)
    {
        $data = $request->all();

        // Handle file upload
        $path = $this->saveFile($request->file('avatar_file'), 'avatar', 'avatar_'.time());

        return Avatar::create([
            'path' => $path,
        ]);
    }

    public function validateAvatarId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:avatars,id',
        ]);
    }

    public function getAvatarById($id)
    {
        return Avatar::findOrFail($id);
    }

    public function validateUpdateAvatarData($data)
    {
        return Validator::make($data, [
            'id'          => 'required|uuid|exists:avatars,id',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);
    }

    public function updateAvatar($request)
    {
        $data   = $request->all();
        $avatar = Avatar::findOrFail($data['id']);

        // Handle file upload
        $path = $this->saveFile($request->file('avatar_file'), 'avatar', 'avatar_'.time());

        $avatar->update([
            'path' => $path,
        ]);

        return $avatar;
    }

    public function deleteAvatar($id)
    {
        $avatar = Avatar::findOrFail($id);
        $avatar->delete();

        return $avatar;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "/{$folder}/{$name}";

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
