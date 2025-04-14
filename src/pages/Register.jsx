import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Register = () => {
    const { register: registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit(registerUser)} className="p-5 border rounded shadow-sm bg-light" style={{ width: '350px', minHeight: '450px' }}>
                <h2 className="text-center mb-3">Register</h2>

                {/* Username field */}
                <div className="mb-3">
                    <input
                        {...register('username')}
                        placeholder="Username"
                        className="form-control"
                    />
                    {errors.username && <div className="text-danger">{errors.username.message}</div>}
                </div>

                {/* Email field */}
                <div className="mb-3">
                    <input
                        {...register('email')}
                        placeholder="Email"
                        className="form-control"
                    />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                </div>

                {/* Password field */}
                <div className="mb-5">
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className="form-control"
                    />
                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                </div>

                {/* Sign Up Link */}
                <button type="submit" className="btn btn-primary w-100">Register</button>
                <div className="text-center mt-3">
                    <p>Have account? <Link to="/login" className="text-decoration-underline">Sign In?</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
