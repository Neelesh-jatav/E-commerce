import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {fetchMyOrders} from "../store/slices/orderSlice";

const statusArray = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const {myOrders} = useSelector((state) => state.order);
  const authUser = useSelector((state) => state.auth.authUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyOrders())
  }, [dispatch]);

  const filterOrders = myOrders.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter
  );

  // Icon for order status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500" />;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Color for order status
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400";
      case "Shipped":
        return "bg-blue-500/20 text-blue-400";
      case "Delivered":
        return "bg-green-500/20 text-green-400";
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (!authUser) return navigate("/products");

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your order history.
          </p>
        </div>

        {/* Status Filter */}
        <div className="glass-card p-4 mb-8">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Filter by status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusArray.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    statusFilter === status
                      ? "gradient-primary text-primary-foreground"
                      : "glass-card hover:glow-on-hover text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filterOrders.length === 0 ? (
          <div className="text-center glass-panel max-w-md mx-auto">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Orders Found
            </h2>
            <p className="text-muted-foreground">
              {statusFilter === "All"
                ? "You haven't placed any orders yet."
                : `No orders with status "${statusFilter}" found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filterOrders.map((order) => (
              <div key={order.id} className="glass-card p-6">
                {/* Order header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                  <h3 className="text-lg font-semibold from-foreground mb-1">
                    Orders #{order.id}
                  </h3>
                  <p className="text-muted-foreground">
                    Placed on{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.order_status)}
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium capitalize ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </div>
                <div className="text-right mt-4">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold text-primary">
                    ${order.total_price}
                  </p>
                </div>

                {/* Order items */}
                <div className="space-y-4 mt-6">
                  {order.order_items?.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {item.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[hsla(var(--glass-border))]">
                  <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                    Track Order
                  </button>
                  {order.order_status === "Delivered" && (
                    <>
                      <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                        Write Review
                      </button>
                      <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                        Reorder
                      </button>
                    </>
                  )}
                  {order.order_status === "Processing" && (
                    <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm text-destructive">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;