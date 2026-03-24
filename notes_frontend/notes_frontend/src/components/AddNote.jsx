import { useState } from "react";

export default function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
        body: JSON.stringify({ title, description, content: description }),
      });

      const data = await res.json();
      console.log("Add note response:", data);

      if (res.ok) {
        setTitle("");
        setDescription("");
        if (onNoteAdded) {
          onNoteAdded();
        }
      }
    } catch (error) {
      console.log("Add note error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-32 rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-fit rounded-xl bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
}
