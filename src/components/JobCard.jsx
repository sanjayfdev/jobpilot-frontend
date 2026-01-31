import API from "../api/axios";

const STATUSES = [
    "Applied",
    "HR Round",
    "Technical Round",
    "Managerial Round",
    "Offer",
    "Rejected",
    "On Hold",
];

const JobCard = ({ job, refresh }) => {
    const changeStatus = async (e) => {
        await API.put(`/jobs/${job._id}`, { status: e.target.value });
        refresh();
    };

    return (
        <div className="
card bg-base-100 shadow-md
  hover:shadow-xl
  transition-shadow duration-300
">
            <div className="card-body flex-row justify-between items-center">
                <div>
                    <h2 className="card-title">{job.companyName}</h2>
                    <p className="text-sm">{job.jobTitle}</p>
                    <span className="badge badge-outline">
                        {job.source}
                    </span>
                </div>

                <select
                    className="
  select select-sm select-bordered
  transition-colors duration-200
  focus:outline-none
"
                    value={job.status}
                    onChange={changeStatus}
                >
                    {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default JobCard;
