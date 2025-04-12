// import { View, Text, Pressable } from 'react-native'
// import React, { useContext, useEffect } from 'react'
// import { useRouter } from 'expo-router'
// import { auth } from '@/lib/firestore'
// import { AuthContext } from '@/context/auth'

// const Logout = () => {
//   const router = useRouter()
//   const { setUser } = useContext<any>(AuthContext)

//   const handleLogout = async () => {
//     try {
//       await auth.signOut()
//       setUser(null)
//       router.replace('/screens/login')
//     } catch (error) {
//       console.error('Logout Error:', error)
//     }
//   }

//   useEffect(() => {
//     handleLogout()
//   }, [])

//   return (
//     <Pressable onPress={handleLogout}>
//       <Text>Logout</Text>
//     </Pressable>
//   )
// }

// export default Logout
