import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername && !trimmedPassword) {
      setModalMessage("Username and Password are required.");
      setShowErrorModal(true);
      return;
    }
    if (!trimmedUsername) {
      setModalMessage("Username is required.");
      setShowErrorModal(true);
      return;
    }
    if (!trimmedPassword) {
      setModalMessage("Password is required.");
      setShowErrorModal(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: trimmedUsername,
        password: trimmedPassword,
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/tasks";
    } catch (err) {
      setModalMessage("Invalid credentials. Please try again.");
      setShowErrorModal(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Login Failed</h3>
            <p className="mb-4 text-sm text-gray-600">{modalMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
