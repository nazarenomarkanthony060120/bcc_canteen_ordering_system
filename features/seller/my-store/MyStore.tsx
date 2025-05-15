import React from 'react'
import Seller from '../Seller'
import MyStoreFormCard from './component/MyStoreFormCard'
import MyStoreHeader from './component/MyStoreHeader'
import MyStoreFooter from './component/MyStoreFooter'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import Typo from '@/components/common/typo'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface MyStoreProps {
  params: URLSearchParams
}

const MyStore = ({ params }: MyStoreProps) => {
  const storeId = params.get('storeId')
  const { data: storeData, isFetching } = useGetStoreByStoreId({
    id: storeId,
  })

  if (isFetching) return <LoadingIndicator />

  return (
    <Seller className="flex-1 justify-between bg-[#ccffcc]">
      <MyStoreHeader />
      <MyStoreFormCard store={storeData} />
      <MyStoreFooter storeId={storeId} />
    </Seller>
  )
}

export default MyStore
