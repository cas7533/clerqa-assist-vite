import React from 'react';

interface RiskIndicatorProps {
  level: 'low' | 'medium' | 'high';
  size?: 'sm' | 'lg';
}

export default function RiskIndicator({ level, size = 'lg' }: RiskIndicatorProps) {
  const getColors = () => {
    switch (level) {
      case 'low':
        return 'bg-green-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'high':
        return 'bg-red-500 text-white';
    }
  };

  const getSize = () => {
    return size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-12 h-12 text-lg';
  };

  return (
    <div className={`${getColors()} ${getSize()} rounded-full flex items-center justify-center font-bold`}>
      {level.charAt(0).toUpperCase()}
    </div>
  );
}