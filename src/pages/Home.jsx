import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';

const Home = () => {
  const [search, setSearch] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await jobsAPI.getAllJobs();
      setFeaturedJobs(response.data.slice(0, 6)); // Get first 6 jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${search}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dark via-dark to-primary/20 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Find Your Dream Job with <span className="text-primary">PascalHireX</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Connect with top companies and discover opportunities that match your skills and aspirations.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-fade-in-up delay-200">
            <div className="flex gap-4 bg-white/10 backdrop-blur-md p-2 rounded-xl">
              <input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
              <button
                type="submit"
                className="bg-primary px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition hover:scale-105 duration-200"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">Latest Job Opportunities</h2>
            <p className="text-gray-600 text-lg">Explore our most recent job listings from top companies</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <div 
                  key={job._id} 
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {job.experience} Experience
                    </div>
                  </div>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="block w-full text-center bg-gradient-to-r from-primary to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs available at the moment.</p>
              <Link to="/jobs" className="text-primary hover:underline mt-2 inline-block">Browse all jobs</Link>
            </div>
          )}

          {featuredJobs.length > 0 && (
            <div className="text-center mt-10">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 bg-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition hover:scale-105 duration-200"
              >
                View All Jobs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PascalHireX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-light p-8 rounded-xl text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Job Search</h3>
              <p className="text-gray-600">Find jobs that match your skills with our powerful search and filter options.</p>
            </div>

            <div className="bg-light p-8 rounded-xl text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Companies</h3>
              <p className="text-gray-600">All companies are verified to ensure a safe job search experience.</p>
            </div>

            <div className="bg-light p-8 rounded-xl text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600">Find opportunities that help you grow professionally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-secondary to-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of job seekers who found their dream jobs.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition hover:scale-105 duration-200"
            >
              Sign Up Now
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-dark transition hover:scale-105 duration-200"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

