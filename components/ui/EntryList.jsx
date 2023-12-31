import { useContext, useMemo } from "react"
import { Paper, List } from '@mui/material'
import { EntryCard } from './'

import { EntriesContext } from '../../context/entries'
import { UIContext } from "../../context/ui"

import styles from './EntryList.module.css'


export const EntryList = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [ entries ])

  const onDropEntry = (e) => {
    const id = e.dataTransfer.getData('text/plain')

    const entry = entries.find(entry => entry._id === id);
    entry.status = status;
    updateEntry( entry );
    endDragging()

  }
  const allowDrop = (e) => {
    e.preventDefault();
    
  }

  return (
    //Drop to do
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
      <Paper sx={{height:'calc(100vh - 180px)', overflowY: 'hidden', overflowX: 'hidden' , backgroundColor: 'transparent', padding: '3px 5px' }} >
        

        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={ entry._id } entry={ entry }/>
            ))
          }
          {/* <EntryCard/> */}
        </List>  
      </Paper>
    </div>
  )
}
