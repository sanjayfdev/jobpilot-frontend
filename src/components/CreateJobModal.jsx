import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const options = ["LinkedIn", "Indeed", "Company Website", "Referral", "Other"];
const CreateJobModal = ({ onClose, onSuccess, jobToEdit = null }) => {
  const { register, handleSubmit, reset } = useForm();
  const modalRef = useRef(null);

  // Open the dialog natively on mount
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  useEffect(() => {
    if (jobToEdit) {
      reset(jobToEdit);
    }
  }, [jobToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (jobToEdit) {
        // await API.put(`/jobs/${jobToEdit._id}`, data);
        await toast.promise(API.put(`/jobs/${jobToEdit._id}`, data), {
          loading: "Updating job...",
          success: "Job updated successfully!",
          error: "Failed to update job.",
        });
      } else {
        await toast.promise(API.post("/jobs/create-job", data), {
          loading: "Creating job...",
          success: "Job created successfully!",
          error: "Failed to create job.",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Submission failed", error);
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <div className="modal-box w-full max-w-md bg-card-bg text-primary-text border border-gray-700/10">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-muted-text"
            onClick={onClose}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4 text-primary-text">
          {jobToEdit ? "Edit Job" : "Add Job"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            className="input input-bordered w-full bg-card-bg text-primary-text"
            placeholder="Company Name"
            {...register("companyName", { required: true })}
          />

          <input
            className="input input-bordered w-full bg-card-bg text-primary-text"
            placeholder="Job Title"
            {...register("jobTitle", { required: true })}
          />

          <select
            className="select select-bordered w-full bg-card-bg text-primary-text"
            {...register("source")}
          >
            {options &&
              options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
          </select>

          <textarea
            className="textarea textarea-bordered w-full bg-card-bg text-primary-text"
            placeholder="Notes"
            {...register("notes")}
          />

          <div className="modal-action">
            <button
              type="button"
              className="btn bg-gray-200 text-slate-900 border-none hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary">
              {jobToEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close backdrop */}
      <form
        method="dialog"
        className="modal-backdrop bg-black/50 backdrop-blur-[2px]"
      >
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default CreateJobModal;
