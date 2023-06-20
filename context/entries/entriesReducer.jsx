// import { EntriesState } from './';
export const entriesReducer = (state, action) => {
  switch (action.type) {
    case '[Entries] - Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case '[Entries] - Entry-Updated':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        })
      }
    case '[Entries] - Refresh-data':
      return {
        ...state,
        entries: [ ...action.payload ]
      }
    case '[Entries] - Delete-Entry':
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload)
      }
    default:
      return state;
  }
};