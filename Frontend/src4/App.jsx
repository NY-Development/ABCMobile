import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer/Footer";
import ProtectedRoute from "./lib/ProtectedRoute";
import LoadingPage from "./components/LoadingPage";
import routes from "./lib/RouteConfig";

// Lazy load Admin and Owner pages
const Admin = lazy(() => import("./pages/Admin"));
const Owner = lazy(() => import("./pages/Owner"));

const App = () => {
  return (
    <>
      <Toaster position="center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-15">
          <Suspense fallback={<LoadingPage message="Loading page..." />}>
            <Routes>
              {/* Public Routes */}
              {routes.public.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}

              {/* Protected Routes */}
              {routes.protected.map(({ path, element: Element, roles }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute roles={roles}>
                      {path === "/admin" ? <Admin /> :
                       path === "/owner" ? <Owner /> :
                       <Element />}
                    </ProtectedRoute>
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;