<?php

namespace App\Services;

use App\Models\ShopPage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class ShopPageService
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

        $query = ShopPage::orderBy($sortBy, $sortOrder);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->paginate($pageSize);
    }

    public function validateCreateShopPageData($data)
    {
        return Validator::make($data, [
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'video_url'  => 'nullable|url',
            'link'       => 'nullable|url',
            'is_active'  => 'nullable|boolean',
        ]);
    }

    public function createShopPage($request)
    {
        $data = $request->all();

        // Handle file upload
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'shop_page_images', $data['title'])
            : null;

        return ShopPage::create([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'],
            'video_url'  => $data['video_url'] ?? null,
            'link'       => $data['link']      ?? null,
            'is_active'  => $data['is_active'] ?? true,
        ]);
    }

    public function validateShopPageId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:shop_pages,id',
        ]);
    }

    public function getShopPageById($id)
    {
        return ShopPage::findOrFail($id);
    }

    public function validateUpdateShopPageData($data)
    {
        return Validator::make($data, [
            'id'         => 'required|uuid|exists:shop_pages,id',
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'video_url'  => 'nullable|url',
            'link'       => 'nullable|url',
            'is_active'  => 'nullable|boolean',
        ]);
    }

    public function updateShopPage($request)
    {
        $data     = $request->all();
        $shopPage = ShopPage::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($shopPage->image_path) {
                $this->fileHandlerService->deleteFileFromStorage($shopPage->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'shop_page_images', $data['title']);
        }

        $shopPage->update([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'] ?? $shopPage->image_path,
            'video_url'  => $data['video_url']  ?? $shopPage->video_url,
            'link'       => $data['link']       ?? $shopPage->link,
            'is_active'  => $data['is_active']  ?? $shopPage->is_active,
        ]);

        return $shopPage;
    }

    public function deleteShopPage($id)
    {
        $shopPage = ShopPage::findOrFail($id);

        // Delete associated image if exists
        if ($shopPage->image_path) {
            $this->fileHandlerService->deleteFileFromStorage($shopPage->image_path);
        }

        $shopPage->delete();

        return $shopPage;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "shop_pages/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
