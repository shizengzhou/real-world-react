import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'nprogress/nprogress.css';
import EventList from './routes/EventList';
import EventLayout from './routes/EventLayout';
import EventShow from './routes/EventShow';
import EventCreate from './routes/EventCreate';
import NotFound from './routes/NotFound';
import NetworkIssue from './routes/NetworkIssue';
import { RootStore, StoreContext } from './store';

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={new RootStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<EventList />} />
            <Route path="event" element={<EventLayout />}>
              <Route path=":eventId" element={<EventShow />} />
              <Route path="create" element={<EventCreate />} />
            </Route>
            <Route path="404" element={<NotFound />} />
            <Route path="network-issue" element={<NetworkIssue />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
