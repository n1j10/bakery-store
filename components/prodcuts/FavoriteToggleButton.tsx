import FavCardSignBtn from '../form/CardSignBtn';
import FavoriteToggleForm from './FavoriteToggleForm';
import { fetchFavoriteId, isSignedIn } from '@/utils/api';


async function FavoriteToggleButton({productId}:{productId:string}) {
  if(!(await isSignedIn())) return <FavCardSignBtn />

  const fetchID = await fetchFavoriteId(productId);

  return (
    <FavoriteToggleForm productID={productId} FavoriteID={fetchID} />
  )
}

export default FavoriteToggleButton
