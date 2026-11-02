import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import {
  LuUser,
  LuMail,
  LuLock,
  LuArrowRight,
  LuShieldCheck,
  LuCreditCard,
} from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";
import AppLogo from "../../components/AppLogo";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
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
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
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
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="auth-page-wrapper"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "var(--card)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}
    >
      {/* Left Showcase Panel */}
      <div
        className="auth-showcase-panel"
        style={{
          backgroundColor: "var(--surface)",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid var(--border-subtle)",
          position: "relative",
          overflowY: "auto",
        }}
      >
        <div>
          {/* Brand Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <AppLogo size={38} />
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
                  Spendlix
                </h1>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Subscription & Spend Platform
                </span>
              </div>
            </div>
            <span className="badge badge-success">Instant Access</span>
          </div>

          {/* Subscription Feature Highlight Panel */}
          <div
            style={{
              padding: "22px 24px",
              marginBottom: "18px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFF",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                S
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>
                  Smart Subscription Management
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Never miss an auto-renewal or fee spike
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: "12px 0 4px",
                letterSpacing: "-0.3px",
              }}
            >
              Automatic Spending Insights
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Manage recurring bills and expenses seamlessly in real time
            </div>
          </div>

          {/* Transaction Activity Stream */}
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500 }}>
                Live Stream Preview
              </span>
              <span className="badge badge-info" style={{ fontSize: "10px" }}>
                Realtime
              </span>
            </div>

            <div className="transaction-item" style={{ padding: "9px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#E50914",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFF",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  N
                </div>
                <div>
                  <div className="transaction-name" style={{ fontSize: "13px" }}>
                    Netflix Monthly
                  </div>
                  <div className="transaction-meta" style={{ fontSize: "11px" }}>
                    Paid · Account Balance
                  </div>
                </div>
              </div>
              <div
                className="amount-negative"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                -$19.99
              </div>
            </div>

            <div className="transaction-item" style={{ padding: "9px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFF",
                  }}
                >
                  <LuCreditCard size={14} />
                </div>
                <div>
                  <div className="transaction-name" style={{ fontSize: "13px" }}>
                    Wallet Top Up
                  </div>
                  <div className="transaction-meta" style={{ fontSize: "11px" }}>
                    Received · Visa ••••494
                  </div>
                </div>
              </div>
              <div
                className="amount-positive"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                +$30.00
              </div>
            </div>
          </div>
        </div>

        {/* Security Reassurance */}
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
            Bank-grade 256-bit AES encryption & SOC-2 compliance
          </span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        className="auth-form-panel"
        style={{
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "480px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Mobile-only Top Brand Header */}
        <div className="auth-mobile-header" style={{ display: "none", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <AppLogo size={34} />
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>
              Spendlix
            </h1>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Smart Expense Tracker
            </span>
          </div>
        </div>

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
            Get Started
          </span>
          <h2
            className="heading-lg"
            style={{
              margin: "6px 0",
              fontSize: "28px",
              color: "var(--text-primary)",
            }}
          >
            Create your account
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
            Start tracking subscriptions and optimize monthly recurring spend
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

        <form onSubmit={handleSignUp}>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="fullName"
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
              Full Name
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
                <LuUser size={16} />
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sahil Doe"
                className="input"
                required
                style={{ paddingLeft: "42px", height: "46px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
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

          <div style={{ marginBottom: "26px" }}>
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
                placeholder="Create strong password"
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
            {isLoading ? "Creating account..." : (
              <>
                <span>Create Account</span>
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              marginLeft: "4px",
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;