import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  pages: number;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'failed';
  riskLevel?: 'low' | 'medium' | 'high';
  clausesFound?: number;
  progress?: number;
}

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const getStatusBadge = () => {
    switch (document.status) {
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3" />
            Processing
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3" />
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3" />
            Failed
          </span>
        );
    }
  };

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{document.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded {document.uploadedAt} • {document.pages} pages
          </p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
        <div 
          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
          style={{ width: `${document.status === 'completed' ? 100 : document.progress || 0}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        {document.status === 'completed' && document.riskLevel && document.clausesFound ? (
          <span className={`text-sm font-medium ${getRiskColor(document.riskLevel)}`}>
            {document.riskLevel.charAt(0).toUpperCase() + document.riskLevel.slice(1)} Risk • {document.clausesFound} clauses found
          </span>
        ) : document.status === 'processing' ? (
          <span className="text-sm text-gray-500">
            Estimated completion: 30 seconds
          </span>
        ) : null}

        {document.status === 'completed' && (
          <Link
            to={`/app/analysis/${document.id}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Eye className="h-4 w-4" />
            View Analysis
          </Link>
        )}
      </div>
    </div>
  );
}