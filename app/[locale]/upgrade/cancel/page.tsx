import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Cancel Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          No worries! Your payment was cancelled and no charges were made to your account.
        </p>

        {/* Reasons to upgrade */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">
            Still considering Pro?
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 30-day money-back guarantee</li>
            <li>• Cancel anytime, no questions asked</li>
            <li>• Unlock advanced features immediately</li>
            <li>• Priority customer support</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/upgrade"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Have questions about Pro features?{" "}
            <a
              href="mailto:support@yourbakery.com"
              className="text-blue-600 hover:text-blue-700"
            >
              Contact Support
            </a>
          </p>
        </div>

        {/* Alternative Options */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">
            Or explore other options:
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link
              href="/demo"
              className="text-blue-600 hover:text-blue-700"
            >
              Watch Demo
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/features"
              className="text-blue-600 hover:text-blue-700"
            >
              View Features
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-700"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
