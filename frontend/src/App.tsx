import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayouts from "./layouts/AdminLayouts";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductPage from "./pages/admin/ProductPage";
import Categories from "./pages/admin/CategoriesPage";
import CategoriesPage from "./pages/admin/CategoriesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Page - Tanpa Sidebar */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Page - Pakai Sidebar */}
        <Route path="/admin" element={<AdminLayouts />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}