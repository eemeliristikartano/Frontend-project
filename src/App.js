import './App.css';
import Customerlist from './components/Customerlist';
import { Tabs } from 'antd';
import Traininglist from './components/Traininglist';

function App() {
  const items = [
    {
      label: 'Customers',
      key: 'item-1',
      children: <Customerlist />
    },
    {
      label: 'Trainings',
      key: 'item-2',
      children: <Traininglist />
    }
  ];

  return (
    <div className="App">
      <Tabs items={items} />
    </div>
  );
}

export default App;
