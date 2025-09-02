export interface Task {
  id: number;
  title: string;
  createdAt: string;   
  completedAt?: string;
  isCompleted: boolean;
}

export interface TaskItemProps {
  id: number;
  title: string;
  isCompleted: boolean;
  selected: boolean;
  editing: boolean;
  onToggle: (id: number) => void;
  onLongPress: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, name: string) => void;
  onCancel: () => void;
}