import { FieldValue } from 'firebase/firestore'

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
  type: UserType
  email: string
  password: string
  confirmPassword: string
}

export type UserIdRequest = {
  id: string | undefined
}

export type StoreIdRequest = {
  id: string | null | undefined
}

export type UserKYC = {
  id: string
  name: string
  phoneNumber: string
  address: string
  birthDate: string
}

export type UpdateProfile = {
  phoneNumber: string
  address: string
  birthDate: string
  status: number
  updatedAt: FieldValue
}

export type CreateStore = {
  userId: string
  store: string
  address: string
}

export type Store = {
  id: string
  store: string
  address: string
  status: StoreStatus
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type AddFood = {
  id: string
  name: string
  price: number
  quantity: number
  type: FoodType
  description: string
}

export type Food = {
  id: string
  name: string
  price: number
  quantity: number
  type: FoodType
  description: string
  createdAt: FieldValue
  updatedAt: FieldValue
}

// Enum Decleared

export enum FoodType {
  VEGETABLE = 'Vegetable',
  FRUITS = 'Fruits',
  MEAT = 'Meat',
  SNACKS = 'Snacks',
  DRINKS = 'Drinks',
  RICE = 'Rice',
  OTHER = 'Other',
}

export enum UserType {
  SELLER = 'Seller',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
  OUTSIDER = 'Outsider',
}

export enum UserKYCStatus {
  APPLIED = 0,
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 9,
}

export enum StoreStatus {
  APPLIED = 0,
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 9,
}

export enum StoreStatusText {
  APPLIED = 'Applied',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  UNKWON = 'Unknown',
}
