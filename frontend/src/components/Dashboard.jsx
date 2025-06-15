// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Database, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import PieChartComponent from './charts/PieChart';
import DataTable from './DataTable';
import LoadingSpinner from './LoadingSpinner';
import { fetchDashboardData } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: [],
    sectors: [],
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchDashboardData();
      setData(response);
    } catch (err) {
      setError('Failed to load dashboard data. Please check your API connection.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...data];

    if (filters.endYear) {
      filtered = filtered.filter(item => item.end_year?.toString() === filters.endYear);
    }
    if (filters.topics.length > 0) {
      filtered = filtered.filter(item => item.topic && filters.topics.includes(item.topic));
    }
    if (filters.sectors.length > 0) {
      filtered = filtered.filter(item => item.sector && filters.sectors.includes(item.sector));
    }
    if (filters.region) {
      filtered = filtered.filter(item => item.region === filters.region);
    }
    if (filters.pest) {
      filtered = filtered.filter(item => item.pestle === filters.pest);
    }
    if (filters.source) {
      filtered = filtered.filter(item => item.source === filters.source);
    }
    if (filters.swot) {
      filtered = filtered.filter(item => item.swot === filters.swot);
    }
    if (filters.country) {
      filtered = filtered.filter(item => item.country === filters.country);
    }
    if (filters.city) {
      filtered = filtered.filter(item => item.city === filters.city);
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 mb-4">
            <Database className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed lg:static z-40 inset-y-0 left-0 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto`}>
        <Sidebar
          data={data}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Showing {filteredData.length} of {data.length} records
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="lg:col-span-1 xl:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Intensity by Year</h3>
                </div>
                <BarChart data={filteredData} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <PieChart className="w-5 h-5 text-emerald-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Topics Distribution</h3>
                </div>
                <PieChartComponent data={filteredData} />
              </div>
            </div>

            <div className="lg:col-span-2 xl:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Likelihood Trend Over Years</h3>
                </div>
                <LineChart data={filteredData} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Database className="w-5 h-5 text-gray-500 mr-2" />
                Data Records
              </h3>
            </div>
            <DataTable data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
