// Types matching the JSON returned by the Express backend (dates arrive as ISO strings).

export type actionFunction = (prevState: any,formData: FormData) => Promise<{ message: string }>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
};

export type Category = {
  id: string;
  title: string;
  description: string | null;
  image: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  userId: string;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
  category?: Category | null;
};

export type CartItem = {
  id: string;
  productId: string;
  cartId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItemWithProduct = CartItem & { product: Product };

export type Cart = {
  id: string;
  userId: string;
  cartItems: CartItemWithProduct[];
  numItemsInCart: number;
  cartTotal: number;
  orderTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type Favorite = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
};

export type FavoriteWithProduct = Favorite & { product: Product };

export type Order = {
  id: string;
  userId: string;
  productId: string;
  products: number;
  orderTotal: number;
  createdAt: string;
  product: { name: string };
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  user?: { id: string; name: string; imageUrl: string | null };
  product?: { id: string; name: string };
};
