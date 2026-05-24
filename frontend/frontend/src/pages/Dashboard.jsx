import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import "./dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Other");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });

  const token = localStorage.getItem("token");
  const authHeader = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token],
  );

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      params.page = page;
      params.limit = pagination.limit;
      if (appliedSearch) params.search = appliedSearch;
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      if (filterCategory) params.category = filterCategory;

      const res = await API.get("/task", {
        ...authHeader,
        params,
      });
      setTasks(res.data.tasks);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, authHeader, filterCategory, filterPriority, filterStatus, page, pagination.limit]);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/task/create",
        { title, description, status, priority, category, dueDate: dueDate || undefined },
        authHeader,
      );

      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Medium");
      setCategory("Other");
      setDueDate("");
      toast.success("Task created");
      if (page === 1) {
        fetchTasks();
      } else {
        setPage(1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`, authHeader);

      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await API.put(`/task/${id}`, updates, authHeader);

      toast.success("Task updated");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const searchTasks = async (e) => {
    e.preventDefault();

    setAppliedSearch(search.trim());
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setAppliedSearch("");
    setFilterStatus("");
    setFilterPriority("");
    setFilterCategory("");
    setPage(1);
  };

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, pagination.totalPages));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <Navbar />

      <main className="dashboard-container">
        <section className="dashboard-hero">
          <div>
            <p>Personal workspace</p>
            <h1>Task Dashboard</h1>
          </div>
          <div className="dashboard-summary">
            <div>
              <span>{tasks.length}</span>
              <p>Total tasks</p>
            </div>
            <div>
              <span>{tasks.filter((task) => task.status === "Completed").length}</span>
              <p>Completed</p>
            </div>
          </div>
        </section>

        <TaskForm
          title={title}
          description={description}
          status={status}
          priority={priority}
          category={category}
          dueDate={dueDate}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onCategoryChange={setCategory}
          onDueDateChange={setDueDate}
          onSubmit={createTask}
        />

        <section className="task-toolbar">
          <form className="task-search" onSubmit={searchTasks}>
            <input
              type="search"
              placeholder="Search tasks by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="task-filters">
            <select value={filterStatus} onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}>
              <option value="">All status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select value={filterPriority} onChange={(e) => {
              setFilterPriority(e.target.value);
              setPage(1);
            }}>
              <option value="">All priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select value={filterCategory} onChange={(e) => {
              setFilterCategory(e.target.value);
              setPage(1);
            }}>
              <option value="">All category</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
            <button type="button" onClick={clearFilters}>Clear</button>
          </div>
        </section>

        <div className="task-list">
          {loading ? (
            <p className="empty">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty">No tasks found</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>

        <div className="task-pagination">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={pagination.page <= 1 || loading}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages} · {pagination.total} tasks
          </span>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={pagination.page >= pagination.totalPages || loading}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
