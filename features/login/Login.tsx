import React from 'react'
import LoginController from './components/LoginFormCard'
import LoginLayout from './components/LoginLayout'

const Login = () => {
  return (
    <LoginLayout className="flex-1 justify-between px-5">
      <LoginController />
    </LoginLayout>
  )
}

export default Login
