import React from "react";
import { ImPencil, ImBin2 } from "react-icons/im";
import { BsFillEyeFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Remove, Update_data } from "../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { FcCheckmark } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Todo = () => {
  
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);


    //..........................................
  };
  //Add DAta

  const All_tasks = useSelector((state) => state.todoreducers.User_data);

  const { User_data } = useSelector((state) => state.todoreducers);
  // console.log(User_data);

  //Post View Modal state..
  const [view, setView] = useState(false);

  //Post view Modal state to get value of post in modal..
  const [viewValue, setViewValue] = useState("");
  const [show, setShow] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [update, setUpdate] = useState("");
  const [updatedval, setupdatedval] = useState("");
  const [updatepriority, setupdatepriority] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  //Remove Task.....................
  const deleteTask = () => {
    dispatch(Remove(todoId));
    setDeleteConfirmationModal(false);


    // Delete task toast..
    if (All_tasks.length === 1) {
      toast.error("All Tasks  Deleted");
    } else {
      toast.success("Your Task Is Deleted Successfully");
    }
  };
// 
  useEffect(() => {
    setupdatedval(update.items);
    setupdatepriority(update.priority);
  }, [update]);

  //handle close for modal..
  const handleClose = () => setShow(false);

  const handleShow = (el) => {
    setShow(true);
    setUpdate(el);
    // console.log(el);
  };


  //update task ..

  const usertask_update = (id) => {
    let cur_task = All_tasks.find((elem) => elem.id === id);
    let duplicateTask = All_tasks.filter(
      (task) =>
        task.items.toLowerCase().trim() === updatedval.toLowerCase().trim()
    );
    if (!updatedval) {
      toast.error("Update input is Empty");
    } else if (!updatepriority) {
      toast.error("Update priority value is Empty");
    } else if (
      cur_task.items.toLowerCase().trim() === updatedval.toLowerCase().trim() &&
      cur_task.priority === updatepriority
    ) {
      toast.error("Updated value is same as Initial Value");
      console.log(duplicateTask);
    } else if (
      duplicateTask.length > 0 &&
      duplicateTask[0].id !== cur_task.id
    ) {
      toast.error("Task already exits");
    } else {
      const updated_task = {
        ...cur_task,
        priority: updatepriority,
        items: updatedval
      };
      dispatch(Update_data(updated_task, id));
      handleClose();
      toast.success("Task Updated Successfully");
    }
  };


////filter////////////////////////

  const data =
    selectedOption ==="All"
      ? User_data
      : User_data.filter((elem) => {
          return elem.priority === selectedOption;
        });
  
  // console.log({User_data, data, selectedOption})
 
//.............Complete Handler................
  const completedHandler = (id) => {
    let cur_task = All_tasks.find((elem) => elem.id === id);

    const updated_task = {
      ...cur_task,
      priority: "completed",
    };

    dispatch(Update_data(updated_task, id));
  };

  return (
    <>
      <div>
        {All_tasks.length > 0 && (
          <div className="todo_data col-lg-8 mx-auto mt-2">
            <br />
            <br />
            <br />
            <hr />
            <div>
              <h2>Todo Lists</h2>
              <select
                defaultValue={selectedOption}
                onChange={handleOptionChange}
                className="form-select"
                aria-label="Priority"
              >
                <option value="All">All</option>
                <option value="completed">Completed</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <br />

            <hr />

            {/* Mapping for Add Data */}
            {[...data].reverse()?.map((ele) => {
              return (
                <>
                  <div
                    key={ele?.id}
                    className={`${`todo_container mb-2 d-flex justify-content-between align-items-center  px-2 ${ele.priority}`} `}
                    style={{
                      background:
                        ele.priority === "completed" ? "green" : "white",
                      borderRadius: "2vh",
                      height: "3rem",
                      color: ele.priority === "completed" ? "white" : "black",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      
                    }}
                  >
                    <li style={{ listStyle: "none" }}>{ele?.items}</li>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",

                        justifyContent:
                          ele.priority === "completed"
                            ? "flex-end"
                            : "space-between",
                      }}
                      className="edit-dlt col-lg-6 py-2 d-flex align-items-center "
                    >
                      {/* Update Button with Icon */}
                      <button
                        style={{
                          borderRadius: "1vh",
                          border: "0rem",
                          boxShadow: " 0px 2px 7px 0px blue",
                          padding: "1px 5px",
                          display:
                            ele.priority === "completed" ? "none" : "block",
                            // display: "flex",
                            // alignItems: "center",
                            // gap: "1vh"
                        }}
                        onClick={() => {
                          handleShow(ele);
                        }}

                      >
                        <ImPencil
                          style={{ cursor: "pointer", color: "blue" }}
                        />
                        Edit
                      </button>

                      {/* Remove icon with button for remove the task */}
                      <button
                        style={{
                          borderRadius: "1vh",
                          border: "0rem",
                          padding: "1px 5px",
                          boxShadow: " 0px 2px 7px 0px red",
                          display:
                            ele.priority === "completed" ? "none" : "block",
                            // display: "flex",
                            // alignItems: "center",
                            // gap: "1vh"
                        }}
                        onClick={() => {
                          setDeleteConfirmationModal(true);
                          setTodoId(ele.id);
                        }}
                      >
                        <ImBin2 style={{ cursor: "pointer", color: "red" }} />
                        Delete
                      </button>

                      {/* mark as complete button */}
                      <button
                        onClick={() => completedHandler(ele.id)}
                        style={{
                          borderRadius: "1vh",
                          border: "0rem",
                          padding: "1px 5px",
                          boxShadow: " 0px 2px 7px 0px green",
                          // display: "flex",
                          //   alignItems: "center",
                          //   gap: "1vh",

                          display:
                            ele.priority === "completed" ? "none" : "block",
                        }}
                      >
                        <FcCheckmark />
                        {ele.priority === "completed"
                          ? "Completed"
                          : "Mark as completed"}
                      </button>

                      {/* Eye icon with Button for View post in modal */}
                      <button
                        style={{
                          borderRadius: "1vh",
                          border: "0rem",
                          padding: "1px 5px",
                          boxShadow: " 0px 2px 7px 0px yellow",
                          float: "right",
                          display: "flex",
                            alignItems: "center",
                            gap: "1vh"
                        }}
                        onClick={() => {
                          setView(true);
                          setViewValue(ele);
                        }}
                      >
                        <BsFillEyeFill style={{ cursor: "pointer" }} />
                        View
                      </button>
                    </div>
                  </div>
                </>
              );
            })}

            {/*-------------------- No Task Heading -------------------*/}
            {data.length === 0 && (
              <h3 style={{ color: "red" }}>
                No Tasks Available In This Priority
              </h3>
            )}

            {/* For view modal */}
            <Modal show={view}>
              <h3 className=" ms-3">Title: {viewValue?.items}</h3>
              <p className="text-start ms-3 h5">
                Priority: {viewValue?.priority}
              </p>
              <p className="text-start ms-3 h5">
                Created At: {viewValue?.createdAt}
              </p>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setView(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* delete modal */}
            <Modal
              show={deleteConfirmationModal}
              onHide={() => {
                setDeleteConfirmationModal(false);
              }}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>DELETE TODO!!!</Modal.Title>
              </Modal.Header>
              <Modal.Body>are you sure to delete the task!</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDeleteConfirmationModal(false);
                  }}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={deleteTask}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={show} onHide={handleClose}>
              <h3 className="text-center mt-2">Update Your Task Here..</h3>
              <Modal.Header>
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="todo col-lg-5 mx-auto d-flex justify-content-between align-items-center"
                >
                  <input
                    name="task"
                    defaultValue={update?.items}
                    onChange={(e) => {
                      setupdatedval(e.target.value);
                    }}
                    className="form-control col-lg-5 mt-2"
                  />{" "}
                  <br />
                  <select
                    // value={editedOption}
                    defaultValue={update?.priority}
                    onChange={(e) => setupdatepriority(e.target.value)}
                    className="form-select"
                    aria-label="Priority"
                    // onClick={()=>{EditPriorityHandler()}}
                  >
                    <option style={{ display: "none" }}>Edit Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => usertask_update(update?.id)}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
    </>
  );
};

export default Todo;
