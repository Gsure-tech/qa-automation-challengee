const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET = "my_jwt_secret";

app.use(cors());
app.use(bodyParser.json());

let items = [];
let id = 1;


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
}


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "P@zzword") {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});


app.get("/items", authenticateToken, (req, res) => {
  res.json(items);
});

app.post("/items", authenticateToken, (req, res) => {
  const { title, description } = req.body;
  const newItem = {
    id: id++,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", authenticateToken, (req, res) => {
  const itemId = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items[index] = {
      ...items[index],
      title,
      description,
      completed,
      updatedAt: new Date().toISOString(),
    };
    return res.json(items[index]);
  }
  return res.status(404).json({ message: "Item not found" });
});

app.delete("/items/:id", authenticateToken, (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const deleted = items.splice(index, 1);
    return res.json(deleted[0]);
  }
  return res.status(404).json({ message: "Item not found" });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
