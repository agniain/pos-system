import { gql } from '@apollo/client';

export const GET_USER = gql`
  query LoginUser($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      password
      full_name
      email
      role
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $offset: Int, $search: String) {
    products_aggregate(where: {name: {_ilike: $search}}) {
      aggregate {
        count
      }
    }
    products(where: {name: {_ilike: $search}}, limit: $limit, offset: $offset) {
      id
      name
      price
      stock
    }
  }
`

export const GET_CART_ITEMS = gql`
  query getCartItems {
    cart {
      id
      cart_products {
        id
        product_id
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const GET_TOTAL_CART_PRICE = gql`
  query GetTotalPrice{
    cart_with_total_price_aggregate {
      aggregate {
        sum {
          total_cart_price
        }
      }
    }
  }
`;

export const GET_ORDER_HISTORY = gql`
  query GetOrderHistory($startDate: timestamptz!, $endDate: timestamptz!, $limit: Int!, $offset: Int!) {
    orders(
      where: { order_date: { _gte: $startDate, _lte: $endDate } }
      limit: $limit
      offset: $offset
      order_by: { order_date: desc }
    ) {
      id
      order_date
      user {
        full_name
      }
      order_details {
        product_id
        quantity
        product {
          name
          price
        }
      }
    }
    orders_aggregate(
      where: { order_date: { _gte: $startDate, _lte: $endDate } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PRODUCT_SALES_AND_STOCK = gql`
  query GetProductSalesAndStock($limit: Int, $offset: Int, $search: String) {
    products_aggregate(where: { name: { _ilike: $search } }) {
      aggregate {
        count
      }
    }
    products(where: { name: { _ilike: $search } }, limit: $limit, offset: $offset, order_by: { name: asc }) {
      id
      name
      price
      stock
    }
    order_detail {
      product_id
      quantity
    }
  }
`;

export const GET_SOLD_PRODUCTS = gql`
  query GetSoldProducts {
    order_detail {
      product_id
      product {
        name
      }
      quantity
    }
  }
`;

export const GET_All_SOLD_PRODUCTS = gql`
  query GetSoldProductsAndAllProducts($startDate: timestamptz, $endDate: timestamptz) {
    products {
      id
      name
      price
      stock
    }
    order_detail(where: {order: {order_date: {_gte: $startDate, _lte: $endDate}}}) {
      product_id
      quantity
    }
  }
`

export const GET_DAILY_INCOME = gql`
  query MyQuery ($startDate: date, $endDate: date) {
    daily_income (where: {order_date: {_gte: $startDate, _lte: $endDate}})  {
      total_income
      order_date
    }
  }
`;