import React from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultToastOptions, ...options }),
  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultToastOptions, ...options }),
  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { ...defaultToastOptions, ...options }),
  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...defaultToastOptions, ...options }),
};

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

// Custom styling for the ToastContainer
const customToastStyle = {
  background: "linear-gradient(135deg, #FFFDE1, #E0FFFF)",
  borderRadius: "10px",
  color: "#333",
  padding: "10px",
  fontFamily: "Montaga",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const CustomToastContainer: React.FC = () => (
  <ToastContainer
    toastStyle={customToastStyle}
    limit={3} // Limit to 3 notifications at a time
  />
);

export { Toast, CustomToastContainer };
