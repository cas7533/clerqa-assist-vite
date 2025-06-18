import React from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Eye, Clock } from 'lucide-react';
import RiskIndicator from '../components/RiskIndicator';
import ClauseSection from '../components/ClauseSection';
import CommentSection from '../components/CommentSection';

// Mock data - in production this would come from Supabase
const mockAnalysis = {
  id: '1',
  documentName: 'Service Agreement - TechCorp',
  pages: 24,
  analysisTime: 28,
  riskLevel: 'medium' as const,
  summary: 'Contract contains several unfavorable terms that require attention, particularly around liability limitations and termination clauses.',
  stats: {
    clausesIdentified: 23,
    mediumRiskItems: 5,
    timeSaved: 2.3
  },
  clauses: {
    high: [
      {
        id: '1',
        text: 'Client shall indemnify and hold harmless Provider from any and all claims, damages, losses, costs and expenses arising from or relating to Client\'s use of the Services...',
        page: 8,
        type: 'Indemnification Clause',
        confidence: 96
      }
    ],
    medium: [
      {
        id: '2',
        text: 'Either party may terminate this Agreement with thirty (30) days written notice for any reason or no reason...',
        page: 12,
        type: 'Termination Clause',
        confidence: 94
      },
      {
        id: '3',
        text: 'Provider\'s total liability shall not exceed the total amount paid by Client under this Agreement in the twelve months preceding the claim...',
        page: 15,
        type: 'Liability Limitation',
        confidence: 91
      }
    ],
    standard: 16
  }
};

const mockComments = [
  {
    id: '1',
    author: 'Michael Rodriguez',
    initials: 'MR',
    time: '2 hours ago',
    text: 'The indemnification clause is too broad. We should negotiate for mutual indemnification or limit to specific scenarios.'
  },
  {
    id: '2',
    author: 'Sarah Chen',
    initials: 'SC',
    time: '1 hour ago',
    text: 'Agreed. I\'ll mark this for revision in our response. The liability cap also seems low for this type of engagement.'
  }
];

export default function Analysis() {
  const { id } = useParams();
  
  // In production, fetch analysis data based on ID
  const analysis = mockAnalysis;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {analysis.documentName}
        </h1>
        <p className="text-gray-600">
          Analysis completed in {analysis.analysisTime} seconds • {analysis.pages} pages analyzed
        </p>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <RiskIndicator level={analysis.riskLevel} />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)} Risk Assessment
            </h3>
            <p className="text-gray-600 mb-4">{analysis.summary}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {analysis.stats.clausesIdentified} clauses identified
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {analysis.stats.mediumRiskItems} medium risk items
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {analysis.stats.timeSaved} hours saved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Clause Sections */}
      <div className="space-y-4 mb-8">
        <ClauseSection
          title="🚨 High Risk Clauses"
          count={analysis.clauses.high.length}
          clauses={analysis.clauses.high}
          defaultOpen={true}
        />
        
        <ClauseSection
          title="⚠️ Medium Risk Clauses"
          count={analysis.clauses.medium.length}
          clauses={analysis.clauses.medium}
        />
        
        <ClauseSection
          title="✅ Standard Clauses"
          count={analysis.clauses.standard}
          clauses={[]}
        />
      </div>

      {/* Comments */}
      <CommentSection comments={mockComments} />
    </div>
  );
}