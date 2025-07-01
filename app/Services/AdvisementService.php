<?php

namespace App\Services;

use App\Models\AdvisementPage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class AdvisementService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return AdvisementPage::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return AdvisementPage::with('shop')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateAdvisementPageData($data)
    {
        return Validator::make($data, [
            'shop_id'            => 'nullable|uuid|exists:shops,id',
            'title'              => 'required|string',
            'content_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:3072',
            'description'        => 'nullable|string',
            'status'             => 'required|numeric',
        ]);
    }

    public function createAdvisementPage($request)
    {
        $data = $request->all(); // Convert request to array

        // Handle file upload
        $data['content_image_file'] = $request->hasFile('content_image_file')
            ? $this->saveFile($request->file('content_image_file'), 'advisement_images', $data['title'])
            : null;

        // Create the advisement page
        return AdvisementPage::create([
            'shop_id'       => $data['shop_id'] ?? null,
            'title'         => $data['title'],
            'content_image' => $data['content_image_file'],
            'description'   => $data['description'] ?? null,
            'status'        => $data['status'],
        ]);
    }

    public function validateAdvisementPageId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:advisement_pages,id',
        ]);
    }

    public function getAdvisementPageById($id)
    {
        return AdvisementPage::findOrFail($id);
    }

    public function validateUpdateAdvisementPageData($data)
    {
        return Validator::make($data, [
            'advisement_id'      => 'required|uuid|exists:advisement_pages,id',
            'shop_id'            => 'nullable|uuid|exists:shops,id',
            'title'              => 'required|string',
            'content_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:3072',
            'description'        => 'nullable|string',
            'status'             => 'required|numeric',
        ]);
    }

    public function updateAdvisementPage($request)
    {
        $data           = $request->all(); // Convert request data to an array
        $advisementPage = AdvisementPage::findOrFail($data['advisement_id']);

        // Handle file upload correctly
        if ($request->hasFile('content_image_file')) {
            $data['content_image_file'] = $this->saveFile($request->file('content_image_file'), 'advisement_images', $data['title']);
        }

        // Update only the fields that are provided
        $advisementPage->update([
            'shop_id'       => $data['shop_id'] ?? $advisementPage->shop_id,
            'title'         => $data['title'],
            'content_image' => $data['content_image_file'] ?? $advisementPage->content_image,
            'description'   => $data['description']        ?? $advisementPage->description,
            'status'        => $data['status'],
        ]);

        return $advisementPage;
    }

    public function deleteAdvisementPage($id)
    {
        $advisementPage = AdvisementPage::findOrFail($id);
        $advisementPage->delete();

        return $advisementPage;
    }

    // File-saving function
    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "/advisement_page/{$name}/{$folder}";

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
