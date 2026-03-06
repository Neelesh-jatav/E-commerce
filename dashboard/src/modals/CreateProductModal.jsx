import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store/slices/productSlice';
import { toggleCreateProductModal } from '../store/slices/extraSlice';

const CreateProductModal = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    dispatch(createProduct(formData));
    dispatch(toggleCreateProductModal());
  };

  const handleClose = () => {
    dispatch(toggleCreateProductModal());
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
        <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full p-3 border rounded-md"
          />
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Product Description"
            required
            className="w-full p-3 border rounded-md"
            rows="4"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Category"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="number"
              name="stock"
              onChange={handleChange}
              placeholder="Stock"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              required
              className="w-full p-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={handleClose} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
