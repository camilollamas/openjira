import { useReducer, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

import { entriesReducer, EntriesContext } from './'
import { Entry } from '../../interfaces'
import entriesApi from "../../apis/entriesApi";


const ENTRIES_IINITIAL_STATE = {
  entries: [],
}

export const EntriesProvider =  ({children}) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_IINITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description) => {
    const { data } = await entriesApi.post('/entries', { description });
    dispatch({ type: '[Entries] - Add-Entry', payload: data })
    enqueueSnackbar('Entrada Creada',{
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      autoHideDuration: 1500,
    })
  }
  
  const updateEntry = async(entry, showSnackBar = false) => {
    try {
      const { data } = await entriesApi.put(`/entries/${entry._id}`, { description: entry.description , status: entry.status  });
      dispatch({ type: '[Entries] - Entry-Updated', payload: data })

      if(showSnackBar){
        enqueueSnackbar('Entrada Actualizada',{
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          autoHideDuration: 1500,
        })
      }

    } catch (error) {
      console.log({error});
    }
    
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get('/entries');
    dispatch({ type: '[Entries] - Refresh-data', payload: data })
  }

  const deleteEntry = async (id) => {
    try {
      await entriesApi.delete(`/entries/${id}`);
      dispatch({ type: '[Entries] - Delete-Entry', payload: id })
      enqueueSnackbar('Entrada Eliminada',{
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 1500,
      })
    } catch (error) {
      console.log({error});
    }
  }

  useEffect(() => {
    refreshEntries();
  }, [])
  
    
  return (
      <EntriesContext.Provider value={{
        ...state,
        // methods
        addNewEntry,
        updateEntry,
        deleteEntry
      }}>
        { children }
      </EntriesContext.Provider>
 )
}