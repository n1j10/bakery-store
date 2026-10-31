"use server";

// كل الـ endpoints الخاصة بالـ Express backend في ملف واحد.
// كل الطلبات تتم من السيرفر (Server Components + Server Actions) باستخدام fetch
// كما في توثيق Next.js: https://nextjs.org/docs/app/getting-started/fetching-data
// التوكن (JWT) محفوظ في cookie من نوع httpOnly ويُرسل كـ "Authorization: Bearer <token>".

import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { revalidatePath } from "next/cache";
import type {
  ApiResponse,
  Cart,
  Category,
  FavoriteWithProduct,
  Order,
  Product,
  Review,
  User,
} from "./type";

const API_URL = process.env.API_URL || "http://localhost:5000/api";
const TOKEN_COOKIE = "token";

// ================= Helpers =================

// URL-encodes one path segment (ids from forms / action arguments are untrusted).
const seg = (value: unknown) => encodeURIComponent(String(value ?? ""));

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object;
  // auth: true => لازم يكون المستخدم مسجل دخول، وإلا يتحول إلى /sign-in
  auth?: boolean;
};

async function getToken() {
  return (await cookies()).get(TOKEN_COOKIE)?.value;
}

async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, auth = false, headers, ...init } = options;
  const token = await getToken();

  if (auth && !token) redirect("/sign-in");

  const isJsonBody =
    body !== undefined && !(body instanceof FormData) && typeof body === "object";

  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : (body as BodyInit | undefined),
  });
  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (res.status === 401 && auth) redirect("/sign-in");

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `فشل الطلب (${res.status})`);
  }
  return json.data;
}

const renderError = (error: unknown): { message: string } => {
  // يخلي redirect() و notFound() تشتغل حتى لو صارت داخل try/catch
  unstable_rethrow(error);
  return {
    message: error instanceof Error ? error.message : "صار خطأ غير متوقع",
  };
};

// ================= Users / Auth =================
// POST /users/register , POST /users/login , GET /users/me

async function saveToken(token: string) {
  (await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 أيام مثل JWT_EXPIRES_IN
  });
}

export const registerAction = async (prevState: any, formData: FormData) => {
  try {
    const { token } = await apiFetch<{ user: User; token: string }>("/users/register", {
      method: "POST",
      body: {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    await saveToken(token);
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const loginAction = async (prevState: any, formData: FormData) => {
  try {
    const { token } = await apiFetch<{ user: User; token: string }>("/users/login", {
      method: "POST",
      body: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    await saveToken(token);
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const logoutAction = async () => {
  (await cookies()).delete(TOKEN_COOKIE);
  redirect("/");
};

// يرجع null للزائر أو إذا التوكن منتهي
export const getCurrentUser = async (): Promise<User | null> => {
  if (!(await getToken())) return null;
  try {
    return await apiFetch<User>("/users/me");
  } catch {
    return null;
  }
};

export const isSignedIn = async () => Boolean(await getToken());

export const getAuthUser = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return user;
};

export const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.role !== "ADMIN") redirect("/");
  return user;
};

// ================= Products =================
// GET /products , GET /products/featured , GET /products/:id , GET /products/mine
// POST /products , PATCH /products/:id , PATCH /products/:id/image , DELETE /products/:id

export const fetchFeaturedProducts = async () =>
  apiFetch<Product[]>("/products/featured");

export const fetchAllProducts = async ({ search = "", categoryId, }: { search?: string; categoryId?: string; }) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (categoryId) params.set("categoryId", categoryId);
  const query = params.toString();
  return apiFetch<Product[]>(`/products${query ? `?${query}` : ""}`);
};

// المنتج يرجع مع الـ category
export const fetchSingleProduct = async (productId: string) =>
  apiFetch<Product>(`/products/${seg(productId)}`);

export const fetchAdminProducts = async () =>
  apiFetch<Product[]>("/products/mine", { auth: true });

export const createProductAction = async (prevState: any, formData: FormData,): Promise<{ message: string }> => {
  try {
    // الـ checkbox ما يرسل شي إذا ما محدد، والـ backend يعتبره false
    if (formData.has("featured")) formData.set("featured", "true");
    await apiFetch<Product>("/products", {
      method: "POST",
      body: formData, // multipart: name, description, price, featured, categoryId, image
      auth: true,
    });
    revalidatePath("/admin/products");
    return { message: "Product Created" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("id") as string;
    await apiFetch<Product>(`/products/${seg(productId)}`, {
      method: "PATCH",
      body: {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        featured: formData.has("featured"),
        categoryId: formData.get("categoryId"),
      },
      auth: true,
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("id") as string;
    const image = new FormData();
    image.set("image", formData.get("image") as File);
    await apiFetch<Product>(`/products/${seg(productId)}/image`, {
      method: "PATCH",
      body: image,
      auth: true,
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  try {
    await apiFetch<null>(`/products/${seg(prevState.productId)}`, {
      method: "DELETE",
      auth: true,
    });
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

// ================= Categories =================
// GET /categories , GET /categories/admin , GET /categories/:id
// POST /categories , PATCH /categories/:id , PATCH /categories/:id/image , DELETE /categories/:id

export const fetchAllCategories = async () =>
  apiFetch<Category[]>("/categories");

export const fetchAdminCategories = async () =>
  apiFetch<Category[]>("/categories/admin", { auth: true });

export const fetchSingleCategory = async (categoryId: string) =>
  apiFetch<Category>(`/categories/${seg(categoryId)}`);

export const createCategoryAction = async (prevState: any, formData: FormData,): Promise<{ message: string }> => {
  try {
    await apiFetch<Category>("/categories", {
      method: "POST",
      body: formData, // multipart: title, description, image
      auth: true,
    });
    revalidatePath("/admin/category");
    revalidatePath("/products");
    return { message: "Category Created successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCategoryAction = async (prevState: any, formData: FormData) => {
  try {
    const categoryId = formData.get("id") as string;
    const description = formData.get("description");
    await apiFetch<Category>(`/categories/${seg(categoryId)}`, {
      method: "PATCH",
      body: {
        title: formData.get("title"),
        ...(description !== null ? { description } : {}),
      },
      auth: true,
    });
    revalidatePath("/admin/category");
    revalidatePath("/products");
    return { message: "Category updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCategoryImageAction = async (prevState: any, formData: FormData) => {
  try {
    const categoryId = formData.get("id") as string;
    const image = new FormData();
    image.set("image", formData.get("image") as File);
    await apiFetch<Category>(`/categories/${seg(categoryId)}/image`, {
      method: "PATCH",
      body: image,
      auth: true,
    });
    revalidatePath(`/admin/category/${categoryId}/edit`);
    return { message: "Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteCategoryAction = async (prevState: { categoryId: string }) => {
  try {
    await apiFetch<null>(`/categories/${seg(prevState.categoryId)}`, {
      method: "DELETE",
      auth: true,
    });
    revalidatePath("/admin/category");
    revalidatePath("/products");
    return { message: "Category removed successfully" };
  } catch (error) {
    return renderError(error);
  }
};

// ================= Cart =================
// GET /cart/count , GET /cart , POST /cart/items , PATCH /cart/items/:itemId , DELETE /cart/items/:itemId

export const fetchCartItems = async () => {
  try {
    const { numItemsInCart } = await apiFetch<{ numItemsInCart: number }>("/cart/count");
    return numItemsInCart;
  } catch {
    return 0;
  }
};

export const fetchCart = async () => apiFetch<Cart>("/cart", { auth: true });

export const addToCartAction = async (prevState: any, formData: FormData) => {
  try {
    await apiFetch<Cart>("/cart/items", {
      method: "POST",
      body: {
        productId: formData.get("productId"),
        amount: Number(formData.get("amount")),
      },
      auth: true,
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const updateCartItemAction = async ({ amount, cartItemId, }: {
  amount: number;
  cartItemId: string;
}) => {
  try {
    await apiFetch<Cart>(`/cart/items/${seg(cartItemId)}`, {
      method: "PATCH",
      body: { amount },
      auth: true,
    });
    revalidatePath("/cart");
    return { message: "تم تحديث الكمية" };
  } catch (error) {
    return renderError(error);
  }
};

export const removeCartItemAction = async (prevState: any, formData: FormData) => {
  try {
    const cartItemId = formData.get("id") as string;
    await apiFetch<Cart>(`/cart/items/${seg(cartItemId)}`, {
      method: "DELETE",
      auth: true,
    });
    revalidatePath("/cart");
    return { message: "انحذف المنتج من السلة" };
  } catch (error) {
    return renderError(error);
  }
};

// ================= Favorites =================
// GET /favorites , GET /favorites/status/:productId , POST /favorites/toggle/:productId

export const fetchFavoriteId = async (productId: string) => {
  try {
    const { favoriteId } = await apiFetch<{ favoriteId: string | null }>(
      `/favorites/status/${productId}`,
    );
    return favoriteId;
  } catch {
    return null;
  }
};

export const toggleFavAction = async (prevState: { productId: string }) => {
  try {
    await apiFetch<{ favorited: boolean }>(`/favorites/toggle/${seg(prevState.productId)}`, {
      method: "POST",
      auth: true,
    });
    revalidatePath("/", "layout");
    return { message: "تم تحديث المفضلة" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFav = async () =>
  apiFetch<FavoriteWithProduct[]>("/favorites", { auth: true });

// ================= Orders =================
// POST /orders , GET /orders , GET /orders/all

// productId موجود => طلب منتج واحد، غير ذلك => طلب كل السلة
export const createOrderAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("productId");
    await apiFetch<Order[]>("/orders", {
      method: "POST",
      body: productId ? { productId } : {},
      auth: true,
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/orders");
};

export const fetchUserOrders = async () =>
  apiFetch<Order[]>("/orders", { auth: true });

export const fetchAdminOrders = async () =>
  apiFetch<Order[]>("/orders/all", { auth: true });

// ================= Reviews =================
// POST /reviews , GET /reviews/product/:productId , GET /reviews/all

export const createReviewAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("productId") as string;
    await apiFetch<Review>("/reviews", {
      method: "POST",
      body: {
        productId,
        rating: Number(formData.get("rating")),
        comment: formData.get("comment"),
      },
      auth: true,
    });
    revalidatePath(`/products/${productId}`);
    return { message: "شكراً، انضاف تقييمك" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) =>
  apiFetch<Review[]>(`/reviews/product/${seg(productId)}`);

export const fetchAllReviews = async () =>
  apiFetch<Review[]>("/reviews/all", { auth: true });
