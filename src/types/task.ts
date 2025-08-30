export interface Task {
  id: number;
  title: string;
  createdAt: string;   
  completedAt?: string;
  isCompleted: boolean;
}