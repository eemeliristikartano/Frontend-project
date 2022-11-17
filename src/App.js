import './App.css';
import Customerlist from './components/Customerlist';
import { Menu } from 'antd';
import Traininglist from './components/Traininglist';
import { useState } from 'react';

function App() {
  const items = [
    {
      label: 'Users',
      key: 'users'
    },
    {
      label: 'Trainings',
      key: 'trainings'
    }
  ]
  const [current, setCurrent] = useState('users');
  const onClick = (e) => {
    setCurrent(e.key);
  }

  const renderComponent = (current) => {
    switch (current) {
      case 'users':
        return <Customerlist />;
      case 'trainings':
        return <Traininglist />;
    }
  }

  return (

    <div className="App">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      >
      </Menu>
      {renderComponent(current)}
    </div>



  );
}

export default App;
