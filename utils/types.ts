import { FieldValue } from 'firebase/firestore'
import { Field } from 'react-hook-form'

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

export type FoodIdRequest = {
  id: string | null | undefined
}

export type AddCartRequest = {
  foodId: string
  userId: string
  quantity: number
  totalPrice: number
  createdAt: FieldValue
  updatedAt: FieldValue
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
  userId: string
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

export type User = {
  id: string
  managedId: string
  type: UserType
  name: string
  email: string
  status: UserKYCStatus
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type Food = {
  id: string
  storeId: string
  name: string
  price: number
  quantity: number
  popularity: number
  type: FoodType
  description: string
  createdAt: FieldValue
  updatedAt: Field
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
  ADMIN = 'Admin',
  SELLER = 'Seller',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
  OUTSIDER = 'Outsider',
}

export enum UserKYCStatus {
  APPLIED = 0,
  PENDING = 1,
  APPROVED = 2,
  DISABLED = 3,
  REJECTED = 9,
}

export enum StoreStatus {
  APPLIED = 0,
  PENDING = 1,
  APPROVED = 2,
  DISABLED = 3,
  REJECTED = 9,
}

export enum StoreStatusText {
  APPLIED = 'Applied',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  DISABLED = 'Disabled',
  UNKWON = 'Unknown',
}

export enum UserKYCStatusText {
  APPLIED = 'Applied',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  DISABLED = 'Disabled',
  UNKWON = 'Unknown',
}

// String declared
export type AuthErrorType =
  | String
  | 'No account found with this email'
  | 'Invalid password'
  | 'Invalid email address'
