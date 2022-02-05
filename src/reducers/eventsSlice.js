import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import EventService from '../services/EventService';

const eventsAdapter = createEntityAdapter();

const initialState = eventsAdapter.getInitialState({
  eventsTotal: 0,
  event: null
});

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
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        eventsAdapter.setAll(state, action.payload.data);
        state.eventsTotal = action.payload.total;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.event = action.payload;
      });
  }
});

export default eventsSlice.reducer;

export const {
  selectAll: selectAllEvents
} = eventsAdapter.getSelectors(state => state.events)

export const selectEventById = (state, eventId) => {
  const event = state.events.event;
  if (event && event.id === eventId) {
    return event;
  }
  return state.events.entities[eventId];
}
