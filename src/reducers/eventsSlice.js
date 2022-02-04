import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EventService from '../services/EventService';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({ perPage, page }) => {
    const response = await EventService.getEvents(perPage, page);
    return { data: response.data, total: response.headers['x-total-count'] };
  }
);

export const fetchEvent = createAsyncThunk('events/fetchEvent', async id => {
  const response = await EventService.getEvent(id);
  return response.data;
});

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async event => {
    const response = await EventService.postEvent(event);
    return response.data;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventsTotal: 0,
    event: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.data;
        state.eventsTotal = action.payload.total;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.event = action.payload;
      });
  }
});

export default eventsSlice.reducer;

export const selectAllEvents = state => state.events.events;

export const selectEventById = (state, eventId) => {
  const event = state.events.event;
  if (event && event.id === eventId) {
    return event;
  }
  return state.events.events.find(e => e.id === eventId);
}
