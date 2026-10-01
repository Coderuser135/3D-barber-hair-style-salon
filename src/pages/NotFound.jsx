import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';

export default function NotFound() {
  useDocumentTitle('Page Not Found');
  return (
    <PageTransition>
      <div className="px-5 pt-20 pb-10 text-center">
        <h1 className="font-display text-6xl font-bold text-gold-400 mb-2">404</h1>
        <p className="text-gray-400 mb-6">This page could not be found.</p>
        <Link to="/" className="btn-gold px-6 py-3 text-sm inline-flex items-center gap-2">
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </PageTransition>
  );
}
