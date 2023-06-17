import NewNote, { links as NewNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import { redirect, json } from "@remix-run/node";
import NoteList, { links as NoteListLinks } from "~/components/NoteList";
import { useLoaderData, useCatch } from "@remix-run/react";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

// get request reaches route
export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Count not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export async function action({ request }) {
  // extract submitted form data
  const formData = await request.formData();
  //    const noteData = {
  //     title: formData.get('title'),
  //     content: formData.get('content')
  //    }
  const noteData = Object.fromEntries(formData);

  // validation
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid Title. Must be at least 5 characters long." };
  }

  // get existing stored notes
  const existingNotes = await getStoredNotes();
  // add id for note
  noteData.id = new Date().toISOString();
  // add note
  const updatedNotes = existingNotes.concat(noteData);
  // save notes
  await storeNotes(updatedNotes);
  // Set timeout
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))
  // redirect user
  return redirect("/notes");
}

export function links() {
  return [...NewNoteLinks(), ...NoteListLinks()];
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || "Data not found";
  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function meta() {
  return {
    title: "All Notes",
    description: "Manage your notes with ease.",
  };
}
