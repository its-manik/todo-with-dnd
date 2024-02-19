import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
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

  useEffect(() => {
    setTaskPriority(taskObj.priority);
    setDescription(taskObj.description);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    let tempObj = {};
    tempObj["priority"] = taskPriority;
    tempObj["description"] = description;
    tempObj["id"] = taskObj.id
    updateTask(tempObj);
    setDescription('')
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Priority</label>
          {/* <input type="text" className = "form-control" value = {taskPriority} onChange = {handleChange} name = "taskPriority"/> */}
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
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
