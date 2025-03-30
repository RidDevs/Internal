
import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface BiasMetric {
  category: string;
  score: number;
  status: 'good' | 'warning' | 'alert';
}

interface BiasDetectionProps {
  metrics: BiasMetric[];
  overallScore: number;
}

const BiasDetection = ({ metrics, overallScore }: BiasDetectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-amber-600';
      case 'alert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Bias Detection</h3>
        <Button variant="outline" size="sm" className="text-xs">View Details</Button>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Overall Fairness Score</span>
          <span className="text-sm font-bold">{overallScore}%</span>
        </div>
        <Progress value={overallScore} className={`h-2 ${getProgressColor(overallScore)}`} />
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center gap-2">
            {metric.status === 'good' ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">{metric.category}</span>
                <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.score}%
                </span>
              </div>
              <Progress value={metric.score} className={`h-1.5 mt-1 ${getProgressColor(metric.score)}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiasDetection;
