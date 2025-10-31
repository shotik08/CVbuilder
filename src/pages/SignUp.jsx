import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css/"

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    setPasswordStrength(Math.min(strength, 100));
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 30) return { label: "Weak", color: "#ff4444" };
    if (passwordStrength < 60) return { label: "Fair", color: "#ffa500" };
    if (passwordStrength < 80) return { label: "Good", color: "#2196F3" };
    return { label: "Strong", color: "#4caf50" };
  };

  const validateForm = () => {
    const newErrors = {};

    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    
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

    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

   
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
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
      
      
      if (users.some((u) => u.email === form.email)) {
        setErrors({ email: "Email already exists" });
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        password: form.password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("✅ Account created successfully!");
      navigate("/signin");
      setIsLoading(false);
    }, 1000);
  };

  const strengthInfo = getPasswordStrengthLabel();

  return (
    <div className="auth-page">
      <div className="auth-container-enhanced">
        <div className="auth-branding">
          <div className="auth-branding-content">
            <h1>Join Us Today! 🚀</h1>
            <p>Create your account and start building professional CVs in minutes.</p>
            <div className="auth-features">
              <div className="auth-feature-item">
                <span className="feature-icon">⚡</span>
                <span>Quick 2-minute setup</span>
              </div>
              <div className="auth-feature-item">
                <span className="feature-icon">🎨</span>
                <span>Beautiful templates included</span>
              </div>
              <div className="auth-feature-item">
                <span className="feature-icon">🔒</span>
                <span>100% secure and private</span>
              </div>
              <div className="auth-feature-item">
                <span className="feature-icon">💎</span>
                <span>Free forever, no credit card</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-enhanced">
              <div className="form-group-enhanced">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? "error" : ""}
                  />
                  <span className="input-icon">👤</span>
                </div>
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

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
                    placeholder="Create a strong password"
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
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${passwordStrength}%`,
                          backgroundColor: strengthInfo.color,
                        }}
                      ></div>
                    </div>
                    <span
                      className="strength-label"
                      style={{ color: strengthInfo.color }}
                    >
                      {strengthInfo.label}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="terms-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms" className="terms-link">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="terms-link">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <span className="error-message">{errors.terms}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn-auth-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <div className="social-login">
                <button type="button" className="btn-social google">
                  <span>🔵</span> Sign up with Google
                </button>
                <button type="button" className="btn-social github">
                  <span>⚫</span> Sign up with GitHub
                </button>
              </div>
            </form>

            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/signin" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
