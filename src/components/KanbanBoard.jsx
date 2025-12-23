import "./KanbanBoard.css";
import { motion } from "framer-motion";

const KanbanBoard = ({ tasks, onDropTask }) => {
  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    onDropTask(taskId, status);
  };

  return (
    <div className="kanban-container">

      {/* ========== TODO COLUMN ========== */}
      <div
        className="kanban-column"
        onDragOver={allowDrop}
        onDragEnter={(e) => e.currentTarget.classList.add("kanban-drop-over")}
        onDragLeave={(e) => e.currentTarget.classList.remove("kanban-drop-over")}
        onDrop={(e) => {
          e.currentTarget.classList.remove("kanban-drop-over");
          handleDrop(e, "To Do");
        }}
      >
        <h3>Todo</h3>

        {tasks.todo.length === 0 ? (
          <p className="empty">No tasks</p>
        ) : (
          tasks.todo.map((task) => (
            <motion.div
              key={task.id}
              className="kanban-card"
              draggable
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
            >
              {task.name}
            </motion.div>
          ))
        )}
      </div>

      {/* ========== IN PROGRESS COLUMN ========== */}
      <div
        className="kanban-column"
        onDragOver={allowDrop}
        onDragEnter={(e) => e.currentTarget.classList.add("kanban-drop-over")}
        onDragLeave={(e) => e.currentTarget.classList.remove("kanban-drop-over")}
        onDrop={(e) => {
          e.currentTarget.classList.remove("kanban-drop-over");
          handleDrop(e, "In Progress");
        }}
      >
        <h3>In Progress</h3>

        {tasks.inProgress.length === 0 ? (
          <p className="empty">No tasks</p>
        ) : (
          tasks.inProgress.map((task) => (
            <motion.div
              key={task.id}
              className="kanban-card"
              draggable
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
            >
              {task.name}
            </motion.div>
          ))
        )}
      </div>

      {/* ========== DONE COLUMN ========== */}
      <div
        className="kanban-column"
        onDragOver={allowDrop}
        onDragEnter={(e) => e.currentTarget.classList.add("kanban-drop-over")}
        onDragLeave={(e) => e.currentTarget.classList.remove("kanban-drop-over")}
        onDrop={(e) => {
          e.currentTarget.classList.remove("kanban-drop-over");
          handleDrop(e, "Done");
        }}
      >
        <h3>Done</h3>

        {tasks.done.length === 0 ? (
          <p className="empty">No tasks</p>
        ) : (
          tasks.done.map((task) => (
            <motion.div
              key={task.id}
              className="kanban-card"
              draggable
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
            >
              {task.name}
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
};

export default KanbanBoard;
