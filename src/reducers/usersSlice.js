import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: { id: 'abc123', name: 'Adam Jahr' }
  },
  reducers: {}
});

export default usersSlice.reducer;
