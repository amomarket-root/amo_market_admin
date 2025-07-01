<?php

namespace App\Services;

use App\Models\PrivacyPolicy;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class PrivacyPolicyService
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

        $query = PrivacyPolicy::orderBy($sortBy, $sortOrder);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->paginate($pageSize);
    }

    public function validateCreatePrivacyPolicyData($data)
    {
        return Validator::make($data, [
            'title'               => 'required|string|max:255',
            'introduction'        => 'required|string',
            'sections'            => 'required|array',
            'sections.*.title'    => 'required|string|max:255',
            'sections.*.content'  => 'required|string',
            'image_file'          => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'company_description' => 'required|string',
            'is_active'           => 'nullable|boolean',
        ]);
    }

    public function createPrivacyPolicy($request)
    {
        $data = $request->all();

        // Handle file upload (don't delete default image)
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'privacy_policy_images', $data['title'])
            : 'image/privacy.webp';

        // Convert sections array to JSON
        $data['sections'] = json_encode($data['sections']);

        return PrivacyPolicy::create([
            'title'               => $data['title'],
            'introduction'        => $data['introduction'],
            'sections'            => $data['sections'],
            'image_path'          => $data['image_path'],
            'company_description' => $data['company_description'],
            'is_active'           => $data['is_active'] ?? true,
        ]);
    }

    public function validatePrivacyPolicyId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:privacy_policies,id',
        ]);
    }

    public function getPrivacyPolicyById($id)
    {
        return PrivacyPolicy::findOrFail($id);
    }

    public function validateUpdatePrivacyPolicyData($data)
    {
        return Validator::make($data, [
            'id'                  => 'required|uuid|exists:privacy_policies,id',
            'title'               => 'required|string|max:255',
            'introduction'        => 'required|string',
            'sections'            => 'required|array',
            'sections.*.title'    => 'required|string|max:255',
            'sections.*.content'  => 'required|string',
            'image_file'          => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'company_description' => 'required|string',
            'is_active'           => 'nullable|boolean',
        ]);
    }

    public function updatePrivacyPolicy($request)
    {
        $data          = $request->all();
        $privacyPolicy = PrivacyPolicy::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists and it's not the default image
            if ($privacyPolicy->image_path && $privacyPolicy->image_path !== 'image/privacy.webp') {
                $this->fileHandlerService->deleteFileFromStorage($privacyPolicy->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'privacy_policy_images', $data['title']);
        }

        // Convert sections array to JSON
        $data['sections'] = json_encode($data['sections']);

        $privacyPolicy->update([
            'title'               => $data['title'],
            'introduction'        => $data['introduction'],
            'sections'            => $data['sections'],
            'image_path'          => $data['image_path'] ?? $privacyPolicy->image_path,
            'company_description' => $data['company_description'],
            'is_active'           => $data['is_active'] ?? $privacyPolicy->is_active,
        ]);

        return $privacyPolicy;
    }

    public function deletePrivacyPolicy($id)
    {
        $privacyPolicy = PrivacyPolicy::findOrFail($id);

        // Delete associated image if exists and it's not the default image
        if ($privacyPolicy->image_path && $privacyPolicy->image_path !== 'image/privacy.webp') {
            $this->fileHandlerService->deleteFileFromStorage($privacyPolicy->image_path);
        }

        $privacyPolicy->delete();

        return $privacyPolicy;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "privacy_policy/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
