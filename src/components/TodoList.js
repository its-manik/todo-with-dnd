import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const getTaskPos = (id) => taskList.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    setTaskList((tasks) => {
      const originPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      const dd = arrayMove(tasks, originPos, newPos);
      localStorage.setItem("taskList", JSON.stringify(dd));
      return dd;
    });
  };

  useEffect(() => {
    // localStorage.setItem("taskList", []);
    let arr = localStorage.getItem("taskList");
    console.log(arr);
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    // tempList.splice(index, 1);
    const newArr = tempList.filter((item) => {
      console.log(item.id, index);
      return item.id !== index;
    });
    localStorage.setItem("taskList", JSON.stringify(newArr));
    setTaskList(newArr);
    console.log("helkkj");
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;

    const objIndex = tempList.findIndex((obj) => obj.id == index);

    tempList[objIndex] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <div className="task-inner">
            <SortableContext
              items={taskList.map((value) => {
                return value;
              })}
              strategy={verticalListSortingStrategy}
            >
              {taskList &&
                taskList.map((obj, index) => (
                  <Card
                    taskObj={obj}
                    index={index}
                    deleteTask={deleteTask}
                    updateListArray={updateListArray}
                    key={obj.id}
                    id={obj.id}
                  />
                ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
