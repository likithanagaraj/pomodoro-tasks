import { loadTask, saveTask } from "@/storage/task-storage";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

export function useTask() {
  const [tasks, settasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTask().then(settasks);
  }, []);

  useEffect(() => {
    saveTask(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    settasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTask = (id: number) => {
    settasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const updateTask = (id: number, title: string) => {
    settasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: title } : t))
    );
  };

  const deleteTask = (id: number) => {
    settasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, addTask, toggleTask, updateTask, deleteTask };
}
