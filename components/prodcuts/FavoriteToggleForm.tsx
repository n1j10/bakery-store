import FormContainer from '../form/FormContainer'
import { toggleFavAction } from '@/utils/api';
import CardSubmitButton from '../form/CardSubmitBtn';

type toggleFavActionProps ={
  productID: string;
  FavoriteID: string | null;
}

function FavoriteToggleForm({productID,FavoriteID}:toggleFavActionProps) {

  // POST /favorites/toggle/:productId adds or removes it on the backend
  const toggleAction = toggleFavAction.bind(null, { productId: productID })

  return (

    <FormContainer action={toggleAction} >

      <CardSubmitButton isFav={FavoriteID ? true : false}/>

    </FormContainer>


  )
}

export default FavoriteToggleForm
