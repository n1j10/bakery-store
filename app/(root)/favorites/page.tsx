export const dynamic = 'force-dynamic';

import SectionTitle from '@/components/global/SectionTitle'
import EmptyList from '@/components/global/EmptyList';
import ProductsGrid from '@/components/prodcuts/ProductsGrid';
import { fetchUserFav } from '@/utils/api';

const FavoritesPage = async () => {
  const userFavorites = await fetchUserFav();

  if (userFavorites.length === 0) {
    return <EmptyList title='ما عندك مفضلة بعد' description='اضغط على القلب ♡ بأي منتج حتى تحفظه هنا.' withLink />;
  }

  return (
    <>
      <SectionTitle eyebrow={`${userFavorites.length} منتج`} text='المفضلة' />
      <ProductsGrid products={userFavorites.map((fav) => fav.product)} />
    </>
  )
}

export default FavoritesPage
