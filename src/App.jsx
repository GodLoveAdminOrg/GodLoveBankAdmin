import './App.css'
import AppRoutes from "./routes/AppRoutes.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App
