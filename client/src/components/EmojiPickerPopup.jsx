import React, { useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { LuImage, LuX, LuSmilePlus } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      {/* Pick Icon Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 14px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-default)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--surface-hover)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            color: "var(--primary-light)",
          }}
        >
          {icon ? (
            <img
              src={icon}
              alt="Icon"
              style={{ width: "26px", height: "26px", objectFit: "contain" }}
            />
          ) : (
            <LuSmilePlus size={22} />
          )}
        </div>

        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {icon ? "Change Category Icon" : "Select Category Icon"}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            {icon ? "Click to pick a different emoji" : "Optional · Helps identify in lists"}
          </div>
        </div>
      </div>

      {/* Popover Emoji Picker */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 100,
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
            borderRadius: "var(--radius-card)",
            overflow: "hidden",
            border: "1px solid var(--border-default)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 14px",
              backgroundColor: "var(--card-elevated)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)" }}>
              Pick an Icon
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LuX size={16} />
            </button>
          </div>

          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={handleEmojiSelect}
            width={340}
            height={380}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
