import React from "react";
const Input = ({ task, setTask }) => {
  return (
    <input
      type="text"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      className=" w-full rounded-md px-2 py-2 border-secondary-purple text-gray-400 border-2
      placeholder:text-gray-500  focus:outline-none focus:ring-2 focus:ring-secondary-purple focus:border-transparent"
      placeholder="Enter your task"
    />
  );
};

export default Input;
