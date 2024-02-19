import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskPriority, setTaskPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskPriority") {
      setTaskPriority(value);
    } else {
      setDescription(value);
    }
  };

  let id = Math.floor(Math.random() * 100000);

  const handleSave = (e) => {
    e.preventDefault();
    if (description === "") {
      return;
    }

    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      obj.forEach((e) => {
        if (e.id === id) {
          id = Math.floor(Math.random() * 100000);
        }
      });
    }

    let taskObj = {};
    taskObj["priority"] = taskPriority;
    taskObj["description"] = description;
    taskObj["id"] = id;
    save(taskObj);
    setDescription("");
  };

  useEffect(() => {
    if (!taskPriority) {
      return setTaskPriority("Low");
    }
  }, []);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Priority</label>
          {/* <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/> */}
          <select
            className="form-control"
            onChange={handleChange}
            name="taskPriority"
            value={taskPriority}
          >
            <option value={`Low`}>Low</option>
            <option value={`Medium`}>Medium</option>
            <option value={`High`}>High</option>
            <option value={`Critical`}>Critical</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
