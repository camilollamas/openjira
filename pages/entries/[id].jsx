import { useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormLabel, Grid, RadioGroup, Radio, TextField, FormControlLabel, IconButton 
  , Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} 
from "@mui/material"
import { Layout } from "../../components/layouts"
import { Mongoose, isValidObjectId } from 'mongoose';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';


const validStatus = ['pending', 'in-progress', 'finished'];

const EntryPage = (props) => {
  const { entry } = props;
  
  const { updateEntry, deleteEntry } =  useContext( EntriesContext );

  const router = useRouter()

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState(entry.status);
  const [touched, setTouched] = useState(false);
  const [dgConfirmDelete, setDgConfirmDelete] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const onStatusChange = (e) => {
    setStatus(e.target.value);
    setTouched(true);
  }

  const onSave = () => {

    if(inputValue.trim().length === 0) return;


    const updatedEntry ={
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry(updatedEntry, true);
    
  }
  const onDelete = () => {
    deleteEntry(entry._id);
    setDgConfirmDelete(false)
    router.push(`/`)
  }

  return (
    <Layout title={ inputValue.substring(0,20) + '...' }>
      <Grid 
        container
        justifyContent='center'
        sx={{marginTop:2}}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader 
              title={`Entrada:`} 
              subheader={`${dateFunctions.GetFormatDistanceToNow(entry.createdAt)}`}
            >

            </CardHeader>
            <CardContent>
              <TextField 
                sx={{marginTop:2, marginBottom:1}} 
                fullWidth 
                placeholder="Nueva Entrada" 
                autoFocus 
                multiline 
                label="Nueva Entrada" 
                value={ inputValue }
                onBlur={ () => setTouched(true)}
                onChange={ onInputChange} 
                helperText={ isNotValid && 'La entrada no puede estar vacia' }
                error={ isNotValid }
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row 
                  value={ status }
                  onChange={ onStatusChange }
                >
                  {
                    validStatus.map((status) => (
                      <FormControlLabel key={status} value={status} label={capitalize(status)} control={<Radio />} />
                    ))
                  }
                 

                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button 
                startIcon={<SaveOutlinedIcon/>} 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={ onSave }
                disabled={ isNotValid }
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>

      <IconButton
        onClick={ () => setDgConfirmDelete(true) }
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor:'error.dark',
        }}
      >
        <DeleteOutlineOutlinedIcon/>
      </IconButton>
      <Dialog
        permanent={true}
        open={dgConfirmDelete}
        // onClose={() => setDgConfirmDelete(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"¿Confirma que desea eliminar la entrada?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" autoFocus onClick={() => setDgConfirmDelete(false)}>
            Cancelar
          </Button>
          <Button onClick={onDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </Layout>
  )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({params}) => {
  
  const { id } = params;

  const entry = await dbEntries.getEntriById( id );
 

  if( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}



export default EntryPage;
