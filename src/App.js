import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { useState } from 'react';
import Column from './components/Column';
import { DndContext, closestCorners } from '@dnd-kit/core';

function App() {

  const [tasks, setTasks] = useState([
    {id:1, title: "title 1"},
    {id:2, title: "title 2"},
    {id:3, title: "title 3"},
  ])

  return (
    <div className="App">
      <TodoList />
{/* 

      <DndContext collisionDetection={closestCorners}>
          <Column tasks={tasks} />
        </DndContext> */}
    </div>
  );
}

export default App;
