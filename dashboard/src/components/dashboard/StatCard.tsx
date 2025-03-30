
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard = ({ title, value, icon, change, trend }: StatCardProps) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="stat-label">{title}</p>
          <h3 className="stat-value">{value}</h3>
          {change && (
            <p className={`text-xs font-medium mt-1 flex items-center
              ${trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}
            </p>
          )}
        </div>
        <div className="p-2 rounded-full bg-recruitment-muted text-recruitment-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
