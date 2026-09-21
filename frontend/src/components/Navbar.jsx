import ThemePicker from "./ThemePicker.jsx";

function Navbar({ user, theme, onThemeChange, onLogout, activeView, onViewChange }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="/" onClick={(event) => event.preventDefault()}>
        <span className="brand-mark">F</span>
        <span>fieldnotes</span>
      </a>
      <nav className="side-nav" aria-label="Primary navigation">
        <span className="nav-caption">Workspace</span>
        <a className={`nav-item ${activeView === "notes" ? "active" : ""}`} href="#notes" onClick={() => onViewChange("notes")}><span>▦</span> Notes <b>⌘1</b></a>
        <a className={`nav-item ${activeView === "favorites" ? "active" : ""}`} href="#favorites" onClick={() => onViewChange("favorites")}><span>☆</span> Favorites</a>
      </nav>
      <div className="sidebar-bottom">
        <ThemePicker theme={theme} onChange={onThemeChange} />
        <div className="profile-card">
          <span className="avatar">{user?.username?.charAt(0).toUpperCase()}</span>
          <div><strong>{user?.username}</strong><small>Personal workspace</small></div>
          <button className="profile-menu" onClick={onLogout} aria-label="Log out">↗</button>
        </div>
      </div>
    </aside>
  );
}

export default Navbar;
