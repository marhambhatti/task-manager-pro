function TaskCard({ task, onDelete, onUpdate }) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <article className="task-card">
      <div className="task-card__content">
        <span className="task-card__status">{task.status || "Pending"}</span>
        <h3>{task.title}</h3>
        <p>{task.description || "No description added"}</p>
        <div className="task-card__meta">
          <span>{task.priority || "Medium"}</span>
          <span>{task.category || "Other"}</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="task-card__actions">
        <select
          value={task.status || "Pending"}
          onChange={(e) => onUpdate(task._id, { status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="button" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
