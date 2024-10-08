import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { GET_PRODUCTS } from '../graphql/queries';
import { ADD_AND_CREATE_CART, ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY } from '../graphql/mutations';

const ProductSection = ({ refetchCart, refetchTotalCartPrice, cartData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});

  const { data: productsData } = useQuery(GET_PRODUCTS, {
    variables: { 
      limit: 9, 
      offset: (currentPage - 1) * 9,
      search: `%${searchQuery}%`,
    },
  });

  const totalPages = productsData ? Math.ceil(productsData.products_aggregate.aggregate.count / 9) : 1;

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

  const handleQuantityChange = (productId, quantity) => {
    const validQuantity = Math.max(0, parseInt(quantity, 10));
    setQuantities({
      ...quantities,
      [productId]: isNaN(validQuantity) ? 0 : validQuantity,
    });
  };

  const handleAddToCart = (product) => {
    const quantity = parseInt(quantities[product.id], 10) || 0;

    if (quantity === 0) {
      alert("Add quantity first!");
      return;
    }

    if (cartData?.cart.length) {
      const cart = cartData.cart[0];
      const cartProduct = cart.cart_products.find((item) => item.product_id === product.id);

      if (cartProduct) {
        console.log(`Updating quantity for existing product in the cart: ${product.name}`);
        updateCartItemQuantity({
          variables: {
            _eq: cartProduct.id,
            quantity,
          },
        });
      } else {
        console.log(`Adding new product to the existing cart: ${product.name}`);
        addToCart({
          variables: {
            cart_id: cart.id,
            product_id: product.id,
            quantity,
          },
        });
      }
    } else {
      console.log(`Creating new cart and adding product: ${product.name}`);
      createCartAndAddProduct({
        variables: {
          product_id: product.id,
          quantity,
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
              <p className="text-sm">Rp {product.price}</p>
              <p className="text-sm ml-auto">Stock: {product.stock}</p>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="number"
                value={quantities[product.id] || 0}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                className="border rounded-md p-2 w-1/2"
                min="0"
              />
              <button
                className="bg-amber-700 text-white text-sm ml-2 w-1/2 px-7 py-1 hover:bg-orange-500"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCartIcon />
              </button>
            </div>
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
    </div>
  );
};

export default ProductSection;