import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);
  useEffect(() => {
    setInterval(() => {
      let currentTime = new Date();
      setTime(currentTime.toLocaleTimeString());
    }, 1000);
    let currentdate = new Date();
    setDate(currentdate.toLocaleDateString());
  }, [time]);

  useEffect(() => {
    let todoStr = localStorage.getItem("todos");
    if (todoStr) {
      let todos = JSON.parse(todoStr);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const showtoggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    let fillterTodo = todos.filter((item) => item.id != id);
    setTodos(fillterTodo);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newArr = todos.filter((item) => {
      return item.id != id;
      saveToLS();
    });
    setTodos(newArr);
  };
  const handleAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isComplete: false }]);
    setTodo("");
    saveToLS();
  };
  const handleInput = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let arr = [...todos];
    arr[index].isComplete = !arr[index].isComplete;
    setTodos(arr);
    saveToLS();
  };
  return (
    <>
      <div
        id="myContainer"
        className="container flex justify-center items-center sm:mt-10 mt-20  mx-auto  "
      >
        <div className="main sm:w-full w-[100vw]">
          <h1 className="sm:text-5xl text-[#DFC7C5] font-bold text-3xl">
            Just do it.
          </h1>
          <div className="flex justify-center items-center sm:w-full w-[95vw] mt-5 mx-auto">
            <input
              id="mainInput"
              className="bg-[#252828] placeholder:text-[#676c6c] p-2 px-3 w-[100%] sm:w-[60%] rounded-l-lg focus:no-underline text-white focus:outline-none"
              type="text"
              placeholder="Add a Task"
              onChange={handleInput}
              value={todo}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length >= 3 ? false : true}
              className="p-2 px-3 bg-[#DFC7C5] rounded-r-lg border-none"
            >
              Save
            </button>
          </div>
          <div className="dateTime mt-7 flex justify-center items-center gap-2 text-[#DFC7C5]">
            <div className="date">{date},</div>
            <div className="time">{time}</div>
          </div>
          <div className="todos w-full flex justify-center items-center flex-col mt-5 ">
            {todos.length == 0 && (
              <div className="text-[#DFC7C5] font-bold ">
                No Todo to Display
              </div>
            )}
            <div className="flex justify-center items-center my-4 mb-7 text-[#DFC7C5] gap-2">
              <input
                onChange={showtoggleFinished}
                id="showFinished"
                checked={showFinished}
                type="checkbox"
                className="h-4 w-4"
              />
              <label htmlFor="showFinished">Show your Finished Tasks</label>
            </div>
            {todos.map((item) => {
              return (
                (showFinished || !item.isComplete) && (
                  <div
                    key={item.id}
                    className="todo flex justify-between items-center bg-[#252828] p-3 rounded-lg mt-3 text-[#DFC7C5] px-5 h-full w-[95vw] sm:w-[64.5%]"
                  >
                    <div className="text text-start flex justify-center items-center gap-2">
                      <input
                        onChange={handleCheckBox}
                        type="checkbox"
                        name={item.id}
                        id=""
                        value={item.isComplete}
                        className="h-4 w-4"
                      />
                      <span className={item.isComplete ? "line-through" : ""}>
                        {item.todo}
                      </span>
                    </div>
                    <div className="icons flex justify-center items-center gap-2 ">
                      <span
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="material-symbols-outlined sm:h-10 sm:w-10 h-8 w-8 sm:p-1 p-0.5 duration-300 text-xl sm:text-2xl rounded-full bg-[#DFC7C5] text-[#000] hover:bg-[#bba09e] cursor-pointer"
                      >
                        edit
                      </span>
                      <span
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="material-symbols-outlined sm:h-10 sm:w-10 h-8 w-8 sm:p-1 p-0.5 duration-300 text-xl sm:text-2xl rounded-full bg-[#DFC7C5] text-[#000] hover:bg-[#bba09e] cursor-pointer"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
