import { useState, type FormEvent } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [input, setInput] = useState("");

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="task-input"
        />
        <button type="submit" className="add-button">
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">タスクはありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </label>
              <button onClick={() => deleteTask(task.id)} className="delete-button">
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
