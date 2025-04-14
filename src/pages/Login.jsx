// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";


const schema = z.object({
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await login(data);
    if (!res.success) {
      setLoginError(res.message);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ width: "350px", height: "400px" }}
      >
        {loginError && <div className="alert alert-danger text-center">{loginError}</div>}
        <h2 className="text-center mb-3">Login</h2>

        <div className="mb-3">
          <input {...register("username")} placeholder="Email" className="form-control" />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>

        <div className="mb-5">
          <input {...register("password")} type="password" placeholder="Password" className="form-control" />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>

        
        <button type="submit" className="btn btn-primary w-100">Login</button>

        <div className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-decoration-underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
