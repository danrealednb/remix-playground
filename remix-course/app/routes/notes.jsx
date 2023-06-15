import NewNote, {links as NewNoteLinks} from '~/components/NewNote'
import { getStoredNotes, storeNotes } from '../data/notes';
import { redirect } from '@remix-run/node';


export default function NotesPage() {
  return (
    <main>
      <NewNote/>
    </main>
  );
}

export async function action({request}) {
    // extract submitted form data
   const formData = await request.formData();
//    const noteData = {
//     title: formData.get('title'),
//     content: formData.get('content')
//    }
   const noteData = Object.fromEntries(formData)
   
   // get existing stored notes
   const existingNotes = await getStoredNotes();
   // add id for note
   noteData.id = new Date().toISOString()
   // add note
   const updatedNotes = existingNotes.concat(noteData)
   // save notes
   await storeNotes(updatedNotes)
   // redirect user
    return redirect('/notes')
}

export function links() {
    return [
    ...NewNoteLinks()]
}