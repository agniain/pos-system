import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { GET_PRODUCTS } from '../graphql/queries';
import { ADD_PRODUCT, ADD_AND_CREATE_CART, ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY } from '../graphql/mutations';

const ProductSection = ({ refetchCart, refetchTotalCartPrice, cartData }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: productsData, refetch } = useQuery(GET_PRODUCTS, {
    variables: { limit: 9, offset: (currentPage - 1) * 9 },
  });

  const totalPages = productsData ? Math.ceil(productsData.products_aggregate.aggregate.count / 9) : 1;

  const [addProduct] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      setNewProduct({ name: '', price: '', stock: '' });
      refetch();
    },
  });

  const [createCartAndAddProduct] = useMutation(ADD_AND_CREATE_CART, {
    onCompleted: () => {
      refetchCart();
      refetchTotalCartPrice();
      console.log('Cart created and product added');
    },
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted: () => {
      refetchCart();
      refetchTotalCartPrice();
      console.log('Product added to cart');
    },
  });

  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY, {
    onCompleted: () => {
      refetchCart();
      refetchTotalCartPrice();
      console.log('Product quantity updated');
    },
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      variables: {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
      },
    });
  };

  const handleAddToCart = (product) => {
    if (cartData?.cart.length) {
      const cart = cartData.cart[0];
      const cartProduct = cart.cart_products.find((item) => item.product_id === product.id);

      if (cartProduct) {
        console.log(`Updating quantity for existing product in the cart: ${product.name}`);
        updateCartItemQuantity({
          variables: {
            _eq: cartProduct.id,
            quantity: 1,
          },
        });
      } else {
        console.log(`Adding new product to the existing cart: ${product.name}`);
        addToCart({
          variables: {
            cart_id: cart.id,
            product_id: product.id,
            quantity: 1,
          },
        });
      }
    } else {
      console.log(`Creating new cart and adding product: ${product.name}`);
      createCartAndAddProduct({
        variables: {
          product_id: product.id,
          quantity: 1,
        },
      });
    }
  };

  const filteredProducts = productsData?.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-3/6 p-4">
      <h2 className="text-2xl mb-4 font-bold text-amber-900">Products</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Products"
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-3 gap-3">
        {filteredProducts?.map((product) => (
          <div key={product.id} className="border border-lime-500 p-1 text-amber-900">
            <img
              src={`/images/bread.jpg`}
              alt={product.name}
              className="mb-2"
            />
            <h3 className="font-semibold text-center">{product.name}</h3>
            <div className="flex">
              <p className="text-sm ">Rp {product.price}</p>
              <p className="text-sm ml-auto">Stock: {product.stock}</p>
            </div>
            <button
              className="bg-amber-700 text-white text-sm mt-2 w-full px-7 py-1 hover:bg-orange-500"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCartIcon />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-5 mb-10 py-5">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-white border border-lime-500 text-lime-700 p-2 hover:bg-lime-400"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-white border border-lime-500 text-lime-700 p-2 hover:bg-lime-400"
        >
          Next
        </button>
      </div>
      <p className="mt-10 mb-7 border-t pt-5 text-xl text-amber-900 font-bold">Add New Products Here</p>
      <form onSubmit={handleAddProduct} className="mb-6 grid grid-cols-4">
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Name"
          className="border p-1 mr-1"
          required
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Price"
          className="border p-1 mr-1"
          required
        />
        <input
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          placeholder="Stock"
          className="border p-1 mr-1"
          required
        />
        <button type="submit" className="bg-amber-700 text-sm text-white p-2 hover:bg-orange-600">Add Product</button>
      </form>
    </div>
  );
};

export default ProductSection;