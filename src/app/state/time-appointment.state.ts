export enum AppointmentActionTypes {
  GET_ALL_PRODUCTS = "[Product] Get All Products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available Products",
  SEARCH_PRODUCTS = "[Product] Search Products",
  NEW_PRODUCT = "[Product] New Product",
  SELECT_PRODUCT = "[Product] Select Product",
  EDIT_PRODUCT = "[Product] Edit Product",
  DELETE_PRODUCT = "[Product] Delete Product",
  PRODUCT_ADDED = "[Product] Product added",
  PRODUCT_UPDATED = "[Product] Product updated",
}

export interface ActionEvent {
  type:AppointmentActionTypes,
  payload?:any
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}
