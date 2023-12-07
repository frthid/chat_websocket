import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  id: string;
}

export interface Users {
  users: User[];
}

export const initialState: Users = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUsers: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUsers: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});


export const { setUsers, addUsers, removeUsers} = usersSlice.actions;

export default usersSlice.reducer;