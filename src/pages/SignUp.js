import styles from "../styles/login.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  // console.log(navigate);
  // console.log(auth);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setSigningUp(true);
    let error = false;
    console.log(name, password, confirmPassword, email);

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter all details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error("Make sure password and confirm password matches", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }
    const response = await auth.signup(name, email, password, confirmPassword);
    console.log(response);
    if (response.success) {
      navigate("/login");
      setSigningUp(false);
      return toast.success("User created successfully, please login now", {
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

    setSigningUp(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? "Signing up...." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
