import {useMemo} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import NewNote from './Components/NewNote';
import {useLocalStorage} from './hooks/useLocalStorage';
import {v4 as uuidv4} from 'uuid'

export type Note = {
  id: string 
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string 
  markdown: string 
  tagIds: string[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', ([] as RawNote[]))
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', ([] as Tag[])); 
  
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [tags, notes]); 
  
  const onCreateNote = ({tags, ...data}: NoteData): void => {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidv4(), tagIds: tags.map(tag => tag.id)}]
    })
  }
  
  const addTag = (tag: Tag): void => {
    setTags(prev => [...prev, tag])
  }
  
  return (
    <Container className='my-4'>      
      <Routes>
        <Route path='/' element={<h1>Hello</h1>} />
        <Route
          path='new'
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />}
        />
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
