import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import NotificationContainer from './components/NotificationContainer';
import './App.less';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <Link to="/" className="brand">
          Real World Events
        </Link>
        <Menu mode="horizontal" style={{ borderBottom: 'none' }}>
          <Menu.Item key="list">
            <Link to="/">List</Link>
          </Menu.Item>
          <Menu.Item key="create">
            <Link to="/event/create">Create</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <NotificationContainer />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
