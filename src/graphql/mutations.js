import { gql } from '@apollo/client';


export const REGISTER_USER = gql`
  mutation RegisterUser($full_name: String!, $username: String!, $email: String!, $password: String! $role: String!) {
    insert_users(objects: { full_name: $full_name, username: $username, email: $email, password: $password role: $role}) {
      returning {
        id
        full_name
        username
        email
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: Int!, $full_name: String!, $email: String!, $username: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { full_name: $full_name, email: $email, username: $username }) {
      id
      full_name
      email
      username
      role
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String, $stock: Int, $price: numeric) {
    insert_products(objects: {name: $name, price: $price, stock: $stock}) {
      returning {
        id
        name
        price
        stock
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($stock: Int, $name: String, $price: numeric, $id: Int!) {
    update_products_by_pk(pk_columns: {id: $id}, _set: {name: $name, stock: $stock, price: $price}) {
      name
      price
      stock
      id
    }
  }
`;

export const UPDATE_PRODUCT_STOCK = gql`
  mutation UpdateProductStock($id: Int!, $stock: Int) {
    update_products_by_pk(pk_columns: {id: $id}, _set: {stock: $stock}) {
      id
      name
      stock
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProducts($id: Int!) {
    delete_products_by_pk(id: $id) {
      id
      name
      price
      stock
    }
  }
`;

export const ADD_AND_CREATE_CART = gql`
  mutation createCartAndAddProduct($product_id: Int!, $quantity: Int!) {
    insert_cart_one(object: {
      cart_products: {
        data: {
          product_id: $product_id,
          quantity: $quantity
        }
      }
    }) {
      id
      created_at
      updated_at
      cart_products {
        id
        product_id
        quantity
        added_at
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($cart_id: Int!, $product_id: Int!, $quantity: Int!) {
    insert_cart_product(objects: {cart_id: $cart_id, product_id: $product_id, quantity: $quantity}) {
      affected_rows
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($_eq: Int) {
    delete_cart_product(where: {id: {_eq: $_eq}}) {
      affected_rows
      returning {
        product_id
        id
        quantity
        product {
          name
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation updateQuantity($_eq: Int!, $quantity: Int!) {
    update_cart_product(where: {id: {_eq: $_eq}}, _inc: {quantity: $quantity}) {
      affected_rows
      returning {
        id
        cart_id
        product_id
        quantity
      }
    }
  }
`;


export const CLEAR_CART = gql`
  mutation ClearCart {
    delete_cart(where: {}) {
      affected_rows
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($user_id: uuid!) {
    insert_orders_one(object: { user_id: $user_id }) {
      id
    }
  }
`;

export const MOVE_CART_TO_ORDER_DETAIL = gql`
  mutation MoveCartToOrderDetail($items: [order_detail_insert_input!]!, $stockUpdates: [products_updates!]!) {
    insert_order_detail(objects: $items) {
      affected_rows
      returning {
        quantity
        name
        product_id
        price
      }
    }
    delete_cart(where: {}) {
      affected_rows
    }
    update_products_many(updates: $stockUpdates) {
      affected_rows
      returning {
        id
        stock
      }
    }
  }
`;

