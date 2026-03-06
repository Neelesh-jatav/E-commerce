import React, { useState, useEffect } from "react";
import { LoaderCircle, Plus, Trash2, Edit } from "lucide-react";
import CreateProductModal from "../modals/CreateProductModal";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import UpdateProductModal from "../modals/UpdateProductModal";
import ViewProductModal from "../modals/ViewProductModal";
import { fetchAllProducts, deleteProduct } from "../store/slices/productSlice";
import { toggleCreateProductModal, toggleUpdateProductModal, toggleViewProductModal } from "../store/slices/extraSlice";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, productId: null });

  const dispatch = useDispatch();
  const { loading, products, totalProducts } = useSelector((state) => state.product);
  const { isViewProductModalOpened, isCreateProductModalOpened, isUpdateProductModalOpened } = useSelector((state) => state.extra);

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (totalProducts !== undefined) {
      const newMax = Math.ceil(totalProducts / 10);
      setMaxPage(newMax > 0 ? newMax : 1);
    }
  }, [totalProducts]);

  useEffect(() => {
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ isOpen: true, productId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.productId) {
      dispatch(deleteProduct(deleteConfirm.productId));
      setDeleteConfirm({ isOpen: false, productId: null });
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    dispatch(toggleViewProductModal());
  };

  const handleUpdateProduct = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    dispatch(toggleUpdateProductModal());
  };

  return (
    <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full">
      <Header />
      <div className="flex-1 md:p-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <p className="text-sm text-gray-600 mb-6">Manage all your products here.</p>
      </div>
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          {loading && products.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center p-10">
              <LoaderCircle className="w-10 h-10 animate-spin" />
            </div>
          ) : products && products.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Ratings</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => handleViewProduct(product)}>
                    <td className="py-3 px-4">
                      <img
                        src={product?.images?.[0]?.url || "/default.jpg"}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-3 py-4">{product.name}</td>
                    <td className="px-3 py-4">{product.category}</td>
                    <td className="px-3 py-4">${product.price}</td>
                    <td className="px-3 py-4">{product.stock}</td>
                    <td className="px-3 py-4 text-yellow-500">{Number(product.ratings).toFixed(1)}</td>
                    <td className="px-3 py-4 flex gap-2">
                      <button
                        className="text-white rounded-md cursor-pointer px-3 py-2 font-semibold bg-blue-500 hover:bg-blue-600"
                        onClick={(e) => handleUpdateProduct(e, product)}
                      >
                        Update
                      </button>
                      <button
                        className="text-white rounded-md cursor-pointer px-3 py-2 font-semibold bg-red-500 hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(product.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="text-2xl p-6 font-bold text-center">No Products Found!</h3>
          )}
        </div>
        {/* PAGINATION */}
        {!loading && products && products.length > 0 && maxPage > 1 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {maxPage}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === maxPage}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        <button
          onClick={() => dispatch(toggleCreateProductModal())}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-20 transition-all duration-300"
          title="Create New Product"
        >
          <Plus size={20} />
        </button>
        {/* Modals */}
        {isCreateProductModalOpened && <CreateProductModal />}
        {isUpdateProductModalOpened && <UpdateProductModal selectedProduct={selectedProduct} />}
        {isViewProductModalOpened && <ViewProductModal selectedProduct={selectedProduct} />}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setDeleteConfirm({ isOpen: false, productId: null })}
        >
          <div 
            className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">This product will be deleted permanently. Are you sure?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteConfirm({ isOpen: false, productId: null })} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={confirmDelete} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Products;