import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import { createPost, deletePost, getPosts, logoutUser, updatePost } from "../services/api.js";

const emptyForm = { name: "", description: "", age: "" };

function Dashboard({ user, theme, onThemeChange, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeView, setActiveView] = useState("notes");
  const [sortOrder, setSortOrder] = useState("newest");
  const [favoriteIds, setFavoriteIds] = useState(() => JSON.parse(localStorage.getItem("fieldnotes_favorites") || "[]"));

  useEffect(() => {
    getPosts().then((result) => setPosts(result.posts || []))
      .catch((error) => setMessage({ type: "error", text: error.message }))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function startEdit(post) {
    setEditingId(post._id);
    setForm({ name: post.name, description: post.description, age: post.age });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function handleSubmit(event) {
    event.preventDefault(); setSaving(true); setMessage({ type: "", text: "" });
    try {
      const result = editingId ? await updatePost(editingId, { ...form, age: Number(form.age) }) : await createPost({ ...form, age: Number(form.age) });
      setPosts(editingId ? posts.map((post) => post._id === editingId ? result.post : post) : [result.post, ...posts]);
      setForm(emptyForm); setEditingId(null); setMessage({ type: "success", text: editingId ? "Note updated." : "Note added to your workspace." });
    } catch (error) { setMessage({ type: "error", text: error.message }); }
    finally { setSaving(false); }
  }
  async function handleDelete(id) {
    try { await deletePost(id); setPosts(posts.filter((post) => post._id !== id)); setMessage({ type: "success", text: "Note deleted." }); }
    catch (error) { setMessage({ type: "error", text: error.message }); }
  }
  async function handleLogout() { try { await logoutUser(user.email); } catch { /* local logout still works */ } onLogout(); }
  function cycleSort() { setSortOrder(sortOrder === "newest" ? "oldest" : sortOrder === "oldest" ? "title" : "newest"); }
  function toggleFavorite(id) {
    setFavoriteIds((current) => current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]);
  }
  useEffect(() => {
    localStorage.setItem("fieldnotes_favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);
  const visiblePosts = [...posts].sort((a, b) => {
    if (sortOrder === "title") return a.name.localeCompare(b.name);
    const first = new Date(a.createdAt || 0).getTime();
    const second = new Date(b.createdAt || 0).getTime();
    return sortOrder === "newest" ? second - first : first - second;
  });
  const viewLabel = activeView === "favorites" ? "Favorites" : "Notes";
  const viewPosts = activeView === "favorites" ? posts.filter((post) => favoriteIds.includes(post._id)) : posts;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const displayName = user.username
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="app-shell">
      <Navbar user={user} theme={theme} onThemeChange={onThemeChange} onLogout={handleLogout} activeView={activeView} onViewChange={setActiveView} />
      <main className="main-content" id="notes">
        <header className="dashboard-top">
          <div><p className="breadcrumb">Workspace <span>/</span> {viewLabel}</p><h1>{activeView === "notes" ? <>{greeting}, {displayName} <span className="wave">✦</span></> : viewLabel}</h1></div>
        </header>
        {(activeView === "notes" || activeView === "favorites") && <>
        <section className="overview-row">
          <div><p className="eyebrow">{activeView === "favorites" ? "Saved favorites" : "Your notes"}</p><h2>{activeView === "favorites" ? "Your favorite ideas, close at hand." : "Make space for good ideas."}</h2><p className="section-lede">Keep your thoughts organized, accessible, and close at hand.</p></div>
          <div className="metrics"><div><strong>{activeView === "favorites" ? viewPosts.length : posts.length}</strong><span>{activeView === "favorites" ? "Favorites" : "Total notes"}</span></div><div><strong>{posts.filter((post) => new Date(post.createdAt).toDateString() === new Date().toDateString()).length}</strong><span>Added today</span></div></div>
        </section>
        <section className="workspace-grid">
          <form className="composer" onSubmit={handleSubmit}>
            <div className="composer-heading"><span className="composer-icon">＋</span><div><h2>{editingId ? "Edit note" : "Create a note"}</h2><p>{editingId ? "Refine your thought." : "Capture something worth keeping."}</p></div></div>
            <label>Title<input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ideas for the weekend" required /></label>
            <label>Note<textarea name="description" value={form.description} onChange={handleChange} placeholder="Start writing…" rows="5" required /></label>
            <label>Reference number<input type="number" name="age" value={form.age} onChange={handleChange} placeholder="01" min="0" max="100" required /></label>
            {message.text && <p className={`form-status ${message.type}`}>{message.text}</p>}
            <div className="composer-actions">{editingId && <button type="button" className="button button-quiet" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}<button className="button button-primary" disabled={saving}>{saving ? "Saving…" : editingId ? "Save changes" : "Add note"} <span>→</span></button></div>
          </form>
          <section className="notes-area">
            <div className="section-heading"><div><h2>{activeView === "favorites" ? "Favorite notes" : "All notes"}</h2><p>{loading ? "Loading your notes…" : `${viewPosts.length} notes in this view`}</p></div><button className="filter-button" onClick={cycleSort}>{sortOrder === "newest" ? "Newest first" : sortOrder === "oldest" ? "Oldest first" : "Title A–Z"}⌄</button></div>
            {loading ? <div className="empty-state">Loading your notes…</div> : viewPosts.length === 0 ? <div className="empty-state"><span className="empty-icon">{activeView === "favorites" ? "☆" : "✦"}</span><h3>{activeView === "favorites" ? "No favorites yet." : "Your first note starts here."}</h3><p>{activeView === "favorites" ? "Tap the star on any note to save it here." : "Put a thought down and it will appear in this space."}</p></div> : <div className="notes-grid">{visiblePosts.filter((post) => viewPosts.includes(post)).map((post) => <Card key={post._id} post={post} isFavorite={favoriteIds.includes(post._id)} onToggleFavorite={toggleFavorite} onEdit={startEdit} onDelete={handleDelete} />)}</div>}
          </section>
        </section>
        </>}
      </main>
    </div>
  );
}

export default Dashboard;
