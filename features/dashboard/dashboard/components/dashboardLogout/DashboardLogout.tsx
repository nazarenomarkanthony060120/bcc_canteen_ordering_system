import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import Icon from '@/components/common/icon'

const DashboardLogout = () => {
  // const router = useRouter()
  // const { mutate: logout, error, isSuccess } = useLogout()

  // const onSubmit = () => {
  //   logout(undefined, { onSuccess: () => router.replace('/screens/login') })
  // }
  return (
    <View>
      <TouchableOpacity className='flex relative justify-center items-center' >
        <Icon name="logout" className='' size={30} color="cyan" />
      </TouchableOpacity>
    </View>
    // <TouchableOpacity className="absolute right-5 top-2">
    //   <Icon name="logout" size={56} color="black" />
    // </TouchableOpacity>
  )
}

export default DashboardLogout
