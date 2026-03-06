import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg"; // Adjust path as needed
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { getAllUsers, deleteUser } from "../store/slices/adminSlice";
import { Loader } from "lucide-react";

const Users = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, userId: null });
  const dispatch = useDispatch();
  const { loading, users, totalUsers } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (totalUsers !== undefined) {
      const newMax = Math.ceil(totalUsers / 10);
      setMaxPage(newMax > 0 ? newMax : 1);
    }
  }, [totalUsers]);

  useEffect(() => {
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ isOpen: true, userId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.userId) {
      dispatch(deleteUser(deleteConfirm.userId));
      setDeleteConfirm({ isOpen: false, userId: null });
    }
  };

  return (
    <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full">
      {/* HEADER */}
      <div className="flex-1 md:p-6">
        <Header />
        <h1 className="text-2xl font-bold">All Users</h1>
        <p className="text-sm text-gray-600 mb-6">Manage all your website's users.</p>
      </div>
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div
          className={`overflow-x-auto rounded-lg ${
            loading && (!users || users.length === 0)
              ? "p-10 shadow-none"
              : users && users.length > 0 && "shadow-lg"
          }`}
        >
          {loading && (!users || users.length === 0) ? (
            <div className="w-full h-full flex justify-center items-center">
                <Loader className="w-10 h-10 animate-spin"/>
            </div>
          ) : users && users.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Avatar</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Registered On</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <img
                        src={user.avatar?.url || avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-3 py-4">{user.name}</td>
                    <td className="px-3 py-4">{user.email}</td>
                    <td className="px-3 py-4">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-white rounded-md cursor-pointer px-3 py-2 font-semibold bg-red-500 hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="text-2xl p-6 font-bold text-center">No Users Found!</h3>
          )}
        </div>
        {/* PAGINATION */}
        {!loading && users && users.length > 0 && maxPage > 1 && (
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
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">This user will be deleted permanently. Are you sure?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteConfirm({ isOpen: false, userId: null })} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={confirmDelete} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Users;