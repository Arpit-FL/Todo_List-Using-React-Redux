import React from "react";
import Button from "react-bootstrap/Button";
import Todo from "./Todo";
import { useState } from "react";
import { Add } from "../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const All_tasks = useSelector((state) => state.todoreducers.User_data);
  

  //Use Dispatch For Add
  const dispatch = useDispatch();

  //onclick action function for add user's data in todo list input
  const addData = () => {
    ///validation of duplicate entries
    let temp = All_tasks.filter(
      (task) =>
        task.items.toLowerCase().trim() === data.toLocaleLowerCase().trim()
    );

    if (temp.length > 0) {
     return toast.error('Task already exists')
    }
  
    if (!data) {
      toast.error("Task field is empty");
    } else if (!selectedOption) {
      toast.error("Please select priority");
    }
    else {
      dispatch(Add({ items: data, priority: selectedOption }));
      toast.success("Task Added Successfuly");
      setData("");
      setSelectedOption("");

    }
  };

  // Option change handler

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //------------------------------------------------------------------
  return (
    <>
      <div>
        <div className="container">
          <section style={{ width: "100%" }} className="mt-3 text-center">
            <h1>Enter Your Task</h1>
            <div className="todo col-lg-5 mx-auto d-flex justify-content-evenly w-50 align-items-space-between " >
              <input
                name="task"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="form-control"
                placeholder="Enter Your Task .."
                style={{
                  width:"35%"
                }}
              />
              {/* Dropdown */}

              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="form-select"
                aria-label="Priority"
                style={{
                  width:"35%"
                }}
              >
                <option style={{ display: "none" }} selected>
                  Select Priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <Button
                onClick={() => addData()}
                variant="outline-success"
                className="mx-2"
              >
                ADD
              </Button>
            </div>

            <Todo />
          </section>
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
        />
      </div>
    </>
  );
};

export default Home;
