// Stats Card Component

import React from "react";
interface StatsCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  change: number;
  color: string;
}


const StatsCard = ({ icon: Icon, title, value, change, color }:StatsCardProps) => (
  <div className={`${color} rounded-xl p-6 text-white shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change !== 0 && (
          <p className="text-white/90 text-sm mt-1">
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
      <div className="bg-white/20 rounded-lg p-3">
        <Icon className="h-8 w-8" />
      </div>
    </div>
  </div>
);

export default  StatsCard;