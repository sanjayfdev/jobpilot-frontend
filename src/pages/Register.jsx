import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import coverImage from "../assets/register_cover.jpg"; // use same image as login
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await API.post("/auth/register", data);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main
      className="
        min-h-screen flex items-center justify-center
        bg-cover bg-center bg-no-repeat p-4
      "
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div
        className="
          p-8 rounded-lg shadow-lg
          w-full max-w-md
          backdrop-blur-sm
          transition-colors duration-300
        "
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-center font-bold mb-4">Register</h2>

          {/* Name */}
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="
              w-full px-3 py-2 rounded-md
              border outline-none
              bg-card-bg
            "
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="
              w-full px-3 py-2 rounded-md
              border outline-none
              bg-card-bg"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
            className="
              w-full px-3 py-2 rounded-md
              border outline-none
                bg-card-bg
            "
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-2 rounded-md
              font-semibold
              transition-colors duration-200
            "
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm dark:text-white light:text-slate-900">
            Already have an account?{" "}
            <a href="/login" className="hover:underline text-blue-950">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
