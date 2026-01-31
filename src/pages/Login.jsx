import { useForm } from 'react-hook-form';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        console.log(e)
        try {
            const res = await API.post('/auth/login', e);
            console.log(res)
            login(res.data);
            navigate('/dashboard');
        } catch (err) {
             alert(err.response.data.message);
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <input placeholder='Email' {...register('email',  { required: "Email is required" })} type="text" />
                {errors.email && <p>{errors.email.message}</p>}
                <input placeholder='Password' {...register('password', { required: "Password is required" })} type="password" />
                {errors.password && <p>{errors.password.message}</p>}
                <button>Login</button>
            </form>
        </>
    )
}

export default Login