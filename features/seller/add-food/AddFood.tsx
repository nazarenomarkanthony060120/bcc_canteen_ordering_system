import React from 'react'
import Seller from '../Seller'
import AddFoodHeader from './component/AddFoodHeader'
import AddFoodFooter from './component/AddFoodFooter'
import AddFoodFormCard from './component/AddFoodFormCard'

const AddFood = () => {
  return (
    <Seller className="flex-1 justify-between bg-[#ccffcc] px-5">
      <AddFoodHeader />
      <AddFoodFormCard />
      <AddFoodFooter />
    </Seller>
  )
}

export default AddFood
