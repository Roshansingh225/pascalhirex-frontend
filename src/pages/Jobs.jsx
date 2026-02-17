import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    jobType: searchParams.get('jobType') || '',
    experience: searchParams.get('experience') || '',
    salary: searchParams.get('salary') || '',
  });

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(searchParams);
      const response = await jobsAPI.getAllJobs(params);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      experience: '',
      salary: '',
    });
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Jobs</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search jobs..."
            value={filters.search}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
          <select
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Experience</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5-10">5-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>
          <select
            name="salary"
            value={filters.salary}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Salary Range</option>
            <option value="0-30000">0-30k</option>
            <option value="30000-50000">30k-50k</option>
            <option value="50000-80000">50k-80k</option>
            <option value="80000-100000">80k-100k</option>
            <option value="100000+">100k+</option>
          </select>
        </div>
        <button
          onClick={clearFilters}
          className="mt-4 text-primary hover:underline"
        >
          Clear Filters
        </button>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;

