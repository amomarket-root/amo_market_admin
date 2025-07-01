<?php

namespace App\Services;

use App\Models\Career;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class CareerService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getPaginate($data)
    {
        $pageSize   = $data['per_page']    ?? 10;
        $sortBy     = $data['sort_by']     ?? 'sort_order';
        $sortOrder  = $data['sort_order']  ?? 'asc';
        $activeOnly = $data['active_only'] ?? false;

        $query = Career::orderBy($sortBy, $sortOrder);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->paginate($pageSize);
    }

    public function validateCreateCareerData($data)
    {
        return Validator::make($data, [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'email'       => 'nullable|email',
            'benefits'    => 'nullable|array',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);
    }

    public function createCareer($request)
    {
        $data = $request->all();

        // Handle file upload
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'career_images', $data['title'])
            : null;

        // Convert benefits array to JSON
        if (isset($data['benefits'])) {
            $data['benefits'] = json_encode($data['benefits']);
        }

        return Career::create([
            'title'       => $data['title'],
            'description' => $data['description'],
            'image_path'  => $data['image_path'],
            'email'       => $data['email']      ?? 'careers.amomarket@gmail.com',
            'benefits'    => $data['benefits']   ?? null,
            'sort_order'  => $data['sort_order'] ?? 0,
            'is_active'   => $data['is_active']  ?? true,
        ]);
    }

    public function validateCareerId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:careers,id',
        ]);
    }

    public function getCareerById($id)
    {
        return Career::findOrFail($id);
    }

    public function validateUpdateCareerData($data)
    {
        return Validator::make($data, [
            'id'          => 'required|uuid|exists:careers,id',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'email'       => 'nullable|email',
            'benefits'    => 'nullable|array',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);
    }

    public function updateCareer($request)
    {
        $data   = $request->all();
        $career = Career::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($career->image_path) {
                $this->fileHandlerService->deleteFileFromStorage($career->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'career_images', $data['title']);
        }

        // Convert benefits array to JSON if provided
        if (isset($data['benefits'])) {
            $data['benefits'] = json_encode($data['benefits']);
        }

        $career->update([
            'title'       => $data['title'],
            'description' => $data['description'],
            'image_path'  => $data['image_path'] ?? $career->image_path,
            'email'       => $data['email']      ?? $career->email,
            'benefits'    => $data['benefits']   ?? $career->benefits,
            'sort_order'  => $data['sort_order'] ?? $career->sort_order,
            'is_active'   => $data['is_active']  ?? $career->is_active,
        ]);

        return $career;
    }

    public function deleteCareer($id)
    {
        $career = Career::findOrFail($id);

        // Delete associated image if exists
        if ($career->image_path) {
            $this->fileHandlerService->deleteFileFromStorage($career->image_path);
        }

        $career->delete();

        return $career;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "careers/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
