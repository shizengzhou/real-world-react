import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
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
          <Menu.Item>
            <Link to="/">List</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/event/create">Create</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
