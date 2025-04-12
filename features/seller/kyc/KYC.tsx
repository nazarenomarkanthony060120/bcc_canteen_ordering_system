import React from 'react'
import KYCHeader from './component/KYCHeader'
import Seller from '../Seller'
import KYCFormCard from './component/KYCFormCard'
import KYCFooter from './component/KYCFooter'

const KYC = () => {
  return (
    <Seller className="flex-1 bg-slate-700 justify-between">
      <KYCHeader />
      <KYCFormCard />
      <KYCFooter />
    </Seller>
  )
}

export default KYC
