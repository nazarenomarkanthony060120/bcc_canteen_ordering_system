export type ResponseType = {
  success: boolean
  data?: any
  msg?: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  id: string
  name: string
  type: 'Seller' | 'Student' | 'Teacher' | 'Outsider'
  email: string
  password: string
  confirmPassword: string
}

export type UserIdRequest = {
  id: string | undefined
}

export type UserKYC = {
  name: string
  phoneNumber: string
  address: string
  birthDate: string
}
