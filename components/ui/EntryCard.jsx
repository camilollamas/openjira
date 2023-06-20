import { useContext } from 'react'
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material'
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'
import { dateFunctions } from '../../utils'


export const EntryCard = ({entry}) => {
  const { startDragging, endDragging } = useContext(UIContext)

  const router = useRouter()

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', entry._id)
    //TODO MODIFICAR ESTADO PARA INDICAR QUE ESTOY HACIENDO DRAG

    startDragging()
  }

  const onDragEnd = (e) => {
    endDragging()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }




  return (
    //Drop to do
    <div>
      <Card
        onClick={ onClick }
        sx={{ marginBottom: 1 }}
        //Drag event
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
      >
        <CardActionArea>
          <CardContent>
            <Typography sx={{ whiteSpace: 'pre-line' }} >
             { entry.description }
            </Typography>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: '2' }} >
            <Typography variant='body2'>
              {dateFunctions.GetFormatDistanceToNow(entry.createdAt)}
            </Typography>
          </CardActions>
        </CardActionArea>

      </Card>
    </div>
  )
}
