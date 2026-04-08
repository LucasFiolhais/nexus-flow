import type { st } from 'vue-router/dist/index-BzEKChPW.js'

export interface SubTask {
  id: number
  title: string
  isDone: boolean
}
export interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  dueDate?: string
  subtasks: SubTask[]
}
export interface Column {
  title: string
  tasks: Task[]
}
