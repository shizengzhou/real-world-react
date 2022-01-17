import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import NProgress from 'nprogress';
import { StoreContext } from '../../store';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const { Option } = Select;

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
  const navigate = useNavigate();
  const store = useContext(StoreContext);

  function createEvent(values) {
    const { category, title, description, location, date, time } = values;
    const id = Math.floor(Math.random() * 10000000);
    const event = {
      id,
      category,
      organizer: 'zsz',
      title,
      description,
      location,
      date: moment(date).format('dd MMM yyyy'),
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
      <Form layout="vertical" onFinish={createEvent}>
        <Form.Item
          label="Select a category"
          name="category"
          rules={[{ required: true, message: 'Category is required.' }]}
        >
          <Select>
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>
        <h3>Name & describe your event</h3>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Title is required.' }]}
        >
          <Input
            placeholder="Add an event title"
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Description is required.' }]}
        >
          <Input
            placeholder="Add a description"
          />
        </Form.Item>
        <h3>Where is your event?</h3>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Location is required.' }]}
        >
          <Input
            placeholder="Add a location"
          />
        </Form.Item>
        <h3>When is your event?</h3>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Date is required.' }]}
        >
          <DatePicker
            format="dd MMM yyyy"
          />
        </Form.Item>
        <Form.Item
          label="Select a time"
          name="time"
          rules={[{ required: true, message: 'Time is required.' }]}
        >
          <Select>
            {times.map(time => (
              <Option key={time} value={time}>{time}</Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default EventCreate;
