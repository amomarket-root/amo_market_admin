<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Services\BlogService;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    protected $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function getAll()
    {
        $blogs = $this->blogService->getAll();

        if ($blogs->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Blogs Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Blogs Retrieved Successfully.',
            'data'    => $blogs,
        ], 200);
    }

    public function getPaginate(Request $request)
    {
        try {
            $blogs = $this->blogService->getPaginate($request->all());

            if ($blogs->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Blogs Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Blogs Retrieved Successfully.',
                'data'    => $blogs,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            // Validate request data
            $validator = $this->blogService->validateCreateBlogData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $blog = $this->blogService->createBlog($request);

            return response()->json([
                'status'  => true,
                'message' => 'Blog Added Successfully.',
                'data'    => $blog,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function get(Request $request)
    {
        try {
            $validator = $this->blogService->validateBlogId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $blog = $this->blogService->getBlogById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Blog Retrieved Successfully.',
                'data'    => $blog,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            // Validate request data
            $validator = $this->blogService->validateUpdateBlogData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $blog = $this->blogService->updateBlog($request);

            return response()->json([
                'status'  => true,
                'message' => 'Blog Updated Successfully.',
                'data'    => $blog,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $validator = $this->blogService->validateBlogId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $blog = $this->blogService->deleteBlog($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Blog Deleted Successfully.',
                'data'    => $blog,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
