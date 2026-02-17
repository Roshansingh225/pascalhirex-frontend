import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobsAPI.getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      setDeleting(id);
      await jobsAPI.deleteJob(id);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/add-job"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Job
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-4">No jobs posted yet.</p>
          <Link
            to="/admin/add-job"
            className="text-primary hover:underline"
          >
            Post your first job
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-6 py-4 text-left">Job Title</th>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Job Type</th>
                <th className="px-6 py-4 text-left">Applications</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4">{job.title}</td>
                  <td className="px-6 py-4">{job.company}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.jobType}</td>
                  <td className="px-6 py-4">{job.applicants?.length || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/edit-job/${job._id}`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        disabled={deleting === job._id}
                        className="text-red-600 hover:underline disabled:text-gray-400"
                      >
                        {deleting === job._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

