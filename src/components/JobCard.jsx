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

const statusColor = {
  Applied: "#3b82f6",
  "HR Round": "#f59e0b",
  "Technical Round": "#f59e0b",
  "Managerial Round": "#f59e0b",
  Offer: "#10b981",
  Rejected: "#ef4444",
  "On Hold": "#64748b",
};

const JobCard = ({ job, refresh, onEdit }) => {
  const changeStatus = async (e) => {
    await API.put(`/jobs/${job._id}`, { status: e.target.value });
    refresh();
  };

  return (
    <div
      className="
        rounded-lg p-5 shadow-sm
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
      "
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
      }}
    >
      <div className="flex justify-between items-start gap-4">
        {/* Left */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            {job.companyName}
          </h2>

          <p
            className="text-sm"
            style={{ color: "var(--muted-text)" }}
          >
            {job.jobTitle}
          </p>

          <div className="flex items-center gap-2 mt-1">
            {/* Source */}
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ color: "var(--muted-text)" }}
            >
              {job.source}
            </span>

            {/* Status badge */}
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${statusColor[job.status]}20`,
                color: statusColor[job.status],
              }}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <select
            className="
              text-sm rounded-md px-2 py-1
              border outline-none
              transition-colors duration-200
            "
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-color)",
              borderColor: "var(--muted-text)",
            }}
            value={job.status}
            onChange={changeStatus}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            className="
              text-xs px-3 py-1.5 rounded-md
              border transition-colors duration-200
            "
            style={{
              backgroundColor: "transparent",
              color: "var(--text-color)",
              borderColor: "var(--muted-text)",
            }}
            onClick={() => onEdit(job)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
