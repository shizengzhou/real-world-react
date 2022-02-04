import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [{ id: 'abc123', name: 'Adam Jahr' }],
  reducers: {}
});

export default usersSlice.reducer;
