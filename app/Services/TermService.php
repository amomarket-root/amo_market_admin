<?php

namespace App\Services;

use App\Models\Term;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class TermService
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

        $query = Term::orderBy($sortBy, $sortOrder);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->paginate($pageSize);
    }

    public function validateCreateTermData($data)
    {
        return Validator::make($data, [
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'is_active'  => 'nullable|boolean',
        ]);
    }

    public function createTerm($request)
    {
        $data = $request->all();

        // Handle file upload
        $data['image_path'] = $request->hasFile('image_file')
            ? $this->saveFile($request->file('image_file'), 'term_images', $data['title'])
            : null;

        return Term::create([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'],
            'is_active'  => $data['is_active'] ?? true,
        ]);
    }

    public function validateTermId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:terms,id',
        ]);
    }

    public function getTermById($id)
    {
        return Term::findOrFail($id);
    }

    public function validateUpdateTermData($data)
    {
        return Validator::make($data, [
            'id'         => 'required|uuid|exists:terms,id',
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
            'is_active'  => 'nullable|boolean',
        ]);
    }

    public function updateTerm($request)
    {
        $data = $request->all();
        $term = Term::findOrFail($data['id']);

        // Handle file upload
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($term->image_path) {
                $this->fileHandlerService->deleteFileFromStorage($term->image_path);
            }

            $data['image_path'] = $this->saveFile($request->file('image_file'), 'term_images', $data['title']);
        }

        $term->update([
            'title'      => $data['title'],
            'content'    => $data['content'],
            'image_path' => $data['image_path'] ?? $term->image_path,
            'is_active'  => $data['is_active']  ?? $term->is_active,
        ]);

        return $term;
    }

    public function deleteTerm($id)
    {
        $term = Term::findOrFail($id);

        // Delete associated image if exists
        if ($term->image_path) {
            $this->fileHandlerService->deleteFileFromStorage($term->image_path);
        }

        $term->delete();

        return $term;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "terms/{$folder}"; // Simplified path

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
