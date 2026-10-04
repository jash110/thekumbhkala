"use client";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "0.85rem 1rem",
  fontSize: "0.95rem",
  background: "#fff",
};

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "grid", gap: "1.1rem", maxWidth: "520px" }}
    >
      <div>
        <label style={{ fontSize: "0.95rem", color: "var(--color-muted)", display: "block", marginBottom: "0.4rem" }}>
          Name
        </label>
        <input type="text" name="name" style={fieldStyle} />
      </div>
      <div>
        <label style={{ fontSize: "0.95rem", color: "var(--color-muted)", display: "block", marginBottom: "0.4rem" }}>
          Email
        </label>
        <input type="email" name="email" style={fieldStyle} />
      </div>
      <div>
        <label style={{ fontSize: "0.95rem", color: "var(--color-muted)", display: "block", marginBottom: "0.4rem" }}>
          Message
        </label>
        <textarea name="message" rows={5} style={{ ...fieldStyle, resize: "vertical" }} />
      </div>
      <button type="submit" className="btn btn-marigold" style={{ justifySelf: "start" }}>
        Submit
      </button>
    </form>
  );
}
