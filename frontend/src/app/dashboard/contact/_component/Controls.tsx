import { Filter, Search } from "lucide-react";
import React from "react";
interface ControlsProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTimeFilter: string
  setSelectedTimeFilter: (filter: string) => void
  timeFilters: string[]
}

const Controls: React.FC<ControlsProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedTimeFilter, 
  setSelectedTimeFilter, 
  timeFilters 
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Time Filter */}
      <div className="lg:w-64">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedTimeFilter}
            onChange={(e) => setSelectedTimeFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
          >
            {timeFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter === 'all' ? 'All Time' : 
                 filter === 'today' ? 'Today' :
                 filter === 'week' ? 'This Week' :
                 filter === 'month' ? 'This Month' : filter}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
)

export default Controls