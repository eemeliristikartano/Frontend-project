import './App.css';
import Customerlist from './components/Customerlist';
import { Tabs } from 'antd';
import Traininglist from './components/Traininglist';
import { useState } from 'react';
import CalendarPage from './components/CalendarPage';
import StaticsPage from './components/StaticsPage';

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
    },
    {
      label: 'Calendar',
      key: 'item-3',
      children: <CalendarPage event={event} />
    },
    {
      label: 'Statics',
      key: 'item-4',
      children: <StaticsPage />
    }
  ];

  const handleTabClick = (key, event) => {
    if (key === 'item-2' || key === 'item-3') setEvent(event);
  }

  return (
    <div className="App">
      <Tabs items={items} onTabClick={handleTabClick} />
    </div>
  );
}

export default App;
