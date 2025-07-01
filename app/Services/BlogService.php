<?php

namespace App\Services;

use App\Models\Blog;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class BlogService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return Blog::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return Blog::orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateBlogData($data)
    {
        return Validator::make($data, [
            'main_title'           => 'required|string',
            'category'             => 'required|in:shop,delivery,customer,promotion,reward,product,service',
            'date'                 => 'required|date',
            'location'             => 'nullable|string',
            'custom_url'           => 'nullable|string',
            'multimedia_file'      => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,mp4,mov,avi|max:20480', // Allow images and videos
            'header'               => 'nullable|string',
            'description'          => 'nullable|string',
            'other_images_files'   => 'nullable|array', // Array of image files
            'other_images_files.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validate each image in the array
        ]);
    }

    public function createBlog($request)
    {
        $data = $request->all(); // Convert request to array

        // Handle multimedia file upload
        $data['multimedia'] = $request->hasFile('multimedia_file')
            ? $this->saveFile($request->file('multimedia_file'), 'blogs/multimedia', $data['main_title'])
            : null;

        // Handle other images upload
        $data['other_images'] = $request->hasFile('other_images_files')
            ? $this->saveMultipleFiles($request->file('other_images_files'), 'blogs/other_images', $data['main_title'])
            : null;

        // Create the blog
        return Blog::create([
            'main_title'   => $data['main_title'],
            'category'     => $data['category'],
            'date'         => $data['date'],
            'location'     => $data['location']   ?? null,
            'custom_url'   => $data['custom_url'] ?? null,
            'multimedia'   => $data['multimedia'],
            'header'       => $data['header']      ?? null,
            'description'  => $data['description'] ?? null,
            'other_images' => $data['other_images'],
        ]);
    }

    public function validateBlogId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:blogs,id',
        ]);
    }

    public function getBlogById($id)
    {
        return Blog::findOrFail($id);
    }

    public function validateUpdateBlogData($data)
    {
        return Validator::make($data, [
            'id'                   => 'required|uuid|exists:blogs,id',
            'main_title'           => 'required|string',
            'category'             => 'required|in:shop,delivery,customer,promotion,reward,product,service',
            'date'                 => 'required|date',
            'location'             => 'nullable|string',
            'custom_url'           => 'nullable|string',
            'multimedia_file'      => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,mp4,mov,avi|max:20480', // Allow images and videos
            'header'               => 'nullable|string',
            'description'          => 'nullable|string',
            'other_images_files'   => 'nullable|array', // Array of image files
            'other_images_files.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validate each image in the array
        ]);
    }

    public function updateBlog($request)
    {
        $data = $request->all(); // Convert request data to an array
        $blog = Blog::findOrFail($data['id']);

        // Handle multimedia file upload
        if ($request->hasFile('multimedia_file')) {
            $data['multimedia'] = $this->saveFile($request->file('multimedia_file'), 'blogs/multimedia', $data['main_title']);
        }

        // Handle other images upload
        if ($request->hasFile('other_images_files')) {
            $data['other_images'] = $this->saveMultipleFiles($request->file('other_images_files'), 'blogs/other_images', $data['main_title']);
        }

        // Update only the fields that are provided
        $blog->update([
            'main_title'   => $data['main_title'],
            'category'     => $data['category'],
            'date'         => $data['date'],
            'location'     => $data['location']     ?? $blog->location,
            'custom_url'   => $data['custom_url']   ?? $blog->custom_url,
            'multimedia'   => $data['multimedia']   ?? $blog->multimedia,
            'header'       => $data['header']       ?? $blog->header,
            'description'  => $data['description']  ?? $blog->description,
            'other_images' => $data['other_images'] ?? $blog->other_images,
        ]);

        return $blog;
    }

    public function deleteBlog($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return $blog;
    }

    // Save a single file
    private function saveFile(UploadedFile $file, $folder, $name)
    {
        $dirPath = "{$folder}/{$name}";

        return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
    }

    // Save multiple files
    private function saveMultipleFiles(array $files, $folder, $name)
    {
        $filePaths = [];
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $filePaths[] = $this->saveFile($file, $folder, $name);
            }
        }

        return json_encode($filePaths, JSON_UNESCAPED_SLASHES); // Use JSON_UNESCAPED_SLASHES to prevent escaping slashes
    }
}
