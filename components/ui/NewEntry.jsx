import { useState, useContext } from 'react'

import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  // const [isAdding, setIsAdding] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (e) => {
    setInputValue(e.target.value)
  }
  const onSave = () => {
    
    addNewEntry(inputValue)
    setInputValue('')
    setIsAddingEntry(false)
    setTouched(false)
  }


  return (
    <>
      <Box
        sx={{ marginBottom: 2, paddingX: 1 }}
      >
        {
          isAddingEntry ? 
          (
            <>
              <TextField
                id="outlined-multiline-static"
                fullWidth
                sx={{ marginBottom: 1, marginTop: 2 }}
                autoFocus
                multiline
                label="Nueva entrada"
                placeholder="Escribe una nueva entrada"
                helperText={ inputValue.length <= 5 && touched && "Debe ingresar una descripción"}
                error={ inputValue.length <= 5 && touched }
                value={inputValue}
                onChange={onTextFieldChange}
                onBlur={() => setTouched(true)}
              >
              </TextField>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  sx={{}}
                  endIcon={<SaveOutlinedIcon/>} 
                  onClick={()=> onSave()}
                  >
                  Guardar
                </Button>
                <Button 
                  variant="text" 
                  sx={{}}
                  onClick={() => setIsAddingEntry(false)}
                  // endIcon={} 
                  >
                  Cancelar
                </Button>
              </Box>
            </>
          ) : 
          (
            <Button
              startIcon={<AddIcon/>}
              variant="outlined"
              sx={{ marginBottom: 1, marginTop: 2 }}
              fullWidth
              onClick={() => setIsAddingEntry(true)}
            >
              Agregar Tarea
            </Button>

          )         
        }
      </Box>
    </>
  )
}
