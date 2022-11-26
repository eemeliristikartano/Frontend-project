import './App.css';
import Customerlist from './components/Customerlist';
import { Tabs } from 'antd';
import Traininglist from './components/Traininglist';
import { useState } from 'react';
import CalendarPage from './components/CalendarPage';
import StatisticsPage from './components/StatisticsPage';

function App() {
  const [event, setEvent] = useState('');
  const items = [
    {
      label: 'Customers',
      key: 'item-1',
      children: <Customerlist event={event} />
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
      label: 'Statistics',
      key: 'item-4',
      children: <StatisticsPage event={event} />
    }
  ];

  //Update data everytime user changes tab.
  const handleTabClick = (key, event) => {
    setEvent(event);
  }

  return (
    <div className="App">
      <Tabs items={items} onTabClick={handleTabClick} />
    </div>
  );
}

export default App;
