import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useUsers } from "../context/UsersContext";

const Reports = () => {
  const { users } = useUsers();

  // Calculate user statistics
  const userStats = useMemo(() => {
    if (!users.length) return null;

    // Gender distribution
    const genderCount = users.reduce((acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});

    // Age distribution (grouped by decades)
    const ageGroups = users.reduce((acc, user) => {
      const age = user.dob.age;
      const decade = Math.floor(age / 10) * 10;
      const range = `${decade}-${decade + 9}`;
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});

    // Country distribution
    const countryCount = users.reduce((acc, user) => {
      acc[user.location.country] = (acc[user.location.country] || 0) + 1;
      return acc;
    }, {});

    // Average age by country
    const countryAgeSum = users.reduce((acc, user) => {
      const country = user.location.country;
      if (!acc[country]) {
        acc[country] = { sum: 0, count: 0 };
      }
      acc[country].sum += user.dob.age;
      acc[country].count += 1;
      return acc;
    }, {});

    const avgAgeByCountry = Object.entries(countryAgeSum).reduce(
      (acc, [country, { sum, count }]) => {
        acc[country] = Math.round((sum / count) * 10) / 10;
        return acc;
      },
      {}
    );

    // Get top 3 countries
    const topCountries = Object.entries(countryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([country]) => country);

    return {
      totalUsers: users.length,
      genderDistribution: genderCount,
      ageDistribution: ageGroups,
      countryDistribution: countryCount,
      avgAgeByCountry,
      topCountries,
    };
  }, [users]);

  if (!userStats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Format data for Recharts
  const genderData = Object.entries(userStats.genderDistribution).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const ageData = Object.entries(userStats.ageDistribution)
    .sort(([a], [b]) => {
      const [aStart] = a.split("-").map(Number);
      const [bStart] = b.split("-").map(Number);
      return aStart - bStart;
    })
    .map(([name, value]) => ({ name, value }));

  const countryData = userStats.topCountries.map((country) => ({
    name: country,
    value: userStats.countryDistribution[country],
  }));

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          User Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Total Users: {userStats.totalUsers}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution (Pie Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Gender Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Distribution (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Age Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Number of Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Countries (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Top 3 Countries
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="Number of Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Age by Country (List) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Average Age by Country
          </h2>
          <div className="space-y-4">
            {userStats.topCountries.map((country) => (
              <div
                key={country}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-800 dark:text-white">{country}</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {userStats.avgAgeByCountry[country]} years
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
