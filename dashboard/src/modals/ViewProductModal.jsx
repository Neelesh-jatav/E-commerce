import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleViewProductModal } from '../store/slices/extraSlice';

const ViewProductModal = ({ selectedProduct }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleViewProductModal());
  };

  if (!selectedProduct) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={selectedProduct.images?.[0]?.url || '/default.jpg'}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex gap-2 overflow-x-auto">
              {selectedProduct.images?.map((img, index) => (
                <img key={index} src={img.url} alt={`${selectedProduct.name} ${index}`} className="w-20 h-20 object-cover rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Category</h3>
              <p className="text-gray-600">{selectedProduct.category}</p>
            </div>
            <div className='flex gap-4'>
              <div>
                <h3 className="font-semibold">Price</h3>
                <p className="text-gray-600">${selectedProduct.price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Stock</h3>
                <p className="text-gray-600">{selectedProduct.stock} units</p>
              </div>
              <div>
                <h3 className="font-semibold">Ratings</h3>
                <p className="text-yellow-500">{Number(selectedProduct.ratings).toFixed(1)} / 5.0</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewProductModal;
