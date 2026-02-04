import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import coverImage from "../assets/login.jpg"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      const res = await toast.promise(API.post(`/auth/login/`, e), {
        loading: "Login...",
        success: "Welcome Back!",
        error: (err) => err?.response?.data?.message || "Failed to login",
      });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <main
      className="bg-primary-bg min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 backdrop-blur-sm">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-center dark:text-black light:text-white font-bold mb-4">
            Login
          </h2>
          <input
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            type="text"
            className="input input-bordered w-full bg-card-bg text-primary-text mb-2"
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
          <input
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            type="password"
            className="input input-bordered w-full bg-card-bg text-primary-text mb-2"
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
          <button className="btn text-primary-text btn-primary w-full">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-900 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
