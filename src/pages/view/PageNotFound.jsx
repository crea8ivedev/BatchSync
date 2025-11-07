import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="text-center mt-16">
    <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
    <p className="mb-6">The page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-600 hover:text-blue-800">
      Return to Home
    </Link>
  </div>
);

export default PageNotFound;
