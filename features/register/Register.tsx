import React from 'react'
import RegisterLayout from './components/RegisterLayout'
import RegisterFormCard from './components/RegisterFormCard'

const Register = () => {
  return (
    <RegisterLayout className="flex-1 justify-between px-5">
      <RegisterFormCard />
    </RegisterLayout>
  )
}

export default Register
