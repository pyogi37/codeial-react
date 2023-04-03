import styles from "../styles/login.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
// import { login } from "../api";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIN, setLoggingIN] = useState(false);
  const auth = useAuth();
  console.log(auth);

  const handleChange = async (e) => {
    // console.log("button clicked");
    e.preventDefault();
    setLoggingIN(true);
    if (!email || !password) {
      toast.error("Please enter both email and password!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    const response = await auth.login(email, password);
    console.log("login response", response);
    if (response.success) {
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setLoggingIN(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleChange}>
      <span className={styles.loginSignupHeader}>Sign In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIN}>
          {loggingIN ? "Logging in...." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default Login;
