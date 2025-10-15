import React, { useState } from "react";
import "./FloatingContactButton.css";
import { faPhone, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const FloatingContactButton = () => {
  const [open, setOpen] = useState(false);

  const toggle = (e) => {
    e?.stopPropagation();
    setOpen((s) => !s);
  };

  return (
    <div className={`fcb-container ${open ? "open" : ""}`} aria-hidden={false}>
      <div className="fcb-actions" role="menu" aria-hidden={!open}>
        <a
          className="fcb-item fcb-whatsapp"
          href="https://wa.me/01060044426"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          {/* modern WhatsApp glyph (inline, uses currentColor) */}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M21.7 2.3A11.9 11.9 0 0 0 12 .5 11.9 11.9 0 0 0 .5 12 11.9 11.9 0 0 0 2.3 21.7L2 24l2.3-.3A11.9 11.9 0 0 0 12 23.5 11.9 11.9 0 0 0 23.5 12 11.9 11.9 0 0 0 21.7 2.3zM17.6 15.6c-.4.9-1.9 1.8-2.6 1.9-.7.1-1.6.2-3.1-.6-1.5-.8-2.4-1.5-3.4-3.1-1-1.6-.5-2.8.3-3.7.3-.4.4-.6.6-.9.2-.3.1-.6-.1-.9-.2-.3-1.4-3.5-1.6-3.8-.2-.3-.6-.4-.9-.4-.2 0-.5 0-.8 0-.3 0-.8.1-1.1.4-.3.3-1 1-1 2.4s1 3 1.1 3.2c.1.2.2.4.3.6.1.2.1.5-.1.8-.2.3-.8 1.2-1 1.6-.3.4-.6.9-.3 1.5.3.7 1.4 2.3 3.2 3.7 2 1.6 3.6 2 4.3 2.2.7.2 1.6.1 2.2.1.7 0 1.9-.6 2.4-1.3.5-.7.5-1.3.4-1.4-.1-.1-1.1-.9-1.5-1.3z" />
          </svg>
        </a>

        <a
          className="fcb-item fcb-phone"
          href="tel:+2017485"
          aria-label="Call"
        >
          {/* modern phone glyph */}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 3.12 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.36 1.7.71 2.5a2 2 0 0 1-.24 1.06L8.6 8.6a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 1.06-.24c.8.35 1.64.59 2.5.71A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>

      <button
        className={`fcb-main ${open ? "active" : ""}`}
        onClick={toggle}
        aria-expanded={open}
        aria-label="Contact options"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle(e);
          }
        }}
      >
        {/* modern chat glyph */}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M21 6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9.5a2 2 0 0 0 2 2H7v3l3.5-3H19a2 2 0 0 0 2-2V6.5z" />
          <circle cx="8.5" cy="11.5" r="1" />
          <circle cx="12" cy="11.5" r="1" />
          <circle cx="15.5" cy="11.5" r="1" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingContactButton;
