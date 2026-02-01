import { useForm } from "react-hook-form";
import API from "../api/axios";

const CreateJobModal = ({ onClose, onSuccess }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await API.post("/jobs/create-job", data);
    onSuccess();
    onClose();
  };

  return (
    <div className="modal modal-open animate-fade-in">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">
          Add Job Application
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            className="input input-bordered w-full"
            placeholder="Company Name"
            {...register("companyName", { required: true })}
          />

          <input
            className="input input-bordered w-full"
            placeholder="Job Title"
            {...register("jobTitle", { required: true })}
          />

          <select
            className="select select-bordered w-full"
            {...register("source")}
          >
            <option>LinkedIn</option>
            <option>Naukri</option>
            <option>Referral</option>
            <option>Direct</option>
          </select>

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Notes"
            {...register("notes")}
          />

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary">
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
