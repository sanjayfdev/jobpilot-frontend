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

    const fetchJobs = async () => {
        const res = await API.get("/jobs");
        setJobs(res.data);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const statusMatch =
            filterStatus === "All" || job.status === filterStatus;
        const searchMatch = job.companyName
            .toLowerCase()
            .includes(search.toLowerCase());

        return statusMatch && searchMatch;
    });

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Job Applications</h1>
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
                <div className="
  stats shadow mb-6 w-full
  grid grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
">
                    <div className="stat">
                        <div className="stat-title">Total</div>
                        <div className="stat-value">{jobs.length}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Applied</div>
                        <div className="stat-value text-info">
                            {jobs.filter(j => j.status === "Applied").length}
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Offers</div>
                        <div className="stat-value text-success">
                            {jobs.filter(j => j.status === "Offer").length}
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Rejected</div>
                        <div className="stat-value text-error">
                            {jobs.filter(j => j.status === "Rejected").length}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <select
                        className="select select-bordered"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>

                    <input
                        className="input input-bordered w-full"
                        placeholder="Search company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Job Cards */}
                <div className="grid gap-4">
                    {filteredJobs.map((job) => (
                        <JobCard key={job._id} job={job} refresh={fetchJobs} />
                    ))}
                </div>

                {open && (
                    <JobModal
                        onClose={() => setOpen(false)}
                        onSuccess={fetchJobs}
                    />
                )}
            </div>
        </>
    );
};

export default Dashboard;
