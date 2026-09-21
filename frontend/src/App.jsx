import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("fieldnotes_theme") || "fieldnotes");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fieldnotes_user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("fieldnotes_user", JSON.stringify(user));
    else localStorage.removeItem("fieldnotes_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fieldnotes_theme", theme);
  }, [theme]);

  return (
    <div className="theme-shell" data-theme={theme}>
      {user ? (
        <Dashboard user={user} theme={theme} onThemeChange={setTheme} onLogout={() => setUser(null)} />
      ) : (
        <Login theme={theme} onThemeChange={setTheme} onAuthenticated={setUser} />
      )}
    </div>
  );
}

export default App;
