<?php

namespace App\Services;

use App\Models\AboutUs;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class AboutUsService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'created_at';
        $sortOrder = $data['sort_order'] ?? 'desc';

        return AboutUs::orderBy($sortBy, $sortOrder)
            ->paginate($pageSize);
    }

    public function validateCreateAboutUsData($data)
    {
        return Validator::make($data, [
            'title'      => 'required|string|max:255',
            'content'    => 'required|array',
            'content.*'  => 'string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);
    }

    public function createAboutUs($request)
    {
        $data = $request->all();

        // Handle file upload
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'about_us_images', $data['title'])
            : null;

        // Convert content array to JSON
        $data['content'] = json_encode($data['content']);

        return AboutUs::create([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'],
        ]);
    }

    public function validateAboutUsId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:about_us,id',
        ]);
    }

    public function getAboutUsById($id)
    {
        return AboutUs::findOrFail($id);
    }

    public function validateUpdateAboutUsData($data)
    {
        // dd($data);
        return Validator::make($data, [
            'id'         => 'required|uuid|exists:about_us,id',
            'title'      => 'required|string|max:255',
            'content'    => 'required|array',
            'content.*'  => 'string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);
    }

    public function updateAboutUs($request)
    {
        $data    = $request->all();
        $aboutUs = AboutUs::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($aboutUs->image_path) {
                $this->fileHandlerService->deleteFileFromStorage($aboutUs->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'about_us_images', $data['title']);
        }

        // Convert content array to JSON
        $data['content'] = json_encode($data['content']);

        $aboutUs->update([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'] ?? $aboutUs->image_path,
        ]);

        return $aboutUs;
    }

    public function deleteAboutUs($id)
    {
        $aboutUs = AboutUs::findOrFail($id);

        // Delete associated image if exists
        if ($aboutUs->image_path) {
            $this->fileHandlerService->deleteFileFromStorage($aboutUs->image_path);
        }

        $aboutUs->delete();

        return $aboutUs;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "about_us/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
