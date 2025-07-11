import React from "react";
import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change?: number;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  color,
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {change !== undefined && (
          <p
            className={`text-sm mt-2 flex items-center ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            {change > 0 ? "+" : ""}
            {change}% from last month
          </p>
        )}
      </div>
      <div
        className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatsCard;
