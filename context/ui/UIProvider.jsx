// import UIContext from "./UIContext"
import { uiReducer, UIContext } from "./"
import { useReducer } from "react"

const UI_IINITIAL_STATE = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}
export const UIProvider = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, UI_IINITIAL_STATE)

  const openSideMenu = () => {
    dispatch({type:'UI - Open Sidebar'})
  }

  const closeSideMenu = () => {
    dispatch({type:'UI - Close Sidebar'})
  }

  const setIsAddingEntry = (isAdding) => {
    dispatch({type:'UI - Set isAddingEntry', payload:isAdding})
  }

  const startDragging = () => {
    dispatch({type:'UI - Start Dragging', payload:true})
  }
  const endDragging = () => {
    dispatch({type:'UI - End Dragging', payload:false})
  }

  return (
    <UIContext.Provider value={{
      ...state, // sidemenuOpen: state.sidemenuOpen,

      //methods
      openSideMenu,
      closeSideMenu,
      
      setIsAddingEntry,

      startDragging,
      endDragging
      
    }}>
      { children }
    </UIContext.Provider>
  )
}
