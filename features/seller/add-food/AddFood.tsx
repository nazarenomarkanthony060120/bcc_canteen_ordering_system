import React from 'react'
import Seller from '../Seller'
import AddFoodHeader from './component/AddFoodHeader'
import AddFoodFooter from './component/AddFoodFooter'
import AddFoodFormCard from './component/AddFoodFormCard'

interface AddFoodProps {
  params: URLSearchParams
}

const AddFood = ({ params }: AddFoodProps) => {
  const storeId = params.get('storeId')

  return (
    <Seller className="flex-1 justify-between bg-[#ccffcc] px-5">
      <AddFoodHeader storeId={storeId} />
      <AddFoodFormCard storeId={storeId} />
      <AddFoodFooter />
    </Seller>
  )
}

export default AddFood
