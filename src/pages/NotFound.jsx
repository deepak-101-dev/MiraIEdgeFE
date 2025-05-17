import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Oops! Page Not Found
        </h1>

        <div className="text-gray-600 dark:text-gray-300 mb-8">
          <p className="mb-4">Okay, this is embarrassing.</p>
          <p className="mb-4">
            Looks like this page has recently been moved or deleted. That's our
            bad.
          </p>
          <p>
            If you're looking for something specific, you could try using our
            search, or heading back to the homepage. You might also want to
            update your bookmarks.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
