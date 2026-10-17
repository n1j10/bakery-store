type NavBarLinks = {
  href: string;
  name: string;
  label: string;
};

// name is used in code (e.g. hide "dashboard" for non-admins), label is what users see.
export const dropDownMenuLinks: NavBarLinks[] = [
  { href: '/', name: 'home', label: 'الرئيسية' },
  { href: '/products', name: 'products', label: 'كل المنتجات' },
  { href: '/cart', name: 'cart', label: 'السلة' },
  { href: '/orders', name: 'orders', label: 'طلباتي' },
  { href: '/favorites', name: 'favorites', label: 'المفضلة' },
  { href: '/reviews', name: 'reviews', label: 'التقييمات' },
  { href: '/about', name: 'about', label: 'من نحن' },
  { href: '/admin/products/create', name: 'dashboard', label: 'لوحة التحكم' },
];

// Shown inline in the header on large screens
export const headerLinks: NavBarLinks[] = [
  { href: '/', name: 'home', label: 'الرئيسية' },
  { href: '/products', name: 'products', label: 'المنتجات' },
  { href: '/about', name: 'about', label: 'من نحن' },
];

export let links = {
  HOME: { href: '/', name: 'Home' },
  ABOUT: { href: '/about', name: 'About' },
  CART: { href: '/cart', name: 'Cart' },
  PRODUCTS: { href: '/products', name: 'Products' },
  AdminProducts: { href: '/admin/products', name: 'Products' },
  AdminCategories: { href: '/admin/category', name: 'Categories' },
} as const


export const adminLinks: NavBarLinks[] = [
  { href: '/admin/category/create', name: 'create category', label: 'إضافة قسم' },
  { href: '/admin/products/create', name: 'create product', label: 'إضافة منتج' },
  { href: '/admin/products', name: 'my products', label: 'منتجاتي' },
  { href: '/admin/category', name: 'my categories', label: 'أقسامي' },
];
