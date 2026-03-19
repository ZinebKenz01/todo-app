const Task = require("../models/Task");

function ValiderTask(data) {
  if (!data.title || typeof data.title !== "string") {
    return 'Le chamos "title" est requis et doit être une chaîne de caractères.';
  }
  if (data.completed === undefined || typeof data.completed !== "boolean") {
    return 'Le champ "completed" est requis et doit être un booléen (true/false).';
  }
  return null;
}
async function taskList(req, res, next) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}
async function taskById(req, res, next) {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    return res.json(task);
  } catch (error) {
    next({ status: 404, message: "Tache non trouvee" });
  }
}
async function createTask(req, res, next) {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      completed: req.body.completed,
    });
    return res.status(201).json(newTask);
  } catch (error) {
    const errMsg = ValiderTask(req.body);
    if (errMsg) {
      return next({ status: 400, message: errMsg });
    }
    next(error);
  }
}
async function updateTask(req, res, next) {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true, runValidators: true }
    );
    return res.json(updatedTask);
  } catch (error) {
    const errMsg = ValiderTask(req.body);
    if (errMsg) {
      return next({ status: 400, message: errMsg });
    } else {
      return next({ status: 404, message: "Tache non trouvee" });
    }
  }
}
async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await Task.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}
module.exports = {
  taskList,
  taskById,
  createTask,
  updateTask,
  deleteTask,
};
