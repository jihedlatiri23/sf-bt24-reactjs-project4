import React, { useState } from 'react';
import {
  PlusCircleOutlined,
  SearchOutlined,
  InboxOutlined,
  CalendarOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; 
const { Sider } = Layout;

function getItem(label, key, icon, url = '/', type = 'link') {
    return { key, icon, label, type, url };
  }
  
  const items = [
    getItem('Add Task', '1', <PlusCircleOutlined />, 'create-task'),
    getItem('Search', '2', <SearchOutlined />, 'search'),
    getItem('Inbox', '3', <InboxOutlined />, 'inbox'),
    getItem('Upcoming', '4', <CalendarOutlined />, 'upcoming'),
    getItem('Filters & Labels', '5',null, 'filters-labels', 'label'), 
    getItem('Devops', 'label1', <TagOutlined style={{ color: '#C16C96' }} />, 'label/devops'),
    getItem('Learning', 'label2', <TagOutlined style={{ color: '#83ABA1' }} />, 'label/learning'),
    getItem('Softy Education', 'label3', <TagOutlined style={{ color: '#6D9DBA' }} />, 'label/softy-education'),
    getItem('Pack Pfe', 'label4', <TagOutlined style={{ color: '#B0793B' }} />, 'label/pack-pfe'),
    getItem('GoMyDesk', 'label5', <TagOutlined style={{ color: '#6781D8' }} />, 'label/gomydesk'),
  ];

const AppLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const navigate = useNavigate(); 

  const handleMenuClick = (e) => {
    const clickedItem = items.find((item) => item.key === e.key) || {};
    if (clickedItem.type === 'link') {
      console.log(clickedItem)
      setSelectedKey(e.key);
      navigate(`/${clickedItem?.url}`); 
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          {items.map((item) =>
            item.type === 'label' ? (
              <Menu.Item
                key={item.key}
                style={{
                  cursor: 'default',
                  fontWeight: 'bold',
                  color: '#999',
                  backgroundColor: 'transparent',
                  pointerEvents: 'none',
                }}
              >
                {item.label}
              </Menu.Item>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
             {children}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
