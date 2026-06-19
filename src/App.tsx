import { useState, type FormEvent } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Board } from "./Board";

export const BOARDS = ["支援", "ファクトリー", "全体"] as const;
export type BoardName = (typeof BOARDS)[number];

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  board: BoardName;
}

function getToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState(getToday);
  const [board, setBoard] = useState<BoardName>("全体");

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false, dueDate, board }]);
    setInput("");
    setDueDate(getToday());
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <h1>タスクボード</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="task-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value as BoardName)}
          className="board-select"
        >
          {BOARDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <button type="submit" className="add-button">追加</button>
      </form>

      <div className="boards">
        {BOARDS.map((b) => (
          <Board
            key={b}
            name={b}
            tasks={tasks.filter((t) => t.board === b)}
            today={getToday()}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
