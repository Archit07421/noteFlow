import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "../components/AddNote";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [activeSection, setActiveSection] = useState("add");

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/notes", {
        headers: {
          "auth-token": token || "",
        },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setNotes(data);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.log("Fetch notes error:", error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleDeleteNote = async (id) => {
    if (editingId === id) {
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    }
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token || "",
        },
      });
      if (res.ok) {
        await fetchNotes();
      } else {
        const err = await res.json().catch(() => ({}));
        console.log("Delete note failed:", err);
      }
    } catch (error) {
      console.log("Delete note error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title || "");
    setEditDescription(note.description || note.content || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveNote = async (id) => {
    setSavingId(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });
      if (res.ok) {
        cancelEdit();
        await fetchNotes();
      } else {
        const err = await res.json().catch(() => ({}));
        console.log("Update note failed:", err);
      }
    } catch (error) {
      console.log("Update note error:", error);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <header className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">NoteFlow</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Logout
          </button>
        </header>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <aside className="rounded-2xl border border-zinc-200 p-3 lg:col-span-3 lg:min-h-[520px]">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              <button
                type="button"
                onClick={() => setActiveSection("my-notes")}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  activeSection === "my-notes"
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                My Notes
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("add")}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  activeSection === "add"
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                Add Note
              </button>
            </div>
          </aside>

          <section className="rounded-2xl border border-zinc-200 p-4 sm:p-5 lg:col-span-9">
            {activeSection === "add" ? (
              <>
                <h2 className="text-lg font-semibold text-zinc-900">Create Note</h2>
                <p className="mt-1 text-sm text-zinc-600">Write down your idea and save it to your space.</p>
                <div className="mt-4 max-w-2xl">
                  <AddNote onNoteAdded={fetchNotes} />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-zinc-900">My Notes</h2>
                  <button
                    type="button"
                    onClick={fetchNotes}
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    Refresh
                  </button>
                </div>

                {isLoading ? <p className="mt-4 text-sm text-zinc-500">Loading notes...</p> : null}

                {!isLoading && notes.length === 0 ? (
                  <p className="mt-4 text-sm text-zinc-500">No notes yet. Switch to Add Note to create one.</p>
                ) : null}

                {!isLoading && notes.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {notes.map((note) => (
                      <article
                        key={note._id}
                        className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          {editingId === note._id ? (
                            <div className="grid gap-2">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                                className="h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
                              />
                              <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Description"
                                rows={4}
                                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                              />
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSaveNote(note._id)}
                                  disabled={savingId === note._id}
                                  className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {savingId === note._id ? "Saving…" : "Save"}
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  disabled={savingId === note._id}
                                  className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-sm font-semibold text-zinc-900">{note.title || "Untitled Note"}</h3>
                              <p className="mt-1 text-sm text-zinc-600">
                                {note.content || note.description || "No description."}
                              </p>
                            </>
                          )}
                        </div>
                        {editingId !== note._id ? (
                          <div className="flex shrink-0 flex-wrap gap-2 self-start">
                            <button
                              type="button"
                              onClick={() => startEdit(note)}
                              disabled={deletingId === note._id || editingId !== null}
                              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteNote(note._id)}
                              disabled={deletingId === note._id}
                              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-red-200 hover:bg-red-50 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingId === note._id ? "Deleting…" : "Delete"}
                            </button>
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notes

