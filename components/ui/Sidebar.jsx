import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { React, useContext } from 'react'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';

const menuItems = ['Inbox','Starred','Send email','Drafts'];



export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)


  return (
    <Drawer
      anchor="left"
      open={ sidemenuOpen }
      onClose={ closeSideMenu }
    >
      <Box sx={{ width: 250}} >
        <Box sx={{ padding:'10px 20px'}} >
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {
            menuItems.map((item, index) => (
              <ListItem key={item} button >
                <ListItemIcon>{index % 2 === 0 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}</ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map((item, index) => (
              <ListItem key={item} button >
                <ListItemIcon>{index % 2 === 0 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}</ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))
          }
        </List>
      </Box>

    </Drawer>
  )
}
