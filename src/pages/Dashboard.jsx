import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";
import JobModal from "../components/CreateJobModal";
import Navbar from "../components/Navbar";

const STATUS_OPTIONS = [
  "All",
  "Applied",
  "HR Round",
  "Technical Round",
  "Managerial Round",
  "Offer",
  "Rejected",
  "On Hold",
];

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editJob, setEditJob] = useState(null);

  const JOBS_PER_PAGE = 6;

  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while fetching jobs",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, search]);

  const filteredJobs = jobs.filter((job) => {
    const statusMatch = filterStatus === "All" || job.status === filterStatus;
    const searchMatch = job.companyName
      .toLowerCase()
      .includes(search.toLowerCase());

    return statusMatch && searchMatch;
  });

  const paginatedJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <main className="bg-primary-bg min-h-screen pb-10">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="
  text-2xl sm:text-3xl
  font-bold tracking-tight
"
          >
            Job Applications
          </h1>
          <button
            className="
  btn btn-primary
  transition-all duration-200
  hover:scale-105
"
            onClick={() => setOpen(true)}
          >
            + Add Job
          </button>
        </div>

        {/* Stats */}
        <div
          className="
  stats shadow mb-6 w-full
  grid grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
"
        >
          <div className="stat bg-card-bg">
            <div className="stat-title text-primary-text">Total</div>
            <div className="stat-value">{jobs.length}</div>
          </div>
          <div className="stat bg-card-bg">
            <div className="stat-title text-primary-text">Applied</div>
            <div className="stat-value text-info">
              {jobs.filter((j) => j.status === "Applied").length}
            </div>
          </div>
          <div className="stat bg-card-bg">
            <div className="stat-title text-primary-text">Offers</div>
            <div className="stat-value text-success">
              {jobs.filter((j) => j.status === "Offer").length}
            </div>
          </div>
          <div className="stat bg-card-bg">
            <div className="stat-title text-primary-text">Rejected</div>
            <div className="stat-value text-error">
              {jobs.filter((j) => j.status === "Rejected").length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex bg-primary-bg flex-col sm:flex-row gap-3 mb-6">
          <select
            className="select select-bordered text-primary-text bg-primary-bg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            className="input input-bordered w-full bg-primary-bg text-primary-text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Job Cards */}
        <div className="grid gap-4">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="loader-ring" />
              <p className="text-sm text-gray-500">Fetching jobs…</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && paginatedJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-base-content/80">
                No jobs yet
              </p>
              <p className="text-sm text-base-content/60 mt-1">
                Start tracking your applications 🚀
              </p>
            </div>
          )}

          {paginatedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              refresh={fetchJobs}
              onEdit={(job) => setEditJob(job)}
            />
          ))}
        </div>

        {(open || editJob) && (
          <JobModal
            onClose={() => {
              setOpen(false);
              setEditJob(null);
            }}
            onSuccess={fetchJobs}
            jobToEdit={editJob}
          />
        )}

        {/* Pagination Controls */}
        {filteredJobs.length > JOBS_PER_PAGE && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {currentPage} of{" "}
              {Math.ceil(filteredJobs.length / JOBS_PER_PAGE)}
            </span>

            <button
              className="btn btn-sm"
              disabled={
                currentPage === Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
              }
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
