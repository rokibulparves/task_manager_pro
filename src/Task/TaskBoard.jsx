/* eslint-disable no-unused-vars */
import { useState } from "react";
import AddTaskModel from "./AddTaskModel";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "React js & Next js",
    description:
      "I've have so much to gain from vanilla js but I'll still moving forword as much as I can.",
    tags: ["React", "Next", "Javascript"],
    priority: "High",
    isFavourite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModel, setShowAddModel] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModel(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModel(true);
  }

  function handleCancel(task) {
    setShowAddModel(false);
    setTaskToUpdate(null);
  }

  function handleDelete(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAll(tasks) {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavourite(taskId) {
    const filterdId = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[filterdId].isFavourite = !newTask[filterdId].isFavourite;
    setTasks(newTask);
  }

  function handleSearchItem(searchItem) {
    console.log(searchItem);

    const showItem = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    console.log(showItem);
    setTasks([...showItem]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModel && (
        <AddTaskModel
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onCancel={handleCancel}
        />
      )}
      <div className="container">
        <SearchTask birdEyeSearch={handleSearchItem} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModel(true)}
            tasks={tasks}
            deleteAll={handleDeleteAll}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDelete}
              addFavourite={handleFavourite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
