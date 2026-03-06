import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  fetchAllOrders,
  updateOrderStatus,
} from "../store/slices/orderSlice";
import Header from "./Header";
import { Loader, Trash2 } from "lucide-react";

const statusArray = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const [filterByStaus, setFilterByStaus] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const confirmDelete = () => {
    dispatch(deleteOrder(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  const filteredOrders =
    filterByStaus === "All"
      ? orders
      : orders?.filter((order) => order.order_status === filterByStaus);

  if (loading && !orders.length)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="w-10 h-10 animate-spin"/>
      </div>
    );

  return (
    <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full">
      <Header />
      <div className="flex-1 md:p-6">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <p className="text-sm text-gray-600 mb-6">Manage all your orders.</p>
      </div>
      <div className="flex justify-between items-center p-6">
        <select
          className="p-2 border rounded shadow-sm bg-white"
          value={filterByStaus}
          onChange={(e) => setFilterByStaus(e.target.value)}
        >
          {statusArray.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="px-6">
        {filteredOrders.length === 0 ? (
          <p className="p-10 text-center">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Order Details */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-lg mb-2 border-b pb-2">Order Details</h4>
                  <p><strong>Order ID:</strong> {order.id.substring(0,8)}</p>
                  <p><strong>Status:</strong> {order.order_status}</p>
                  <p><strong>Placed At:</strong> {new Date(order.created_at).toLocaleString()}</p>
                </div>

                {/* Shipping Info */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-lg mb-2 border-b pb-2">Shipping Info</h4>
                  <p><strong>Name:</strong> {order.shipping_info?.full_name}</p>
                  <p><strong>Phone:</strong> {order.shipping_info?.phone}</p>
                  <p><strong>Address:</strong> {order.shipping_info?.address}, {order.shipping_info?.city}, {order.shipping_info?.state}, {order.shipping_info?.country} - {order.shipping_info?.pincode}</p>
                </div>

                {/* Ordered Items */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-lg mb-2 border-b pb-2">Ordered Items</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {Array.isArray(order.order_items) &&
                      order.order_items.map((item) => (
                        <div key={item.order_item_id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded cursor-pointer"
                            onClick={() => setPreviewImage(item.image)}
                          />
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
                            <p className="text-sm">Qty: {item.quantity} | Price: ${item.price} </p>
                                              <p><strong>Total Amount:</strong> ${order.total_price}</p>

                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t">
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border p-2 rounded bg-gray-50"
                >
                  {statusArray.filter(val => val !== "All").map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={() => setDeleteConfirm({ open: true, id: order.id })}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded shadow-xl"
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-6">This will permanently delete the order.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Orders;