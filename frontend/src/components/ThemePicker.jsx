const themes = [
  { id: "fieldnotes", label: "Fieldnotes", swatch: "#e5a265" },
  { id: "paper", label: "Paper", swatch: "#b85c38" },
  { id: "studio", label: "Studio", swatch: "#73b8ff" },
];

function ThemePicker({ theme, onChange }) {
  return (
    <div className="theme-picker" aria-label="Choose a visual theme">
      <span className="theme-label">Theme</span>
      <div className="theme-options">
        {themes.map((option) => (
          <button
            className={`theme-option ${theme === option.id ? "active" : ""}`}
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-label={`Use ${option.label} theme`}
            aria-pressed={theme === option.id}
            title={option.label}
          >
            <span style={{ backgroundColor: option.swatch }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemePicker;
