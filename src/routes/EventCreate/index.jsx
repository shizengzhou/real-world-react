import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NProgress from 'nprogress';
import DatePicker from 'react-datepicker';
import BaseButton from '../../components/BaseButton';
import BaseInput from '../../components/BaseInput';
import BaseSelect from '../../components/BaseSelect';
import { StoreContext } from '../../store';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const categories = [
  'sustainability',
  'nature',
  'animal welfare',
  'housing',
  'education',
  'food',
  'community'
];
const times = [];
for (let i = 0; i < 24; i++) {
  times.push(i + 1 + ':00');
}

function EventCreate() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const store = useContext(StoreContext);

  function createEvent(e) {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000000);
    const event = {
      id,
      category,
      organizer: 'zsz',
      title,
      description,
      location,
      date,
      time,
      attendees: []
    };
    store.eventStore.createEvent(event)
      .then(() => {
        navigate(`/event/${id}`);
      })
      .catch(() => {
        NProgress.done();
      });
  }

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={createEvent}>
        <BaseSelect
          className="field"
          label="Select a category"
          options={categories}
          value={category}
          handleChange={e => setCategory(e.target.value)}
        />
        <h3>Name & describe your event</h3>
        <BaseInput
          className="field"
          label="Title"
          placeholder="Add an event title"
          value={title}
          handleChange={e => setTitle(e.target.value)}
        />
        <BaseInput
          className="field"
          label="Description"
          placeholder="Add a description"
          value={description}
          handleChange={e => setDescription(e.target.value)}
        />
        <h3>Where is your event?</h3>
        <BaseInput
          className="field"
          label="Location"
          placeholder="Add a location"
          value={location}
          handleChange={e => setLocation(e.target.value)}
        />
        <h3>When is your event?</h3>
        <div className="field">
          <label>Date</label>
          <DatePicker
            selected={date}
            onSelect={date => setDate(date)}
            dateFormat="dd MMM yyyy"
          />
        </div>
        <BaseSelect
          className="field"
          label="Select a time"
          options={times}
          value={time}
          handleChange={e => setTime(e.target.value)}
        />
        <BaseButton type="submit" className="-fill-gradient">Submit</BaseButton>
      </form>
    </div>
  );
}

export default EventCreate;
