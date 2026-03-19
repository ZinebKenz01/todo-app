let tasks = [];
let nextId = 1;

function getAll() {
  return tasks;
}
function getById(id) {
  return tasks.find((t) => t.id === id);
}
function create(task) {
  task.id = nextId++;
  tasks.push(task);
  return task;
}
function update(id, data) {
  const t = tasks.find((t) => t.id === id);
  if (!t) return null;
  Object.assign(t, data);
  return t;
}
function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
module.exports = { getAll, getById, create, update, remove };
