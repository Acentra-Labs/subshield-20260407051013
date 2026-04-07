import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-gray-500 mb-6">Page not found</p>
        <Link
          to="/dashboard"
          className="px-5 py-2.5 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
