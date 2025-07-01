<?php

namespace App\Services;

use App\Models\DeliveryPage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class DeliveryPageService
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

        $query = DeliveryPage::orderBy($sortBy, $sortOrder);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->paginate($pageSize);
    }

    public function validateCreateDeliveryPageData($data)
    {
        return Validator::make($data, [
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'video_url'  => 'nullable|url',
            'link'       => 'required|url',
            'is_active'  => 'nullable|boolean',
        ]);
    }

    public function createDeliveryPage($request)
    {
        $data = $request->all();

        // Handle file upload
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'delivery_page_images', $data['title'])
            : null;

        return DeliveryPage::create([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'],
            'video_url'  => $data['video_url'] ?? null,
            'link'       => $data['link'],
            'is_active'  => $data['is_active'] ?? true,
        ]);
    }

    public function validateDeliveryPageId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:delivery_pages,id',
        ]);
    }

    public function getDeliveryPageById($id)
    {
        return DeliveryPage::findOrFail($id);
    }

    public function validateUpdateDeliveryPageData($data)
    {
        return Validator::make($data, [
            'id'         => 'required|uuid|exists:delivery_pages,id',
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'video_url'  => 'nullable|url',
            'link'       => 'required|url',
            'is_active'  => 'nullable|boolean',
        ]);
    }

    public function updateDeliveryPage($request)
    {
        $data         = $request->all();
        $deliveryPage = DeliveryPage::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($deliveryPage->image_path) {
                $this->fileHandlerService->deleteFileFromStorage($deliveryPage->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'delivery_page_images', $data['title']);
        }

        $deliveryPage->update([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'] ?? $deliveryPage->image_path,
            'video_url'  => $data['video_url']  ?? $deliveryPage->video_url,
            'link'       => $data['link'],
            'is_active'  => $data['is_active'] ?? $deliveryPage->is_active,
        ]);

        return $deliveryPage;
    }

    public function deleteDeliveryPage($id)
    {
        $deliveryPage = DeliveryPage::findOrFail($id);

        // Delete associated image if exists
        if ($deliveryPage->image_path) {
            $this->fileHandlerService->deleteFileFromStorage($deliveryPage->image_path);
        }

        $deliveryPage->delete();

        return $deliveryPage;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "delivery_pages/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
