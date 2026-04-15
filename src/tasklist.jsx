import React from "react";
import { Check, CheckCircleIcon } from "lucide-react";
import { Trash } from "lucide-react";

const Tasklist = ({
  taskTitle,
  id,
  completed,
  handleDelete,
  handleCheck,
  handleUncomplete,
}) => {
  return (
    <div className="overflow-hidden ">
      <div className="flex justify-center items-center">
        <div
          className={`w-full rounded-lg flex justify-between py-3 px-5 ${
            completed
              ? "bg-primary-purple text-white"
              : "bg-primary-purple text-secondary-purple"
          }`}
        >
          <span
            className={`text-sm md:text-base ${
              completed ? "line-through opacity-70" : ""
            }`}
          >
            {taskTitle}
          </span>

          {/* ✅ Show icons ONLY if task is NOT completed */}
          {!completed && (
            <div className="flex items-center gap-4">
              <Check
                onClick={() => handleCheck(id)}
                className="hover:opacity-70 transition-all duration-300 w-[1.2rem] cursor-pointer"
              />

              <Trash
                onClick={() => handleDelete(id)}
                className="hover:opacity-70 transition-all duration-300 w-[1.2rem] cursor-pointer"
              />
            </div>
          )}
          {completed && (
            <div>
              <CheckCircleIcon
                className="hover:opacity-70 transition-all text-secondary-purple/70 w-[1.2rem]  duration-300 cursor-pointer"
                onClick={() => handleUncomplete(id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Tasklist;
