
import React from 'react';
import { LightbulbIcon } from 'lucide-react';

interface Insight {
  id: string;
  text: string;
  category: 'opportunity' | 'warning' | 'tip';
}

interface AIInsightsProps {
  insights: Insight[];
}

const AIInsights = ({ insights }: AIInsightsProps) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'opportunity': return 'bg-green-50 text-green-700 border-green-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'tip': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="dashboard-card">
      <div className="flex items-center gap-2 mb-4">
        <LightbulbIcon className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold">AI Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => (
          <div 
            key={insight.id} 
            className={`p-3 rounded-md border ${getCategoryStyles(insight.category)}`}
          >
            <p className="text-sm">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
