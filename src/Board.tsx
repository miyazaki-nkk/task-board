import type { Task } from "./App";

interface BoardProps {
  name: string;
  tasks: Task[];
  today: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function duePriority(task: Task, today: string): number {
  if (task.completed) return 2;
  if (task.dueDate < today) return 0;  // 期限切れ
  if (task.dueDate === today) return 0; // 今日まで
  return 1; // 未来
}

function sortTasks(tasks: Task[], today: string): Task[] {
  return [...tasks].sort((a, b) => {
    const pa = duePriority(a, today);
    const pb = duePriority(b, today);
    if (pa !== pb) return pa - pb;
    return a.dueDate.localeCompare(b.dueDate);
  });
}

function dueLabel(dueDate: string, today: string): { text: string; className: string } {
  if (dueDate < today) return { text: `${dueDate}（期限切れ）`, className: "due-overdue" };
  if (dueDate === today) return { text: `${dueDate}（今日）`, className: "due-today" };
  return { text: dueDate, className: "due-future" };
}

export function Board({ name, tasks, today, onToggle, onDelete }: BoardProps) {
  const sorted = sortTasks(tasks, today);

  return (
    <div className="board">
      <h2 className="board-title">{name}</h2>
      {sorted.length === 0 ? (
        <p className="empty-message">タスクなし</p>
      ) : (
        <ul className="task-list">
          {sorted.map((task) => {
            const due = dueLabel(task.dueDate, today);
            return (
              <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                  />
                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    <span className={`task-due ${due.className} ${task.completed ? "completed" : ""}`}>
                      {due.text}
                    </span>
                  </div>
                </label>
                <button onClick={() => onDelete(task.id)} className="delete-button">
                  削除
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
