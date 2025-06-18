import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  Upload, 
  FileText, 
  Clock, 
  DollarSign, 
  Activity,
  TrendingUp,
  Eye
} from 'lucide-react';
import StatCard from '../components/StatCard';
import DocumentCard from '../components/DocumentCard';

// Mock data - in production this would come from Supabase
const mockStats = [
  {
    label: 'Documents This Month',
    value: '47',
    change: '+12% from last month',
    trend: 'up' as const,
    icon: FileText
  },
  {
    label: 'Avg. Time Saved',
    value: '2.3h',
    change: '85% reduction',
    trend: 'up' as const,
    icon: Clock
  },
  {
    label: 'Cost Savings',
    value: '$8,420',
    change: '+23% this month',
    trend: 'up' as const,
    icon: DollarSign
  },
  {
    label: 'Plan Usage',
    value: '153/200',
    change: '47 documents remaining',
    trend: 'neutral' as const,
    icon: Activity
  }
];

const mockDocuments = [
  {
    id: '1',
    name: 'Service Agreement - TechCorp',
    pages: 24,
    uploadedAt: '2 hours ago',
    status: 'completed' as const,
    riskLevel: 'medium' as const,
    clausesFound: 23
  },
  {
    id: '2',
    name: 'Employment Contract - Rodriguez',
    pages: 8,
    uploadedAt: '1 day ago',
    status: 'processing' as const,
    progress: 75
  },
  {
    id: '3',
    name: 'NDA - ClientCorp Merger',
    pages: 12,
    uploadedAt: '3 days ago',
    status: 'completed' as const,
    riskLevel: 'high' as const,
    clausesFound: 15
  }
];

export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {firstName}
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your contract analysis today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Documents */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Documents</h2>
          <Link
            to="/app/upload"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}