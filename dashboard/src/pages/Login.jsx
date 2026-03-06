import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

const DEMO_ADMIN_EMAIL = import.meta.env.VITE_DEMO_ADMIN_EMAIL;
const DEMO_ADMIN_PASSWORD = import.meta.env.VITE_DEMO_ADMIN_PASSWORD;
const hasDemoCredentials = Boolean(DEMO_ADMIN_EMAIL && DEMO_ADMIN_PASSWORD);

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const submitLogin = (email, password) => {
    dispatch(login({ email, password }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    submitLogin(formData.email, formData.password);
  };

  const handleDemoLogin = () => {
    if (!hasDemoCredentials) {
      return;
    }

    setFormData({ email: DEMO_ADMIN_EMAIL, password: DEMO_ADMIN_PASSWORD });
    submitLogin(DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD);
  };

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <div className="p-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-500 rounded-md"
            />
          </div>
          <div className="p-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-500 rounded-md"
            />
          </div>
          <div className="px-2 my-4 flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link
              to="/password/forgot"
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="px-2">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 bg-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <div className="px-2 mt-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full rounded-lg border border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold py-3 transition"
              disabled={loading || !hasDemoCredentials}
            >
              Login as Demo Admin
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {hasDemoCredentials
                ? `Demo: ${DEMO_ADMIN_EMAIL}`
                : "Set VITE_DEMO_ADMIN_EMAIL and VITE_DEMO_ADMIN_PASSWORD to enable demo login."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;