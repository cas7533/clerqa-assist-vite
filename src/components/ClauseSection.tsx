import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Clause {
  id: string;
  text: string;
  page: number;
  type: string;
  confidence: number;
}

interface ClauseSectionProps {
  title: string;
  count: number;
  clauses: Clause[];
  defaultOpen?: boolean;
}

export default function ClauseSection({ title, count, clauses, defaultOpen = false }: ClauseSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
          {count}
        </span>
      </button>
      
      {isOpen && clauses.length > 0 && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {clauses.map((clause) => (
            <div key={clause.id} className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-700 mb-3">{clause.text}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Page {clause.page} • {clause.type}</span>
                <div className="flex items-center gap-2">
                  <span>Confidence: {clause.confidence}%</span>
                  <div className="w-10 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${clause.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}