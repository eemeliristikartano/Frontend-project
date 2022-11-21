import './App.css';
import Customerlist from './components/Customerlist';
import { Tabs } from 'antd';
import Traininglist from './components/Traininglist';
import { useState } from 'react';

function App() {
  const [event, setEvent] = useState('');
  const items = [
    {
      label: 'Customers',
      key: 'item-1',
      children: <Customerlist />
    },
    {
      label: 'Trainings',
      key: 'item-2',
      children: <Traininglist event={event} />
    }
  ];

  const handleTabClick = (key, event) => {
    if (key === 'item-2') setEvent(event);
  }

  return (
    <div className="App">
      <Tabs items={items} onTabClick={handleTabClick} />
    </div>
  );
}

export default App;
