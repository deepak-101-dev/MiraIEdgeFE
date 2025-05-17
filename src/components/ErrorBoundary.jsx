import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  copyErrorCode = () => {
    const errorCode = this.state.error?.message || "Unknown error";
    navigator.clipboard.writeText(errorCode).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    });
  };
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0e1217] p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#1c1f26] rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-red-600 dark:text-red-400 text-2xl"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We apologize for the inconvenience. Please share the error code
                below with our support team.
              </p>

              {/* Error Code Box */}
              <div className="bg-gray-100 dark:bg-[#2d323b] rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
                    {this.state.error?.message || "Unknown error"}
                  </code>
                  <button
                    onClick={this.copyErrorCode}
                    className="ml-2 p-2 hover:bg-gray-200 dark:hover:bg-[#3d424b] rounded-full transition-colors"
                    title="Copy error code"
                  >
                    <FontAwesomeIcon
                      icon={this.state.copied ? faCheck : faCopy}
                      className={`text-sm ${
                        this.state.copied
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
              {/* Reset Button */}
              <button
                onClick={this.resetError}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Reset and Try Again
              </button>

              {/* Support Contact */}
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Contact our support team at{" "}
                <a
                  href="mailto:support@admindash.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  support@admindash.com
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
