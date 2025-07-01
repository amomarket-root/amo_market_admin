import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../Template/MainLayout';
import PrivateRoute from './PrivateRoute';
import { SweetAlertProvider } from '../Template/SweetAlert';
import { SnackbarProvider } from '../Template/SnackbarAlert';

// Lazy load all components
const LoginPage = lazy(() => import('../Auth/LoginPage'));
const RegisterPage = lazy(() => import('../Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../Auth/ResetPasswordPage'));
const PermissionPage = lazy(() => import('../Permit/PermissionPage'));
const DashboardPage = lazy(() => import('../Home/DashboardPage'));
const NotFoundPage = lazy(() => import('../Template/NotFoundPage'));

// User Management
const UserPage = lazy(() => import('../Account/User/UserPage'));
const AddUserPage = lazy(() => import('../Account/User/AddUserPage'));
const UpdateUserPage = lazy(() => import('../Account/User/UpdateUserPage'));

// Role Management
const RolePage = lazy(() => import('../Account/Role/RolePage'));
const AddRolePage = lazy(() => import('../Account/Role/AddRolePage'));
const UpdateRolePage = lazy(() => import('../Account/Role/UpdateRolePage'));

// Privilege Management
const PrivilegePage = lazy(() => import('../Account/Privilege/PrivilegePage'));
const AddPrivilegePage = lazy(() => import('../Account/Privilege/AddPrivilegePage'));
const UpdatePrivilegePage = lazy(() => import('../Account/Privilege/UpdatePrivilegePage'));

// Active Log
const ActiveLogPage = lazy(() => import('../Account/ActiveLog/ActiveLogPage'));
const CompareActiveLogPage = lazy(() => import('../Account/ActiveLog/CompareActiveLogPage'));
const ShareActiveLogPage = lazy(() => import('../Account/ActiveLog/ShareActiveLogPage'));

// Avatar
const AvatarPage = lazy(() => import('../Account/Avatar/AvatarPage'));
const AddAvatarPage = lazy(() => import('../Account/Avatar/AddAvatarPage'));
const UpdateAvatarPage = lazy(() => import('../Account/Avatar/UpdateAvatarPage'));

// User Address
const AddressPage = lazy(() => import('../Account/Address/AddressPage'));
const AddAddressPage = lazy(() => import('../Account/Address/AddAddressPage'));
const UpdateAddressPage = lazy(() => import('../Account/Address/UpdateAddressPage'));

// Shop Type Management
const ShopTypePage = lazy(() => import('../Shop/ShopType/ShopTypePage'));
const AddShopTypePage = lazy(() => import('../Shop/ShopType/AddShopTypePage'));
const UpdateShopTypePage = lazy(() => import('../Shop/ShopType/UpdateShopTypePage'));

// Shop Management
const ShopPage = lazy(() => import('../Shop/Shop/ShopPage'));
const AddShopPage = lazy(() => import('../Shop/Shop/AddShopPage'));
const UpdateShopPage = lazy(() => import('../Shop/Shop/UpdateShopPage'));

// Shop Document Management
const ShopDocumentPage = lazy(() => import('../Shop/ShopDocument/ShopDocumentPage'));
const AddShopDocumentPage = lazy(() => import('../Shop/ShopDocument/AddShopDocumentPage'));
const UpdateShopDocumentPage = lazy(() => import('../Shop/ShopDocument/UpdateShopDocumentPage'));


// Shop Bank Account Management
const ShopBankAccountPage = lazy(() => import('../Shop/ShopBankAccount/ShopBankAccountPage'));
const AddShopBankAccountPage = lazy(() => import('../Shop/ShopBankAccount/AddShopBankAccountPage'));
const UpdateShopBankAccountPage = lazy(() => import('../Shop/ShopBankAccount/UpdateShopBankAccountPage'));

// Product Management
const CategoryPage = lazy(() => import('../Product/Category/CategoryPage'));
const AddCategoryPage = lazy(() => import('../Product/Category/AddCategoryPage'));
const UpdateCategoryPage = lazy(() => import('../Product/Category/UpdateCategoryPage'));

const SubCategoryPage = lazy(() => import('../Product/SubCategory/SubCategoryPage'));
const AddSubCategoryPage = lazy(() => import('../Product/SubCategory/AddSubCategoryPage'));
const UpdateSubCategoryPage = lazy(() => import('../Product/SubCategory/UpdateSubCategoryPage'));

const ProductPage = lazy(() => import('../Product/Product/ProductPage'));
const AddProductPage = lazy(() => import('../Product/Product/AddProductPage'));
const UpdateProductPage = lazy(() => import('../Product/Product/UpdateProductPage'));

const ProductInformationPage = lazy(() => import('../Product/ProductInformation/ProductInformationPage'));
const AddProductInformationPage = lazy(() => import('../Product/ProductInformation/AddProductInformationPage'));
const UpdateProductInformationPage = lazy(() => import('../Product/ProductInformation/UpdateProductInformationPage'));

// Order Management
const OrderPage = lazy(() => import('../Order/OrderPage'));
const ViewOrderDetailsPage = lazy(() => import('../Order/ViewOrderDetailsPage'));

// Delivery Management
const DeliveryPersonPage = lazy(() => import('../Delivery/DeliveryPerson/DeliveryPersonPage'));
const AddDeliveryPersonPage = lazy(() => import('../Delivery/DeliveryPerson/AddDeliveryPersonPage'));
const UpdateDeliveryPersonPage = lazy(() => import('../Delivery/DeliveryPerson/UpdateDeliveryPersonPage'));

// Delivery Person Bank Account Management
const DeliveryPersonBankAccountPage = lazy(() => import('../Delivery/DeliveryPersonBankAccount/DeliveryPersonBankAccountPage'));
const AddDeliveryPersonBankAccountPage = lazy(() => import('../Delivery/DeliveryPersonBankAccount/AddDeliveryPersonBankAccountPage'));
const UpdateDeliveryPersonBankAccountPage = lazy(() => import('../Delivery/DeliveryPersonBankAccount/UpdateDeliveryPersonBankAccountPage'));

// Multimedia
const AdvisementPage = lazy(() => import('../Multimedia/Advisement/AdvisementPage'));
const AddAdvisementPage = lazy(() => import('../Multimedia/Advisement/AddAdvisementPage'));
const UpdateAdvisementPage = lazy(() => import('../Multimedia/Advisement/UpdateAdvisementPage'));

const BannerPage = lazy(() => import('../Multimedia/Banner/BannerPage'));
const AddBannerPage = lazy(() => import('../Multimedia/Banner/AddBannerPage'));
const UpdateBannerPage = lazy(() => import('../Multimedia/Banner/UpdateBannerPage'));

//About Us Management
const AboutUsPage = lazy(() => import('../Information/AboutUs/AboutUsPage'));
const UpdateAboutUsPage = lazy(() => import('../Information/AboutUs/UpdateAboutUsPage'));
const AddAboutUsPage = lazy(() => import('../Information/AboutUs/AddAboutUsPage'));

//Contact Us Management
const ContactUsPage = lazy(() => import('../Information/ContactUs/ContactUsPage'));
const UpdateContactUsPage = lazy(() => import('../Information/ContactUs/UpdateContactUsPage'));
const AddContactUsPage = lazy(() => import('../Information/ContactUs/AddContactUsPage'));

//Career Management
const CareerPage = lazy(() => import('../Information/Career/CareerPage'));
const UpdateCareerPage = lazy(() => import('../Information/Career/UpdateCareerPage'));
const AddCareerPage = lazy(() => import('../Information/Career/AddCareerPage'));

//Privacy Policy Management
const PrivacyPolicyPage = lazy(() => import('../Information/PrivacyPolicy/PrivacyPolicyPage'));
const AddPrivacyPolicyPage = lazy(() => import('../Information/PrivacyPolicy/AddPrivacyPolicyPage'));
const UpdatePrivacyPolicyPage = lazy(() => import('../Information/PrivacyPolicy/UpdatePrivacyPolicyPage'));

//Security Management
const AddSecurityPage = lazy(() => import('../Information/Security/AddSecurityPage'));
const SecurityPage = lazy(() => import('../Information/Security/SecurityPage'));
const UpdateSecurityPage = lazy(() => import('../Information/Security/UpdateSecurityPage'));

//Term Management
const AddTermPage = lazy(() => import('../Information/Term/AddTermPage'));
const TermPage = lazy(() => import('../Information/Term/TermPage'));
const UpdateTermPage = lazy(() => import('../Information/Term/UpdateTermPage'));

//Delivery Info Management
const AddDeliveryInfoPage = lazy(() => import('../Information/Delivery/AddDeliveryInfoPage'));
const DeliveryInfoPage = lazy(() => import('../Information/Delivery/DeliveryInfoPage'));
const UpdateDeliveryInfoPage = lazy(() => import('../Information/Delivery/UpdateDeliveryInfoPage'));

//Shop Info Management
const AddShopPageInfo = lazy(() => import('../Information/Shop/AddShopPageInfo'));
const ShopPageInfo = lazy(() => import('../Information/Shop/ShopPageInfo'));
const UpdateShopPageInfo = lazy(() => import('../Information/Shop/UpdateShopPageInfo'));

// Blog Management
const BlogPage = lazy(() => import('../Blog/BlogPage'));
const AddBlogPage = lazy(() => import('../Blog/AddBlogPage'));
const UpdateBlogPage = lazy(() => import('../Blog/UpdateBlogPage'));

//Tools Management
const Telescope = lazy(() => import('../Tools/Telescope'));
const Horizon = lazy(() => import('../Tools/Horizon'));


// Support
const SuperAdminChatPage = lazy(() => import('../Support/SuperAdminChatPage'));

const AdminRoutes = () => {
    return (
        <Suspense fallback={
            <div className="loader-container">
                <img src="/image/loader.gif" alt="Loading..." className="loader" />
            </div>
        }>
            <SweetAlertProvider>
                <SnackbarProvider>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
                        <Route path="/reset_password" element={<ResetPasswordPage />} />

                        {/* Tools Routes */}
                        <Route path="/telescope" element={<Telescope />} />
                        <Route path="/horizon" element={<Horizon />} />

                        {/* Private Routes */}
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <MainLayout><DashboardPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        <Route path="/permission" element={
                            <PrivateRoute>
                                <PermissionPage />
                            </PrivateRoute>
                        } />

                        {/* User Management */}
                        <Route path="/user" element={
                            <PrivateRoute>
                                <MainLayout><UserPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-user" element={
                            <PrivateRoute>
                                <MainLayout><AddUserPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-user/:userId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateUserPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Role Management */}
                        <Route path="/role" element={
                            <PrivateRoute>
                                <MainLayout><RolePage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-role" element={
                            <PrivateRoute>
                                <MainLayout><AddRolePage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-role/:roleId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateRolePage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Privilege Management */}
                        <Route path="/privilege" element={
                            <PrivateRoute>
                                <MainLayout><PrivilegePage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-privilege" element={
                            <PrivateRoute>
                                <MainLayout><AddPrivilegePage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-privilege/:privilegeId" element={
                            <PrivateRoute>
                                <MainLayout><UpdatePrivilegePage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Active Log */}
                        <Route path="/active-log" element={
                            <PrivateRoute>
                                <MainLayout><ActiveLogPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/compare-active-log/:activeLogId" element={
                            <PrivateRoute>
                                <MainLayout><CompareActiveLogPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/share-active-log/:activeLogId" element={
                            <PrivateRoute>
                                <MainLayout><ShareActiveLogPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Avatar */}
                        <Route path="/avatar" element={
                            <PrivateRoute>
                                <MainLayout><AvatarPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-avatar" element={
                            <PrivateRoute>
                                <MainLayout><AddAvatarPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-avatar/:avatarId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateAvatarPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Avatar */}
                        <Route path="/address" element={
                            <PrivateRoute>
                                <MainLayout><AddressPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-address" element={
                            <PrivateRoute>
                                <MainLayout><AddAddressPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-address/:addressId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateAddressPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Shop Type Management */}
                        <Route path="/shop-type" element={
                            <PrivateRoute>
                                <MainLayout><ShopTypePage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-shop-type" element={
                            <PrivateRoute>
                                <MainLayout><AddShopTypePage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-shop-type/:shopTypeId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateShopTypePage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Shop Management */}
                        <Route path="/shop" element={
                            <PrivateRoute>
                                <MainLayout><ShopPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-shop" element={
                            <PrivateRoute>
                                <MainLayout><AddShopPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-shop/:shopId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateShopPage /></MainLayout>
                            </PrivateRoute>
                        } />


                        {/* Shop Document Management */}
                        <Route path="/shop-document" element={
                            <PrivateRoute>
                                <MainLayout><ShopDocumentPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-shop-document" element={
                            <PrivateRoute>
                                <MainLayout><AddShopDocumentPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-shop-document/:documentId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateShopDocumentPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Shop Account Management */}
                        <Route path="/shop-bank-account" element={
                            <PrivateRoute>
                                <MainLayout><ShopBankAccountPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-shop-bank-account" element={
                            <PrivateRoute>
                                <MainLayout><AddShopBankAccountPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-shop-bank-account/:accountId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateShopBankAccountPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Category Management */}
                        <Route path="/category" element={
                            <PrivateRoute>
                                <MainLayout><CategoryPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-category" element={
                            <PrivateRoute>
                                <MainLayout><AddCategoryPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-category/:categoryId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateCategoryPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Subcategory Management */}
                        <Route path="/subcategory" element={
                            <PrivateRoute>
                                <MainLayout><SubCategoryPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-subcategory" element={
                            <PrivateRoute>
                                <MainLayout><AddSubCategoryPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-subcategory/:subCategoryId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateSubCategoryPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Product Management */}
                        <Route path="/product" element={
                            <PrivateRoute>
                                <MainLayout><ProductPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-product" element={
                            <PrivateRoute>
                                <MainLayout><AddProductPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-product/:productId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateProductPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Product Information */}
                        <Route path="/product-information" element={
                            <PrivateRoute>
                                <MainLayout><ProductInformationPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-product-information" element={
                            <PrivateRoute>
                                <MainLayout><AddProductInformationPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-product-information/:productInformationId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateProductInformationPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Order Management */}
                        <Route path="/order" element={
                            <PrivateRoute>
                                <MainLayout><OrderPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/view-order-details/:orderId" element={
                            <PrivateRoute>
                                <MainLayout><ViewOrderDetailsPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Delivery Management */}
                        <Route path="/delivery_person" element={
                            <PrivateRoute>
                                <MainLayout><DeliveryPersonPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-delivery_person" element={
                            <PrivateRoute>
                                <MainLayout><AddDeliveryPersonPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-delivery_person/:deliveryPersonId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateDeliveryPersonPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Delivery Person Account Management */}
                        <Route path="/delivery-person-bank-account" element={
                            <PrivateRoute>
                                <MainLayout><DeliveryPersonBankAccountPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-delivery-person-bank-account" element={
                            <PrivateRoute>
                                <MainLayout><AddDeliveryPersonBankAccountPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-delivery-person-bank-account/:accountId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateDeliveryPersonBankAccountPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Advisement Management */}
                        <Route path="/advisement" element={
                            <PrivateRoute>
                                <MainLayout><AdvisementPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-advisement" element={
                            <PrivateRoute>
                                <MainLayout><AddAdvisementPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-advisement/:advisementId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateAdvisementPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Banner Management */}
                        <Route path="/banner" element={
                            <PrivateRoute>
                                <MainLayout><BannerPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-banner" element={
                            <PrivateRoute>
                                <MainLayout><AddBannerPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-banner/:bannerId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateBannerPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* About Us Management */}
                        <Route path="/about-us" element={
                            <PrivateRoute>
                                <MainLayout><AboutUsPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-about-us" element={
                            <PrivateRoute>
                                <MainLayout><AddAboutUsPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-about-us/:aboutUsId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateAboutUsPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Contact Us Management */}
                        <Route path="/contact-us" element={
                            <PrivateRoute>
                                <MainLayout><ContactUsPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-contact-us" element={
                            <PrivateRoute>
                                <MainLayout><AddContactUsPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-contact-us/:contactUsId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateContactUsPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Career Management */}
                        <Route path="/career" element={
                            <PrivateRoute>
                                <MainLayout><CareerPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-career" element={
                            <PrivateRoute>
                                <MainLayout><AddCareerPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-career/:careerId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateCareerPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Privacy Policy Management */}
                        <Route path="/privacy-policy" element={
                            <PrivateRoute>
                                <MainLayout><PrivacyPolicyPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-privacy-policy" element={
                            <PrivateRoute>
                                <MainLayout><AddPrivacyPolicyPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-privacy-policy/:privacyPolicyId" element={
                            <PrivateRoute>
                                <MainLayout><UpdatePrivacyPolicyPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Security Management */}
                        <Route path="/security" element={
                            <PrivateRoute>
                                <MainLayout><SecurityPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-security" element={
                            <PrivateRoute>
                                <MainLayout><AddSecurityPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-security/:securityPageId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateSecurityPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Term Management */}
                        <Route path="/term" element={
                            <PrivateRoute>
                                <MainLayout><TermPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-term" element={
                            <PrivateRoute>
                                <MainLayout><AddTermPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-term/:termId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateTermPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* delivery Info Management */}
                        <Route path="/delivery-page" element={
                            <PrivateRoute>
                                <MainLayout><DeliveryInfoPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-delivery-page" element={
                            <PrivateRoute>
                                <MainLayout><AddDeliveryInfoPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-delivery-page/:deliveryPageId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateDeliveryInfoPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* shop Info Management */}
                        <Route path="/shop-page" element={
                            <PrivateRoute>
                                <MainLayout><ShopPageInfo /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-shop-page" element={
                            <PrivateRoute>
                                <MainLayout><AddShopPageInfo /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-shop-page/:shopPageId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateShopPageInfo /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Blog Management */}
                        <Route path="/blog" element={
                            <PrivateRoute>
                                <MainLayout><BlogPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/add-blog" element={
                            <PrivateRoute>
                                <MainLayout><AddBlogPage /></MainLayout>
                            </PrivateRoute>
                        } />
                        <Route path="/update-blog/:blogId" element={
                            <PrivateRoute>
                                <MainLayout><UpdateBlogPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* Support */}
                        <Route path="/support/customer-support" element={
                            <PrivateRoute>
                                <MainLayout><SuperAdminChatPage /></MainLayout>
                            </PrivateRoute>
                        } />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </SnackbarProvider>
            </SweetAlertProvider>
        </Suspense>
    );
};

export default AdminRoutes;
