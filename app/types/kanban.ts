import type { st } from 'vue-router/dist/index-BzEKChPW.js'

export interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  dueDate?: string
}
export interface Column {
  title: string
  tasks: Task[]
}
