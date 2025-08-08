
export const baseUrl = "http://localhost:3000";

export const Auth_login_Api = `${baseUrl}/api/v4/auth/login`;
export const Auth_signup_Api = `${baseUrl}/api/v4/auth/signup`;
export const Auth_forgotpass_Api = `${baseUrl}/api/v4/auth/forgot-password`;
//add product
export const Add_Product_Api= `${baseUrl}/api/v4/addproduct`;
export const Get_Product_Api= `${baseUrl}/api/v4/myproducts`;
export const Delete_Product_Api =`${baseUrl}/api/v4/deleteproduct`;
export const Get_Single_Product_Api= `${baseUrl}/api/v4/product`;
export const updateProduct_Api =`${baseUrl}/api/v4/updateproduct`;
export const Get_All_Product_Api = `${baseUrl}/api/v4/allproducts`;
export const getSellerSummary = `${baseUrl}/api/v4/getSellerSummary`;
//add to cart
export const add_to_cart =`${baseUrl}/api/cart/add`;
export const get_to_cart =`${baseUrl}/api/cart/get`;
export const remove_cart = (productId) => `${baseUrl}/api/cart/remove/${productId}`;
export const cart_summary =`${baseUrl}/api/cart/cartsummary`;
//add to wishlist
export const add_to_wishlist =`${baseUrl}/api/wishlist/add`;
export const get_to_wishlist =`${baseUrl}/api/wishlist/get`;
export const remove_to_wishlist =`${baseUrl}/api/wishlist/remove`;