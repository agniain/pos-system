import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT_SALES_AND_STOCK } from '../graphql/queries';
import { ADD_PRODUCT, UPDATE_PRODUCT_STOCK } from '../graphql/mutations';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const { data, loading, error, refetch } = useQuery(GET_PRODUCT_SALES_AND_STOCK, {
    variables: {
      limit: 15,
      offset: (currentPage - 1) * 15,
      search: `%${searchQuery}%`,
    },
  });

  const totalPages = data ? Math.ceil(data.products_aggregate.aggregate.count / 15) : 1;

  useEffect(() => {
    if (data) {
      const productSales = data.order_detail.reduce((acc, item) => {
        if (!acc[item.product_id]) {
          acc[item.product_id] = 0;
        }
        acc[item.product_id] += item.quantity;
        return acc;
      }, {});

      const productData = data.products.map((product) => ({
        ...product,
        quantitySold: productSales[product.id] || 0,
      }));

      setProducts(productData);
    }
  }, [data]);

  const [addProduct] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      setNewProduct({ name: '', price: '', stock: '' });
      refetch();
      alert('Product Added!');
    },
  });

  const [updateStock] = useMutation(UPDATE_PRODUCT_STOCK);

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

  const handleStockChange = (id, newStock) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, stock: newStock } : product
    );
    setProducts(updatedProducts);
  };

  const handleStockUpdate = async (id, newStock) => {
    try {
      await updateStock({ variables: { id, stock: newStock } });
      alert('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-5/6 p-4">
      <p className="my-5 text-xl text-amber-900 font-bold">Add New Products</p>
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
      <h2 className="my-5 text-2xl text-amber-900 font-bold">Product List</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Products"
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-lime-600 text-white">
            <th className="border p-2">No</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity Sold</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Update Stock</th>
          </tr>
        </thead>
        <tbody className="text-amber-900">
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border p-2 border-lime-700">{index + 1}</td>
              <td className="border p-2 border-lime-700">{product.id}</td>
              <td className="border p-2 border-lime-700">{product.name}</td>
              <td className="border p-2 border-lime-700">Rp {product.price}</td>
              <td className="border p-2 border-lime-700">{product.quantitySold}</td>
              <td className="border p-2 border-lime-700">
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleStockChange(product.id, parseInt(e.target.value, 10))}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2 border-lime-700">
                <button
                  onClick={() => handleStockUpdate(product.id, product.stock)}
                  className="bg-lime-600 text-white p-1 hover:bg-lime-500"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Products;