import { useEffect, useState } from "react";
import Input from "./input";
import Button from "./button";
import Tasklist from "./tasklist";
import Listheader from "./Listheader";

const Card = () => {
  // const [count, setCount] = useState(0);
  const STORAGE_KEY = "tasks";
  const [allTasks, setAllTasks] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error reading tasks from localStorage:", error);
      return [];
    }
  });
  const [task, setTask] = useState("");
  const pendingTasks = allTasks.filter((task) => !task.completed);
  const completedTasks = allTasks.filter((task) => task.completed);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [allTasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      setAllTasks([
        ...allTasks,
        { id: Date.now(), title: task, completed: false },
      ]);
      setTask("");
    }
  };

  const handleUncomplete = (id) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setAllTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    setAllTasks(allTasks.filter((task) => task.id !== id));
  };

  const handleCheck = (id) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setAllTasks(updatedTasks);
  };

  return (
    <div className="md:w-[60%] w-full lg:w-[40%] rounded-3xl sm:w-[40%] h-[80%] p-10 bg-light-purple/70">
      <form
        onSubmit={handleSubmit}
        action=""
        className=" w-full flex items-center gap-2  "
      >
        <Input task={task} setTask={setTask} />
        <Button handleSubmit={handleSubmit} value={"+"} css={"py-2"} />
      </form>

      <div className="my-4">
        {/* 🔹 Pending Tasks */}
        <div className="text-secondary-purple italic mb-2 font-light text-sm">
          {pendingTasks.length < 1 && (
            <div>
              <Listheader
                title={"Tasks Unavailable, add Tasks"}
                count={pendingTasks.length}
              />
            </div>
          )}
        </div>

        <div className="text-white mb-2 italic font-light text-sm">
          {pendingTasks.length > 0 && (
            <div>
              <Listheader title={"Tasks To Do"} count={pendingTasks.length} />

              <div className="flex flex-col gap-2">
                {pendingTasks.map((item) => (
                  <Tasklist
                    key={item.id}
                    id={item.id}
                    taskTitle={item.title}
                    completed={item.completed}
                    handleDelete={handleDelete}
                    handleCheck={handleCheck}
                    handleUncomplete={handleUncomplete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 🔹 Completed Tasks */}
        <div className="text-white mb-2 italic font-light text-sm">
          {completedTasks.length > 0 && (
            <div className="mt-6">
              <Listheader title={"Done"} count={completedTasks.length} />

              <div className="flex flex-col gap-2">
                {completedTasks.map((item) => (
                  <Tasklist
                    key={item.id}
                    id={item.id}
                    taskTitle={item.title}
                    completed={item.completed}
                    handleDelete={handleDelete}
                    handleCheck={handleCheck}
                    handleUncomplete={handleUncomplete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
