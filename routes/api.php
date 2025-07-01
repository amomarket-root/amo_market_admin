<?php

use App\Http\Controllers\ActiveLog\ActiveLogController;
use App\Http\Controllers\Analytic\AnalyticController;
use App\Http\Controllers\Analytic\OrderDetailsAnalyticController;
use App\Http\Controllers\Analytic\ReportController;
use App\Http\Controllers\Auth\AdminAuthenticateController;
use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\Chat\SupportMessageController;
use App\Http\Controllers\Delivery\DeliveryPersonBankAccountController;
use App\Http\Controllers\Delivery\DeliveryPersonController;
use App\Http\Controllers\Information\AboutUsController;
use App\Http\Controllers\Information\CareerController;
use App\Http\Controllers\Information\ContactUsController;
use App\Http\Controllers\Information\DeliveryPageController;
use App\Http\Controllers\Information\PrivacyPolicyController;
use App\Http\Controllers\Information\SecurityPageController;
use App\Http\Controllers\Information\ShopPageController;
use App\Http\Controllers\Information\TermController;
use App\Http\Controllers\Location\LocationTrackController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\Privilege\PrivilegeController;
use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductInformationController;
use App\Http\Controllers\Product\SubCategoryController;
use App\Http\Controllers\Promotion\AdvisementController;
use App\Http\Controllers\Promotion\BannerController;
use App\Http\Controllers\Role\RoleController;
use App\Http\Controllers\Shop\ShopBankAccountController;
use App\Http\Controllers\Shop\ShopController;
use App\Http\Controllers\Shop\ShopDocumentController;
use App\Http\Controllers\Shop\ShopTypeController;
use App\Http\Controllers\User\AddressController;
use App\Http\Controllers\User\AvatarController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Weather\WeatherController;
use Illuminate\Support\Facades\Route;

/* ---------------------------------------------------------- */
/* ---------------- Admin Routes ----------------------------- */
/* ---------------------------------------------------------- */

Route::prefix('admin')->group(function () {
    /* ---------------- Admin Authenticate Route---------------- */
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AdminAuthenticateController::class, 'register']);
        Route::post('/login', [AdminAuthenticateController::class, 'login']);
        Route::post('/forgot_password', [AdminAuthenticateController::class, 'forgotPassword']);
        Route::post('/reset_password', [AdminAuthenticateController::class, 'resetPassword']);
    });
    Route::group(['middleware' => 'auth:sanctum'], function () {
        /* ---------------- Portal Auth User Personal config---------------- */
        Route::post('/logout', [AdminAuthenticateController::class, 'logout']);
        Route::post('/change_password', [AdminAuthenticateController::class, 'changePassword']);
        Route::get('/view_profile', [AdminAuthenticateController::class, 'viewProfile']);
        Route::post('/update_profile', [AdminAuthenticateController::class, 'updateProfile']);
        Route::get('/get_avatar', [AdminAuthenticateController::class, 'getProfileAvatar']);
        Route::get('/avatars', [AvatarController::class, 'index']);

        /* -----------Location Tracking Details Authenticate Route---------- */
        Route::get('/locations/popular', [LocationTrackController::class, 'getPopularLocations']);
        Route::get('/locations/shop', [LocationTrackController::class, 'getShopLocations']);
        Route::get('/locations/delivery-boy', [LocationTrackController::class, 'getDeliveryBoyLocations']);
        /* -----------Analytic Order Details Authenticate Route---------- */
        Route::get('/monthly-stats', [OrderDetailsAnalyticController::class, 'monthlyOrderStats']);
        Route::get('/week-stats', [OrderDetailsAnalyticController::class, 'currentWeekOrderStats']);
        Route::get('/top-locations', [OrderDetailsAnalyticController::class, 'topOrderLocations']);
        Route::get('/status-stats', [OrderDetailsAnalyticController::class, 'orderStatusStats']);
        /* -----------Analytic Authenticate Route---------- */
        Route::get('dashboard-analytic-section-1', [AnalyticController::class, 'getGoogleAnalyticData1']);
        Route::get('dashboard-analytic-section-2', [AnalyticController::class, 'getGoogleAnalyticData2']);
        Route::post('/support_send_message', [SupportMessageController::class, 'supportSendMessage']);
        Route::get('/support_messages', [SupportMessageController::class, 'supportGetMessages']);
        Route::post('/list_customers', [SupportMessageController::class, 'getCustomers']);
        Route::get('/get_shop_type', [ShopController::class, 'getShopType']);
        Route::get('/weather', [WeatherController::class, 'weather']);
        /* -----------Analytic All Report Route---------- */
        Route::get('/reports/data', [ReportController::class, 'getDataReport'])->name('api.reports.data');
    });
});
/* ----------Using Group Middleware for Authentication and Permissions------------- */
Route::group(['middleware' => ['auth:sanctum', 'permission']], function () {
    Route::prefix('admin')->group(function () {
        /* -----------User Authenticate Route---------- */
        Route::prefix('user')->group(function () {
            Route::get('/fetch_all_user', [UserController::class, 'getPaginate']);
            Route::put('/find_user', [UserController::class, 'get']);
            Route::post('/create_user', [UserController::class, 'create']);
            Route::post('/update_user', [UserController::class, 'update']);
            Route::delete('/delete_user', [UserController::class, 'delete']);
            Route::post('/change_password', [UserController::class, 'changePassword']);
        });
        /* -----------Role Authenticate Route---------- */
        Route::prefix('role')->group(function () {
            Route::get('/get_all_role', [RoleController::class, 'getAll']);
            Route::get('/fetch_all_role', [RoleController::class, 'getPaginate']);
            Route::put('/find_role', [RoleController::class, 'get']);
            Route::post('/create_role', [RoleController::class, 'create']);
            Route::post('/update_role', [RoleController::class, 'update']);
            Route::delete('/delete_role', [RoleController::class, 'delete']);
            Route::get('/find_privileges', [RoleController::class, 'getPrivileges']);
        });
        /* -----------privilege Authenticate Route---------- */
        Route::prefix('privilege')->group(function () {
            Route::get('/fetch_all_privilege', [PrivilegeController::class, 'getPaginate']);
            Route::get('/fetch_privilege', [PrivilegeController::class, 'getAll']);
            Route::put('/find_privilege', [PrivilegeController::class, 'get']);
            Route::post('/create_privilege', [PrivilegeController::class, 'create']);
            Route::post('/update_privilege', [PrivilegeController::class, 'update']);
            Route::delete('/delete_privilege', [PrivilegeController::class, 'delete']);
        });
        /* -----------Active Log Authenticate Route---------- */
        Route::prefix('active_log')->group(function () {
            Route::get('/get_all_active_log', [ActiveLogController::class, 'getAll']);
            Route::get('/fetch_all_active_log', [ActiveLogController::class, 'getPaginate']);
            Route::put('/find_active_log', [ActiveLogController::class, 'get']);
            Route::post('/update_active_log', [ActiveLogController::class, 'update']);
            Route::put('/share_active_log', [ActiveLogController::class, 'share']);
            Route::delete('/delete_active_log', [ActiveLogController::class, 'delete']);
        });
        /* -----------Shop Authenticate Route---------- */
        Route::prefix('shop')->group(function () {
            Route::get('/get_all_shop', [ShopController::class, 'getAll']);
            Route::get('/fetch_all_shop', [ShopController::class, 'getPaginate']);
            Route::put('/find_shop', [ShopController::class, 'get']);
            Route::post('/create_shop', [ShopController::class, 'create']);
            Route::post('/update_shop', [ShopController::class, 'update']);
            Route::delete('/delete_shop', [ShopController::class, 'delete']);
        });
        /* -----------shop bank account Authenticate Route---------- */
        Route::prefix('shop_bank_account')->group(function () {
            Route::get('/get_all_accounts', [ShopBankAccountController::class, 'getAll']);
            Route::get('/fetch_all_accounts', [ShopBankAccountController::class, 'getPaginate']);
            Route::put('/find_account', [ShopBankAccountController::class, 'get']);
            Route::post('/create_account', [ShopBankAccountController::class, 'create']);
            Route::post('/update_account', [ShopBankAccountController::class, 'update']);
            Route::delete('/delete_account', [ShopBankAccountController::class, 'delete']);
            Route::post('/verify_account', [ShopBankAccountController::class, 'verify']);
        });
        /* -----------Product Category Authenticate Route---------- */
        Route::prefix('category')->group(function () {
            Route::get('/get_all_category', [CategoryController::class, 'getAll']);
            Route::get('/fetch_all_category', [CategoryController::class, 'getPaginate']);
            Route::put('/find_category', [CategoryController::class, 'get']);
            Route::post('/create_category', [CategoryController::class, 'create']);
            Route::post('/update_category', [CategoryController::class, 'update']);
            Route::delete('/delete_category', [CategoryController::class, 'delete']);
        });
        /* -----------Product SubCategory Authenticate Route---------- */
        Route::prefix('subcategory')->group(function () {
            Route::get('/get_all_subcategory', [SubCategoryController::class, 'getAll']);
            Route::get('/fetch_all_subcategory', [SubCategoryController::class, 'getPaginate']);
            Route::put('/find_subcategory', [SubCategoryController::class, 'get']);
            Route::post('/create_subcategory', [SubCategoryController::class, 'create']);
            Route::post('/update_subcategory', [SubCategoryController::class, 'update']);
            Route::delete('/delete_subcategory', [SubCategoryController::class, 'delete']);
        });
        /* -----------Product Authenticate Route---------- */
        Route::prefix('product')->group(function () {
            Route::get('/get_all_product', [ProductController::class, 'getAll']);
            Route::get('/fetch_all_product', [ProductController::class, 'getPaginate']);
            Route::put('/find_product', [ProductController::class, 'get']);
            Route::post('/create_product', [ProductController::class, 'create']);
            Route::post('/update_product', [ProductController::class, 'update']);
            Route::delete('/delete_product', [ProductController::class, 'delete']);
        });
        /* -----------Product Information Authenticate Route---------- */
        Route::prefix('product_info')->group(function () {
            Route::get('/get_all_product_info', [ProductInformationController::class, 'getAll']);
            Route::get('/fetch_all_product_info', [ProductInformationController::class, 'getPaginate']);
            Route::put('/find_product_info', [ProductInformationController::class, 'get']);
            Route::post('/create_product_info', [ProductInformationController::class, 'create']);
            Route::post('/update_product_info', [ProductInformationController::class, 'update']);
            Route::delete('/delete_product_info', [ProductInformationController::class, 'delete']);
        });
        /* -----------Order Authenticate Route---------- */
        Route::prefix('order')->group(function () {
            Route::get('/get_all_order', [OrderController::class, 'getAll']);
            Route::get('/fetch_all_order', [OrderController::class, 'getPaginate']);
            Route::put('/find_order', [OrderController::class, 'get']);
        });
        /* -----------delivery person Authenticate Route---------- */
        Route::prefix('delivery_person')->group(function () {
            Route::get('/get_all_delivery_person', [DeliveryPersonController::class, 'getAll']);
            Route::get('/fetch_all_delivery_person', [DeliveryPersonController::class, 'getPaginate']);
            Route::put('/find_delivery_person', [DeliveryPersonController::class, 'get']);
            Route::post('/create_delivery_person', [DeliveryPersonController::class, 'create']);
            Route::post('/update_delivery_person', [DeliveryPersonController::class, 'update']);
            Route::delete('/delete_delivery_person', [DeliveryPersonController::class, 'delete']);
        });
        /* -----------delivery person bank account Authenticate Route---------- */
        Route::prefix('delivery_person_bank_account')->group(function () {
            Route::get('/get_all_accounts', [DeliveryPersonBankAccountController::class, 'getAll']);
            Route::get('/fetch_all_accounts', [DeliveryPersonBankAccountController::class, 'getPaginate']);
            Route::put('/find_account', [DeliveryPersonBankAccountController::class, 'get']);
            Route::post('/create_account', [DeliveryPersonBankAccountController::class, 'create']);
            Route::post('/update_account', [DeliveryPersonBankAccountController::class, 'update']);
            Route::delete('/delete_account', [DeliveryPersonBankAccountController::class, 'delete']);
            Route::post('/verify_account', [DeliveryPersonBankAccountController::class, 'verify']);
        });
        /* -----------Advisement Authenticate Route---------- */
        Route::prefix('advisement')->group(function () {
            Route::get('/get_all_advisement', [AdvisementController::class, 'getAll']);
            Route::get('/fetch_all_advisement', [AdvisementController::class, 'getPaginate']);
            Route::put('/find_advisement', [AdvisementController::class, 'get']);
            Route::post('/create_advisement', [AdvisementController::class, 'create']);
            Route::post('/update_advisement', [AdvisementController::class, 'update']);
            Route::delete('/delete_advisement', [AdvisementController::class, 'delete']);
        });
        /* -----------Banner Authenticate Route---------- */
        Route::prefix('banner')->group(function () {
            Route::get('/get_all_banner', [BannerController::class, 'getAll']);
            Route::get('/fetch_all_banner', [BannerController::class, 'getPaginate']);
            Route::put('/find_banner', [BannerController::class, 'get']);
            Route::post('/create_banner', [BannerController::class, 'create']);
            Route::post('/update_banner', [BannerController::class, 'update']);
            Route::delete('/delete_banner', [BannerController::class, 'delete']);
        });
        /* -----------Blog Authenticate Route---------- */
        Route::prefix('blog')->group(function (): void {
            Route::get('/get_all_blog', [BlogController::class, 'getAll']);
            Route::get('/fetch_all_blog', [BlogController::class, 'getPaginate']);
            Route::put('/find_blog', [BlogController::class, 'get']);
            Route::post('/create_blog', [BlogController::class, 'create']);
            Route::post('/update_blog', [BlogController::class, 'update']);
            Route::delete('/delete_blog', [BlogController::class, 'delete']);
        });
        /* -----------Shop Type Route---------- */
        Route::prefix('shop-type')->group(function () {
            Route::get('/get_all', [ShopTypeController::class, 'getAll']);
            Route::get('/fetch_all', [ShopTypeController::class, 'getPaginate']);
            Route::get('/find', [ShopTypeController::class, 'get']);
            Route::post('/create', [ShopTypeController::class, 'create']);
            Route::put('/update', [ShopTypeController::class, 'update']);
            Route::delete('/delete', [ShopTypeController::class, 'delete']);
        });

        /* -----------Shop Documents Authenticate Route---------- */
        Route::prefix('shop_document')->group(function () {
            Route::get('/get_all', [ShopDocumentController::class, 'getAll']);
            Route::get('/fetch_all', [ShopDocumentController::class, 'getPaginate']);
            Route::put('/find', [ShopDocumentController::class, 'get']);
            Route::post('/create', [ShopDocumentController::class, 'create']);
            Route::post('/update', [ShopDocumentController::class, 'update']);
            Route::delete('/delete', [ShopDocumentController::class, 'delete']);
        });

        /* -----------Avatar Authenticate Route---------- */
        Route::prefix('avatar')->group(function () {
            Route::get('/get_all_avatars', [AvatarController::class, 'getAll']);
            Route::get('/fetch_all_avatars', [AvatarController::class, 'getPaginate']);
            Route::put('/find_avatar', [AvatarController::class, 'get']);
            Route::post('/create_avatar', [AvatarController::class, 'create']);
            Route::post('/update_avatar', [AvatarController::class, 'update']);
            Route::delete('/delete_avatar', [AvatarController::class, 'delete']);
        });

        /* -----------Address Authenticate Route---------- */
        Route::prefix('address')->group(function () {
            Route::get('/get_all', [AddressController::class, 'getAll']);
            Route::get('/fetch_all', [AddressController::class, 'getPaginate']);
            Route::put('/find', [AddressController::class, 'get']);
            Route::post('/create', [AddressController::class, 'create']);
            Route::post('/update', [AddressController::class, 'update']);
            Route::delete('/delete', [AddressController::class, 'delete']);
        });

        /* -----------About Us Authenticate Route---------- */
        Route::prefix('about_us')->group(function () {
            Route::get('/fetch_all_about_us', [AboutUsController::class, 'getPaginate']);
            Route::put('/find_about_us', [AboutUsController::class, 'get']);
            Route::post('/create_about_us', [AboutUsController::class, 'create']);
            Route::post('/update_about_us', [AboutUsController::class, 'update']);
            Route::delete('/delete_about_us', [AboutUsController::class, 'delete']);
        });

        /* -----------Contact Us Authenticate Route---------- */
        Route::prefix('contact_us')->group(function () {
            Route::get('/fetch_all_contact_us', [ContactUsController::class, 'getPaginate']);
            Route::put('/find_contact_us', [ContactUsController::class, 'get']);
            Route::post('/create_contact_us', [ContactUsController::class, 'create']);
            Route::post('/update_contact_us', [ContactUsController::class, 'update']);
            Route::delete('/delete_contact_us', [ContactUsController::class, 'delete']);
        });

        /* -----------Careers Authenticate Route---------- */
        Route::prefix('careers')->group(function () {
            Route::get('/fetch_all_careers', [CareerController::class, 'getPaginate']);
            Route::put('/find_career', [CareerController::class, 'get']);
            Route::post('/create_career', [CareerController::class, 'create']);
            Route::post('/update_career', [CareerController::class, 'update']);
            Route::delete('/delete_career', [CareerController::class, 'delete']);
        });

        /* -----------Privacy Policy Authenticate Route---------- */
        Route::prefix('privacy_policy')->group(function () {
            Route::get('/fetch_all_privacy_policies', [PrivacyPolicyController::class, 'getPaginate']);
            Route::put('/find_privacy_policy', [PrivacyPolicyController::class, 'get']);
            Route::post('/create_privacy_policy', [PrivacyPolicyController::class, 'create']);
            Route::post('/update_privacy_policy', [PrivacyPolicyController::class, 'update']);
            Route::delete('/delete_privacy_policy', [PrivacyPolicyController::class, 'delete']);
        });

        /* -----------Security Page Authenticate Route---------- */
        Route::prefix('security_pages')->group(function () {
            Route::get('/fetch_all_security_pages', [SecurityPageController::class, 'getPaginate']);
            Route::put('/find_security_page', [SecurityPageController::class, 'get']);
            Route::post('/create_security_page', [SecurityPageController::class, 'create']);
            Route::post('/update_security_page', [SecurityPageController::class, 'update']);
            Route::delete('/delete_security_page', [SecurityPageController::class, 'delete']);
        });

        /* -----------Terms Authenticate Route---------- */
        Route::prefix('terms')->group(function () {
            Route::get('/fetch_all_terms', [TermController::class, 'getPaginate']);
            Route::put('/find_term', [TermController::class, 'get']);
            Route::post('/create_term', [TermController::class, 'create']);
            Route::post('/update_term', [TermController::class, 'update']);
            Route::delete('/delete_term', [TermController::class, 'delete']);
        });

        /* -----------Delivery Pages Authenticate Route---------- */
        Route::prefix('delivery_pages')->group(function () {
            Route::get('/fetch_all_delivery_pages', [DeliveryPageController::class, 'getPaginate']);
            Route::put('/find_delivery_page', [DeliveryPageController::class, 'get']);
            Route::post('/create_delivery_page', [DeliveryPageController::class, 'create']);
            Route::post('/update_delivery_page', [DeliveryPageController::class, 'update']);
            Route::delete('/delete_delivery_page', [DeliveryPageController::class, 'delete']);
        });

        /* -----------Shop Pages Authenticate Route---------- */
        Route::prefix('shop_pages')->group(function () {
            Route::get('/fetch_all_shop_pages', [ShopPageController::class, 'getPaginate']);
            Route::put('/find_shop_page', [ShopPageController::class, 'get']);
            Route::post('/create_shop_page', [ShopPageController::class, 'create']);
            Route::post('/update_shop_page', [ShopPageController::class, 'update']);
            Route::delete('/delete_shop_page', [ShopPageController::class, 'delete']);
        });
    });
});
