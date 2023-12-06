import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  id: string;
}

const initialState: User = {
  name: '',
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.name = '';
      state.id = '';
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
