import {Navigate, Route, Routes} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import NewNote from './Components/NewNote';
import {useLocalStorage} from './hooks/useLocalStorage';

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string 
  markdown: string 
  tagIds: string[]
}

export type Note = {
  id: string 
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])
  return (
    <Container className='my-4'>      
      <Routes>
        <Route path='/' element={<h1>Hello</h1>} />
        <Route path='new' element={<NewNote />} />
        <Route path='/:id'>
          <Route index element={<h1>Single Note</h1>} />
          <Route path='edit' element={<h1>Edit</h1>}/>
        </Route>
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </Container>
  )
}

export default App
