<?php

namespace App\Services;

use App\Models\ShopDocument;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class ShopDocumentService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return ShopDocument::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return ShopDocument::with('shop')->orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateDocumentData($data)
    {
        return Validator::make($data, [
            'shop_id'                     => 'nullable|exists:shops,id',
            'PAN_Number'                  => 'required|string',
            'PAN_Photo_file'              => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'FSSAI_Licence'               => 'required|string',
            'FSSAI_Licence_Document_file' => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,webp|max:2048',
            'GST_number'                  => 'required|string',
            'GST_Document_file'           => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,webp|max:2048',
            'Shop_Licence'                => 'required|string',
            'Shop_Licence_Document_file'  => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,webp|max:2048',
        ]);
    }

    public function createDocument($data)
    {
        $documentData = [
            'shop_id'       => $data['shop_id'] ?? null,
            'PAN_Number'    => $data['PAN_Number'],
            'FSSAI_Licence' => $data['FSSAI_Licence'],
            'GST_number'    => $data['GST_number'],
            'Shop_Licence'  => $data['Shop_Licence'],
        ];

        // Handle PAN Photo
        if (isset($data['PAN_Photo_file']) && $data['PAN_Photo_file'] instanceof UploadedFile) {
            $dirPath                   = '/shop_documents/pan/'.($data['shop_id'] ?? 'general');
            $documentData['PAN_Photo'] = $this->fileHandlerService->saveFileToStorage($data['PAN_Photo_file'], $dirPath);
        }

        // Handle FSSAI Document
        if (isset($data['FSSAI_Licence_Document_file']) && $data['FSSAI_Licence_Document_file'] instanceof UploadedFile) {
            $dirPath                                = '/shop_documents/fssai/'.($data['shop_id'] ?? 'general');
            $documentData['FSSAI_Licence_Document'] = $this->fileHandlerService->saveFileToStorage($data['FSSAI_Licence_Document_file'], $dirPath);
        }

        // Handle GST Document
        if (isset($data['GST_Document_file']) && $data['GST_Document_file'] instanceof UploadedFile) {
            $dirPath                      = '/shop_documents/gst/'.($data['shop_id'] ?? 'general');
            $documentData['GST_Document'] = $this->fileHandlerService->saveFileToStorage($data['GST_Document_file'], $dirPath);
        }

        // Handle Shop Licence Document
        if (isset($data['Shop_Licence_Document_file']) && $data['Shop_Licence_Document_file'] instanceof UploadedFile) {
            $dirPath                               = '/shop_documents/licence/'.($data['shop_id'] ?? 'general');
            $documentData['Shop_Licence_Document'] = $this->fileHandlerService->saveFileToStorage($data['Shop_Licence_Document_file'], $dirPath);
        }

        return ShopDocument::create($documentData);
    }

    public function validateDocumentId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:shop_documents,id',
        ]);
    }

    public function getDocumentById($id)
    {
        return ShopDocument::with('shop')->findOrFail($id);
    }

    public function validateUpdateDocumentData($data)
    {
        return Validator::make($data, [
            'document_id'                 => 'required|string|exists:shop_documents,id',
            'shop_id'                     => 'nullable|exists:shops,id',
            'PAN_Number'                  => 'required|string',
            'PAN_Photo_file'              => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'FSSAI_Licence'               => 'required|string',
            'FSSAI_Licence_Document_file' => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,webp|max:2048',
            'GST_number'                  => 'required|string',
            'GST_Document_file'           => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,webp|max:2048',
            'Shop_Licence'                => 'required|string',
            'Shop_Licence_Document_file'  => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,webp|max:2048',
        ]);
    }

    public function updateDocument($data)
    {
        $document = ShopDocument::findOrFail($data['document_id']);

        $updateData = [
            'shop_id'       => $data['shop_id'] ?? $document->shop_id,
            'PAN_Number'    => $data['PAN_Number'],
            'FSSAI_Licence' => $data['FSSAI_Licence'],
            'GST_number'    => $data['GST_number'],
            'Shop_Licence'  => $data['Shop_Licence'],
        ];

        // Handle PAN Photo update
        if (isset($data['PAN_Photo_file']) && $data['PAN_Photo_file'] instanceof UploadedFile) {
            if ($document->PAN_Photo) {
                $this->fileHandlerService->deleteFileFromStorage($document->PAN_Photo);
            }
            $dirPath                 = '/shop_documents/pan/'.($data['shop_id'] ?? $document->shop_id ?? 'general');
            $updateData['PAN_Photo'] = $this->fileHandlerService->saveFileToStorage($data['PAN_Photo_file'], $dirPath);
        }

        // Handle FSSAI Document update
        if (isset($data['FSSAI_Licence_Document_file']) && $data['FSSAI_Licence_Document_file'] instanceof UploadedFile) {
            if ($document->FSSAI_Licence_Document) {
                $this->fileHandlerService->deleteFileFromStorage($document->FSSAI_Licence_Document);
            }
            $dirPath                              = '/shop_documents/fssai/'.($data['shop_id'] ?? $document->shop_id ?? 'general');
            $updateData['FSSAI_Licence_Document'] = $this->fileHandlerService->saveFileToStorage($data['FSSAI_Licence_Document_file'], $dirPath);
        }

        // Handle GST Document update
        if (isset($data['GST_Document_file']) && $data['GST_Document_file'] instanceof UploadedFile) {
            if ($document->GST_Document) {
                $this->fileHandlerService->deleteFileFromStorage($document->GST_Document);
            }
            $dirPath                    = '/shop_documents/gst/'.($data['shop_id'] ?? $document->shop_id ?? 'general');
            $updateData['GST_Document'] = $this->fileHandlerService->saveFileToStorage($data['GST_Document_file'], $dirPath);
        }

        // Handle Shop Licence Document update
        if (isset($data['Shop_Licence_Document_file']) && $data['Shop_Licence_Document_file'] instanceof UploadedFile) {
            if ($document->Shop_Licence_Document) {
                $this->fileHandlerService->deleteFileFromStorage($document->Shop_Licence_Document);
            }
            $dirPath                             = '/shop_documents/licence/'.($data['shop_id'] ?? $document->shop_id ?? 'general');
            $updateData['Shop_Licence_Document'] = $this->fileHandlerService->saveFileToStorage($data['Shop_Licence_Document_file'], $dirPath);
        }

        $document->update($updateData);

        return $document;
    }

    public function deleteDocument($id)
    {
        $document = ShopDocument::findOrFail($id);

        // Delete all associated files
        $filesToDelete = [
            $document->PAN_Photo,
            $document->FSSAI_Licence_Document,
            $document->GST_Document,
            $document->Shop_Licence_Document,
        ];

        foreach ($filesToDelete as $file) {
            if ($file) {
                $this->fileHandlerService->deleteFileFromStorage($file);
            }
        }

        $document->delete();

        return $document;
    }
}
