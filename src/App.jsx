import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./utils/routes/PrivateRoute";
import PublicRoute from "./utils/routes/PublicRoute";

import Nav from "./components/Nav";
import History from "./pages/view/History";
import HistoryDetails from "./pages/view/HistoryDetails";
import Dashboard from "./pages/view/Dashboard";
import OperatorSelector from "./pages/auth/Operator";
import PageNotFound from "./pages/view/PageNotFound";

function AppContent() {
  return (
    <div className="mx-auto font-sans bg-white rounded-2xl">
      <main>
        <Routes>
          <Route element={<Nav />}>
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<OperatorSelector />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<Nav />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/:id" element={<HistoryDetails />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Toaster 
        position="top-right"
         containerStyle={{
    top: 50,
    left: 20,
    bottom: 20,
    right: 20,
  }}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
