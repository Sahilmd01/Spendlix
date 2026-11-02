import React, { useRef } from "react";

const CustomLegend = ({ payload = [] }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  };

  if (!payload.length) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "10px 12px",
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-subtle)",
        marginTop: "12px",
      }}
    >
      <button
        onClick={scrollLeft}
        style={{
          position: "absolute",
          left: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "var(--surface-hover)",
          border: "none",
          borderRadius: "50%",
          width: "22px",
          height: "22px",
          color: "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          cursor: "pointer",
        }}
      >
        ◀
      </button>

      <button
        onClick={scrollRight}
        style={{
          position: "absolute",
          right: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "var(--surface-hover)",
          border: "none",
          borderRadius: "50%",
          width: "22px",
          height: "22px",
          color: "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          cursor: "pointer",
        }}
      >
        ▶
      </button>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          overflowX: "auto",
          padding: "0 18px",
          scrollbarWidth: "none",
        }}
      >
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: entry.color,
                display: "inline-block",
              }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomLegend;
