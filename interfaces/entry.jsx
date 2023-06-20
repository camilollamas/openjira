
export class Entry{
  constructor() {
    this._id = '';
    this.description = '';
    this.createdAt = 0;
    this.status = 'pending';
  }
};
// const entry = new entry();




// export interface Entry {
//   _id: string;
//   description: string;
//   createdAt: number;
//   status: EntryStatus;
  
//   title: string;
//   updatedAt: string;
//   deletedAt: string;
//   userId: string;
//   projectId: string;
// }

// export type EntryStatus = 'pending' | 'in-progress' | 'finished';