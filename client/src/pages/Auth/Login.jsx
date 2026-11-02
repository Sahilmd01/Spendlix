import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import {
  LuTrendingUp,
  LuShieldCheck,
  LuSparkles,
  LuArrowRight,
  LuLock,
  LuMail,
  LuLayers,
} from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
    setError("");

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "var(--card)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        overflow: "hidden",
      }}
    >
      {/* Left Showcase Panel */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          padding: "44px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid var(--border-subtle)",
          position: "relative",
          overflowY: "auto",
        }}
      >
        <div>
          {/* Brand header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "36px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--gradient-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFF",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <LuLayers size={22} />
              </div>
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.4px",
                  }}
                >
                  Spendix
                </h1>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Subscription & Spend Platform
                </span>
              </div>
            </div>
            <span className="badge badge-info" style={{ gap: "5px" }}>
              Personal Tracker
            </span>
          </div>

          {/* Special Hero Recurring Spend Card */}
          <div
            className="card card-elevated"
            style={{ padding: "24px", marginBottom: "18px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Total Monthly Recurring Spend
              </span>
              <span className="badge badge-success">+8.5% this month</span>
            </div>
            <div
              className="heading-xl"
              style={{ fontSize: "42px", color: "var(--text-primary)", margin: 0 }}
            >
              $284.50
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "18px",
                paddingTop: "14px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  Active Subs
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginTop: "2px",
                  }}
                >
                  24 Services
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  Highest Cost
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginTop: "2px",
                  }}
                >
                  $19.99{" "}
                  <span style={{ color: "var(--success)", fontSize: "11px" }}>
                    Netflix
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Dynamic Spending Bar Preview */}
          <div className="card card-elevated" style={{ padding: "20px 24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <LuTrendingUp size={16} color="var(--primary)" />
                <span style={{ fontSize: "13px", fontWeight: 500 }}>
                  Annual Spending Trends
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                2026 Overview
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "76px",
              }}
            >
              {[45, 62, 54, 72, 60, 96, 44, 70, 52, 78, 88, 65].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: "8px",
                    background:
                      i === 5 ? "var(--gradient-blue)" : "var(--chart-secondary)",
                    boxShadow: i === 5 ? "var(--shadow-glow)" : "none",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              <span>Jan</span>
              <span style={{ color: "var(--accent)" }}>Jun (Peak: $254)</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Bottom security assurance */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "28px",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <LuShieldCheck size={18} color="var(--accent)" />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Secured
          </span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        style={{
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "520px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--primary-light)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Sign In
          </span>
          <h2
            className="heading-lg"
            style={{
              margin: "6px 0",
              fontSize: "28px",
              color: "var(--text-primary)",
            }}
          >
            Welcome back
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
            Enter your credentials to access your financial dashboard
          </p>
        </div>

        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--error-bg)",
              border: "1px solid rgba(248, 113, 113, 0.25)",
              color: "var(--error)",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-muted)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <LuMail size={16} />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="input"
                required
                style={{ paddingLeft: "42px", height: "46px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-muted)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <LuLock size={16} />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
                style={{ paddingLeft: "42px", height: "46px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              width: "100%",
              height: "46px",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "var(--radius-pill)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              opacity: isLoading ? 0.75 : 1,
            }}
          >
            {isLoading ? "Authenticating..." : (
              <>
                <span>Sign In</span>
                <LuArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "28px",
            paddingTop: "22px",
            borderTop: "1px solid var(--border-subtle)",
            textAlign: "center",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signUp"
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              marginLeft: "4px",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;