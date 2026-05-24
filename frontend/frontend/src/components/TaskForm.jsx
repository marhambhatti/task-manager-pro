function TaskForm({
  title,
  description,
  status,
  priority,
  category,
  dueDate,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onDueDateChange,
  onSubmit,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <div className="task-form__header">
        <div>
          <span>Create task</span>
          <h2>Add something to your list</h2>
        </div>
      </div>

      <div className="task-form__fields">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />

        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select value={priority} onChange={(e) => onPriorityChange(e.target.value)}>
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>

        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
