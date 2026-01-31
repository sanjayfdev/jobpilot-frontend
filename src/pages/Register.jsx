import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    async function onSubmit(e) {
        try {
            await API.post('/auth/register', e)
            console.log(e)
            navigate('/login');
        } catch (err) {
          alert(err.response.data.message);
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h2>Register</h2>
                <input type="text" placeholder="name" {...register("name",{ required: "Name is required" })} />
                {errors.name && <p>{errors.name.message}</p>}
                <input type="text" placeholder="email" {...register("email",{ required: "Email is required" })} />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="text" placeholder="password" {...register("password",{ required: "Password is required" })} />
                {errors.password && <p>{errors.password.message}</p>}
                <button type='submit'>Register</button>
            </form>
        </>
    )
}

export default Register;