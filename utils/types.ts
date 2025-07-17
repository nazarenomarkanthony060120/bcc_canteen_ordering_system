import { FieldValue, Timestamp } from 'firebase/firestore'
import { Field } from 'react-hook-form'

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  type: UserType
  email: string
  password: string
  confirmPassword: string
}

export type CreateSellerAccountRequest = {
  name: string
  email: string
  address: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

export type GetHistoriesRequest = {
  storeId: string | null
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

export type ReservationIdRequest = {
  id: string | null | undefined
  foods: (Food | null | undefined)[]
  userId: string | undefined
}

export type CancelReservationIdRequest = {
  id: string | null | undefined
}

export type AddCartRequest = {
  foodId: string
  storeOwnerId: string
  userId: string
  storeId: string
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
  image: string
  store: string
  address: string
}

export type Store = {
  id: string
  userId: string
  image: string
  store: string
  address: string
  status: StoreStatus
  storeHealth: StoreHealth
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type AddFood = {
  id: string
  name: string
  image: string
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
  address?: string
  status: UserKYCStatus
  image: string
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type Food = {
  id: string
  storeId: string
  name: string
  image: string
  price: number
  quantity: number
  popularity: number
  type: FoodType
  description: string
  createdAt: FieldValue
  updatedAt: Field
}

export type Cart = {
  id: string
  foodId: string
  userId: string
  quantity: number
  totalPrice: number
  createdAt: FieldValue
  updatedAt: FieldValue
  image?: string | null
}

export type CartAdditionItem = Cart & {
  storeOwnerId: string
  storeId: string
}

export type Reservation = {
  id: string
  items: ReservedItem[]
  totalAmount: number
  status: number
  createdAt: any
  paymentMethod: string
  pickupTime?: Date | string | null
}

export type SaveReservedOrderType = {
  userId: string
  cartItems: CartAdditionItem[]
  totalAmount: number
  paymentMethod: 'Cash' | 'GCash'
  pickupTime?: Date
}

export type ReservedItem = {
  id: string
  foodId: string
  quantity: number
  status: number
  totalPrice: number
  userId: string
  image: string
  storeId: string
  storeOwnerId: string
}

export type ReservationOrders = {
  id: string
  userId: string
  items: ReservedItem[]
  paymentMethod: string
  status: number
  totalAmount: number
  pickupTime?: Date | string | null
  createdAt: FieldValue
  updatedAt: FieldValue
}

export interface History {
  id: string
  foodId: string
  quantity: number
  reservationId: string
  storeOwnerId: string
  totalPrice: number
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
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
  CUSTORMER = 'Customer',
}

export enum ReservationStatusText {
  RESERVED = 'Reserved',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  CONFIRMED = 'Confirmed',
  UNKNOWN = 'Unknown',
}

export enum FoodReservationStatusText {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  CONFIRMED = 'Confirmed',
  UNKNOWN = 'Unknown',
}

export enum FoodReservationStatus {
  UNKNOWN = 0,
  PENDING = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  CONFIRMED = 4,
}

export enum ReservationStatus {
  RESERVED = 0,
  PENDING = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  CONFIRMED = 4,
}

export enum UserKYCStatus {
  APPLIED = 0,
  PENDING = 1,
  APPROVED = 2,
  DISABLED = 3,
  REJECTED = 9,
}

export enum StoreHealth {
  ACTIVE = 1,
  DISABLED = 0,
}

export enum StoreStatus {
  APPLIED = 0,
  PENDING = 1,
  APPROVED = 2,
  DISABLED = 3,
  REJECTED = 9,
}

export enum StoreHealthText {
  ACTIVE = 'Active',
  DISABLED = 'Disabled',
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
