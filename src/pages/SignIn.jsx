import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

 
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    
    setTimeout(() => {
     
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("✅ Signed in successfully!");
        navigate("/");
      } else {
        setErrors({ email: "Invalid email or password" });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setForm({ email: "demo@example.com", password: "demo123" });
  };

  return (
    <div className="auth-page">
      <div className="auth-container-enhanced">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <h1>Welcome Back! 👋</h1>
            <p>Sign in to continue building your professional CV and unlock all features.</p>
            <div className="auth-features">
              <div className="auth-feature-item">
                <span className="feature-icon">✨</span>
                <span>Save your CVs in the cloud</span>
              </div>
              <div className="auth-feature-item">
                <span className="feature-icon">📄</span>
                <span>Access multiple templates</span>
              </div>
              <div className="auth-feature-item">
                <span className="feature-icon">🚀</span>
                <span>Export unlimited PDFs</span>
              </div>
            </div>
          </div>
        </div>

       
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-enhanced">
              <div className="form-group-enhanced">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={errors.email ? "error" : ""}
                  />
                  <span className="input-icon">📧</span>
                </div>
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={errors.password ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn-auth-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <button
                type="button"
                className="btn-auth-demo"
                onClick={handleDemoLogin}
              >
                🎯 Try Demo Account
              </button>

              <div className="social-login">
                <button type="button" className="btn-social google">
                  <span>🔵</span> Continue with Google
                </button>
                <button type="button" className="btn-social github">
                  <span>⚫</span> Continue with GitHub
                </button>
              </div>
            </form>

            <p className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
