<?php

namespace App\Services;

use App\Models\SecurityPage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class SecurityPageService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getPaginate($data)
    {
        $pageSize   = $data['per_page']    ?? 10;
        $sortBy     = $data['sort_by']     ?? 'created_at';
        $sortOrder  = $data['sort_order']  ?? 'desc';
        $activeOnly = $data['active_only'] ?? false;

        $query = SecurityPage::orderBy($sortBy, $sortOrder);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->paginate($pageSize);
    }

    public function validateCreateSecurityPageData($data)
    {
        return Validator::make($data, [
            'title'                      => 'required|string|max:255',
            'introduction'               => 'required|string',
            'content_sections'           => 'required|array',
            'content_sections.*.content' => 'required|string',
            'image_file'                 => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'is_active'                  => 'nullable|boolean',
        ]);
    }

    public function createSecurityPage($request)
    {
        $data = $request->all();

        // Handle file upload (don't delete default image)
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'security_page_images', $data['title'])
            : 'image/security.webp';

        // Convert content_sections array to JSON
        $data['content_sections'] = json_encode($data['content_sections']);

        return SecurityPage::create([
            'title'            => $data['title'],
            'introduction'     => $data['introduction'],
            'content_sections' => $data['content_sections'],
            'image_path'       => $data['image_path'],
            'is_active'        => $data['is_active'] ?? true,
        ]);
    }

    public function validateSecurityPageId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:security_pages,id',
        ]);
    }

    public function getSecurityPageById($id)
    {
        return SecurityPage::findOrFail($id);
    }

    public function validateUpdateSecurityPageData($data)
    {
        return Validator::make($data, [
            'id'                         => 'required|uuid|exists:security_pages,id',
            'title'                      => 'required|string|max:255',
            'introduction'               => 'required|string',
            'content_sections'           => 'required|array',
            'content_sections.*.content' => 'required|string',
            'image_file'                 => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'is_active'                  => 'nullable|boolean',
        ]);
    }

    public function updateSecurityPage($request)
    {
        $data         = $request->all();
        $securityPage = SecurityPage::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists and it's not the default image
            if ($securityPage->image_path && $securityPage->image_path !== 'image/security.webp') {
                $this->fileHandlerService->deleteFileFromStorage($securityPage->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'security_page_images', $data['title']);
        }

        // Convert content_sections array to JSON
        $data['content_sections'] = json_encode($data['content_sections']);

        $securityPage->update([
            'title'            => $data['title'],
            'introduction'     => $data['introduction'],
            'content_sections' => $data['content_sections'],
            'image_path'       => $data['image_path'] ?? $securityPage->image_path,
            'is_active'        => $data['is_active']  ?? $securityPage->is_active,
        ]);

        return $securityPage;
    }

    public function deleteSecurityPage($id)
    {
        $securityPage = SecurityPage::findOrFail($id);

        // Delete associated image if exists and it's not the default image
        if ($securityPage->image_path && $securityPage->image_path !== 'image/security.webp') {
            $this->fileHandlerService->deleteFileFromStorage($securityPage->image_path);
        }

        $securityPage->delete();

        return $securityPage;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "security/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
