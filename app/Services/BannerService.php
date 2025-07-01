<?php

namespace App\Services;

use App\Models\BannerPage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class BannerService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return BannerPage::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return BannerPage::with('shop')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateBannerData($data)
    {
        return Validator::make($data, [
            'shop_id'            => 'nullable|uuid|exists:shops,id',
            'title'              => 'required|string',
            'content_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:3072',
            'status'             => 'required|numeric',
        ]);
    }

    public function createBanner($request)
    {
        $data = $request->all(); // Convert request to array

        // Handle file upload
        $data['content_image_file'] = $request->hasFile('content_image_file')
            ? $this->saveFile($request->file('content_image_file'), 'banner_images', $data['title'])
            : null;

        // Create the banner
        return BannerPage::create([
            'shop_id'       => $data['shop_id'] ?? null,
            'title'         => $data['title'],
            'content_image' => $data['content_image_file'],
            'status'        => $data['status'],
        ]);
    }

    public function validateBannerId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:banner_pages,id',
        ]);
    }

    public function getBannerById($id)
    {
        return BannerPage::findOrFail($id);
    }

    public function validateUpdateBannerData($data)
    {
        return Validator::make($data, [
            'banner_id'          => 'required|uuid|exists:banner_pages,id',
            'shop_id'            => 'nullable|uuid|exists:shops,id',
            'title'              => 'required|string',
            'content_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:3072',
            'status'             => 'required|numeric',
        ]);
    }

    public function updateBanner($request)
    {
        $data   = $request->all(); // Convert request data to an array
        $banner = BannerPage::findOrFail($data['banner_id']);

        // Handle file upload correctly
        if ($request->hasFile('content_image_file')) {
            $data['content_image_file'] = $this->saveFile($request->file('content_image_file'), 'banner_images', $data['title']);
        }

        // Update only the fields that are provided
        $banner->update([
            'shop_id'       => $data['shop_id'] ?? $banner->shop_id,
            'title'         => $data['title'],
            'content_image' => $data['content_image_file'] ?? $banner->content_image,
            'status'        => $data['status'],
        ]);

        return $banner;
    }

    public function deleteBanner($id)
    {
        $banner = BannerPage::findOrFail($id);
        $banner->delete();

        return $banner;
    }

    // File-saving function
    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "/banner_page/{$name}/{$folder}";

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
