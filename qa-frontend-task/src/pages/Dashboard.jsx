import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedDesc = form.description.trim();

    if (!trimmedTitle || !trimmedDesc) {
      setErrorMessage("Both title and description are required.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/items/${editingId}`,
          {
            title: trimmedTitle,
            description: trimmedDesc,
            completed: form.completed,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/items",
          {
            title: trimmedTitle,
            description: trimmedDesc,
            completed: form.completed,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setForm({ title: "", description: "", completed: false });
      setEditingId(null);
      setErrorMessage("");
      setShowSuccessModal(true);

      setTimeout(() => setShowSuccessModal(false), 2000);
      fetchTasks();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (taskToDelete) {
      try {
        await axios.delete(`http://localhost:5000/items/${taskToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaskToDelete(null);
        setShowDeleteModal(false);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        {errorMessage && (
          <p className="text-red-600 mb-2 font-medium">{errorMessage}</p>
        )}
        <input
          type="text"
          placeholder="Title"
          className="mr-2 p-2 border rounded w-1/4"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="mr-2 p-2 border rounded w-1/2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setForm(task) || setEditingId(task.id)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(task)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Delete Task</h3>
            <p className="mb-4 text-sm text-gray-600">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h3 className="text-green-600 text-lg font-semibold mb-2">
              Success
            </h3>
            <p className="text-sm text-gray-700">
              Task {editingId ? "updated" : "added"} successfully!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
