import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

export default function StatCard({ label, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
        {trend !== 'neutral' && (
          <div className={`p-1 rounded-full ${
            trend === 'up' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className={`text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 
          'text-gray-500'
        }`}>
          {change}
        </div>
      </div>
    </div>
  );
}