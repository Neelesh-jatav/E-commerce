import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store/slices/productSlice';
import { toggleUpdateProductModal } from '../store/slices/extraSlice';

const UpdateProductModal = ({ selectedProduct }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name || '',
        description: selectedProduct.description || '',
        price: selectedProduct.price || '',
        category: selectedProduct.category || '',
        stock: selectedProduct.stock || '',
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: selectedProduct.id, data: productData }));
    dispatch(toggleUpdateProductModal());
  };

  const handleClose = () => {
    dispatch(toggleUpdateProductModal());
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-3 border rounded-md"
          />
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-3 border rounded-md"
            rows="4"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={handleClose} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
