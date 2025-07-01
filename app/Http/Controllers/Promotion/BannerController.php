<?php

namespace App\Http\Controllers\Promotion;

use App\Http\Controllers\Controller;
use App\Services\BannerService;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    protected $bannerService;

    public function __construct(BannerService $bannerService)
    {
        $this->bannerService = $bannerService;
    }

    /**
     * @OA\Get(
     *     path="/api/admin/banner/get_all_banner",
     *     tags={"Admin Banner"},
     *     summary="Get all banners",
     *     description="Retrieve a list of all banners for the admin panel",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Banners retrieved successfully",
     *
     *         @OA\JsonContent(
     *             type="object",
     *
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Banners Retrieved Successfully."),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *
     *                 @OA\Items(
     *                     type="object",
     *
     *                     @OA\Property(property="id", type="string", format="uuid", example="2981fa9b-dbe5-46f8-b857-2cd370ddaa83"),
     *                     @OA\Property(property="shop_id", type="string", format="uuid", example="cfd60a7b-0caf-4c01-8577-0fb108cc826e"),
     *                     @OA\Property(property="title", type="string", example="Vegetable Store"),
     *                     @OA\Property(property="content_image", type="string", format="uri", example="http://localhost:8000/storage/banners/vegitable_banner.webp"),
     *                     @OA\Property(property="status", type="integer", example=1),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                     @OA\Property(property="deleted_at", type="string", nullable=true, example=null)
     *                 )
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="No banners found",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="No Banners Found.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User not authenticated.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to perform this action.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something went wrong.")
     *         )
     *     )
     * )
     */
    public function getAll()
    {
        $banners = $this->bannerService->getAll();

        if ($banners->isEmpty()) {
            return response()->json([
                'status'  => false,
                'message' => 'No Banners Found.',
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Banners Retrieved Successfully.',
            'data'    => $banners,
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/banner/fetch_all_banner",
     *     operationId="getAllBannersPaginated",
     *     tags={"Admin Banner"},
     *     summary="Fetch all banners with pagination",
     *     description="Returns a paginated list of all banners for admin panel with optional sorting and filtering",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number for pagination",
     *         required=false,
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of records per page",
     *         required=false,
     *
     *         @OA\Schema(type="integer", example=10)
     *     ),
     *
     *     @OA\Parameter(
     *         name="sort_by",
     *         in="query",
     *         description="Column name to sort by",
     *         required=false,
     *
     *         @OA\Schema(type="string", example="id")
     *     ),
     *
     *     @OA\Parameter(
     *         name="sort_order",
     *         in="query",
     *         description="Sort order (asc or desc)",
     *         required=false,
     *
     *         @OA\Schema(type="string", enum={"asc", "desc"}, example="desc")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Banners Retrieved Successfully.",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Banners Retrieved Successfully."),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *
     *                 @OA\Items(
     *
     *                     @OA\Property(property="id", type="string", format="uuid", example="2981fa9b-dbe5-46f8-b857-2cd370ddaa83"),
     *                     @OA\Property(property="shop_id", type="string", format="uuid", example="cfd60a7b-0caf-4c01-8577-0fb108cc826e"),
     *                     @OA\Property(property="title", type="string", example="Vegetable Store"),
     *                     @OA\Property(property="content_image", type="string", format="url", example="http://localhost:8000/storage/banners/vegitable_banner.webp"),
     *                     @OA\Property(property="status", type="integer", example=1),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                     @OA\Property(property="deleted_at", type="string", format="nullable", nullable=true, example=null)
     *                 )
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="No Banners Found.",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="No Banners Found.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User not authenticated.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to perform this action.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something went wrong.")
     *         )
     *     )
     * )
     */
    public function getPaginate(Request $request)
    {
        try {
            $banners = $this->bannerService->getPaginate($request->all());

            if ($banners->isEmpty()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'No Banners Found.',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Banners Retrieved Successfully.',
                'data'    => $banners,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/admin/banner/create_banner",
     *     operationId="createBanner",
     *     tags={"Admin Banner"},
     *     summary="Create a new banner",
     *     description="Creates a new banner with optional image upload",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *
     *             @OA\Schema(
     *                 required={"title", "status"},
     *
     *                 @OA\Property(
     *                     property="shop_id",
     *                     type="string",
     *                     format="uuid",
     *                     description="Optional shop UUID",
     *                     example="cfd60a7b-0caf-4c01-8577-0fb108cc826e"
     *                 ),
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                     description="Title of the banner",
     *                     example="Vegetable Store"
     *                 ),
     *                 @OA\Property(
     *                     property="status",
     *                     type="integer",
     *                     description="Status of the banner (1 = active, 0 = inactive)",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="content_image_file",
     *                     type="string",
     *                     format="binary",
     *                     description="Image file (jpeg, png, jpg, gif). Max 3MB"
     *                 )
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Banner Added Successfully.",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Banner Added Successfully."),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="e7b23cd3-c78e-4bd2-ae01-8d429e8424c0"),
     *                 @OA\Property(property="shop_id", type="string", format="uuid", example="cfd60a7b-0caf-4c01-8577-0fb108cc826e"),
     *                 @OA\Property(property="title", type="string", example="Vegetable Store"),
     *                 @OA\Property(property="content_image", type="string", format="url", example="http://localhost:8000/storage/banner_images/vegetable_store.jpg"),
     *                 @OA\Property(property="status", type="integer", example=1),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-22T04:00:00.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-22T04:00:00.000000Z")
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={"title": {"The title field is required."}, "status": {"The status field is required."}}
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User not authenticated.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to perform this action.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something went wrong.")
     *         )
     *     )
     * )
     */
    public function create(Request $request)
    {
        try {
            // Validate request data
            $validator = $this->bannerService->validateCreateBannerData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $banner = $this->bannerService->createBanner($request);

            return response()->json([
                'status'  => true,
                'message' => 'Banner Added Successfully.',
                'data'    => $banner,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/admin/banner/find_banner",
     *     operationId="findBanner",
     *     tags={"Admin Banner"},
     *     summary="Get banner by ID",
     *     description="Retrieves a specific banner by its UUID.",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"id"},
     *
     *             @OA\Property(
     *                 property="id",
     *                 type="string",
     *                 format="uuid",
     *                 description="UUID of the banner",
     *                 example="bc6e2b21-d3f0-4c61-b153-285555f940e7"
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Banner Retrieved Successfully.",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Banner Retrieved Successfully."),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="bc6e2b21-d3f0-4c61-b153-285555f940e7"),
     *                 @OA\Property(property="shop_id", type="string", format="uuid", example="293b896d-8e92-49bb-a61e-83fa112b64d1"),
     *                 @OA\Property(property="title", type="string", example="Paan corner"),
     *                 @OA\Property(property="content_image", type="string", format="url", example="http://localhost:8000/storage/banners/singlebanner.webp"),
     *                 @OA\Property(property="status", type="integer", example=1),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                 @OA\Property(property="deleted_at", type="string", nullable=true, format="date-time", example=null)
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={"id": {"The selected id is invalid."}}
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Banner not found",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="No query results for model [App\\Models\\BannerPage] bc6e2b21-d3f0-4c61-b153-285555f940e7")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User not authenticated.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to perform this action.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something went wrong.")
     *         )
     *     )
     * )
     */
    public function get(Request $request)
    {
        try {
            $validator = $this->bannerService->validateBannerId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $banner = $this->bannerService->getBannerById($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Banner Retrieved Successfully.',
                'data'    => $banner,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/admin/banner/update_banner",
     *     operationId="updateBanner",
     *     tags={"Admin Banner"},
     *     summary="Update an existing banner",
     *     description="Updates a banner's details including title, shop_id, status, and optional content image.",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *
     *             @OA\Schema(
     *                 required={"banner_id", "title", "status"},
     *
     *                 @OA\Property(
     *                     property="banner_id",
     *                     type="string",
     *                     format="uuid",
     *                     description="UUID of the banner to update",
     *                     example="2981fa9b-dbe5-46f8-b857-2cd370ddaa83"
     *                 ),
     *                 @OA\Property(
     *                     property="shop_id",
     *                     type="string",
     *                     format="uuid",
     *                     nullable=true,
     *                     description="UUID of the shop associated with the banner",
     *                     example="cfd60a7b-0caf-4c01-8577-0fb108cc826e"
     *                 ),
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                     description="Title of the banner",
     *                     example="Vegetable Store"
     *                 ),
     *                 @OA\Property(
     *                     property="status",
     *                     type="integer",
     *                     description="Status of the banner (e.g., 1 for active, 0 for inactive)",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="content_image_file",
     *                     type="string",
     *                     format="binary",
     *                     description="Optional banner image file (jpeg, png, jpg, gif, max 3MB)"
     *                 )
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Banner Updated Successfully.",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Banner Updated Successfully."),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="2981fa9b-dbe5-46f8-b857-2cd370ddaa83"),
     *                 @OA\Property(property="shop_id", type="string", format="uuid", example="cfd60a7b-0caf-4c01-8577-0fb108cc826e"),
     *                 @OA\Property(property="title", type="string", example="Vegetable Store"),
     *                 @OA\Property(property="content_image", type="string", format="url", example="http://localhost:8000/storage/banners/vegitable_banner.webp"),
     *                 @OA\Property(property="status", type="integer", example=1),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                 @OA\Property(property="deleted_at", type="string", nullable=true, example=null)
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={
     *                     "title": {"The title field is required."}
     *                 }
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User not authenticated.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to perform this action.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something went wrong.")
     *         )
     *     )
     * )
     */
    public function update(Request $request)
    {
        try {
            // Validate request data
            $validator = $this->bannerService->validateUpdateBannerData($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            // Pass the entire request object instead of request->all()
            $banner = $this->bannerService->updateBanner($request);

            return response()->json([
                'status'  => true,
                'message' => 'Banner Updated Successfully.',
                'data'    => $banner,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/admin/banner/delete_banner",
     *     operationId="deleteBanner",
     *     tags={"Admin Banner"},
     *     summary="Delete a banner by ID",
     *     description="Deletes a banner from the system using the provided banner ID.",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\MediaType(
     *             mediaType="application/json",
     *
     *             @OA\Schema(
     *                 required={"id"},
     *
     *                 @OA\Property(
     *                     property="id",
     *                     type="string",
     *                     format="uuid",
     *                     description="UUID of the banner to delete",
     *                     example="bc6e2b21-d3f0-4c61-b153-285555f940e7"
     *                 )
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Banner Deleted Successfully.",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Banner Deleted Successfully."),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="bc6e2b21-d3f0-4c61-b153-285555f940e7"),
     *                 @OA\Property(property="shop_id", type="string", format="uuid", example="293b896d-8e92-49bb-a61e-83fa112b64d1"),
     *                 @OA\Property(property="title", type="string", example="Paan corner"),
     *                 @OA\Property(property="content_image", type="string", format="url", example="http://localhost:8000/storage/banners/singlebanner.webp"),
     *                 @OA\Property(property="status", type="integer", example=1),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-05-22T03:56:14.000000Z"),
     *                 @OA\Property(property="deleted_at", type="string", nullable=true, example=null)
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={
     *                     "id": {"The id field is required."}
     *                 }
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="User not authenticated.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to perform this action.")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something went wrong.")
     *         )
     *     )
     * )
     */
    public function delete(Request $request)
    {
        try {
            $validator = $this->bannerService->validateBannerId($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 400);
            }

            $banner = $this->bannerService->deleteBanner($request->id);

            return response()->json([
                'status'  => true,
                'message' => 'Banner Deleted Successfully.',
                'data'    => $banner,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
