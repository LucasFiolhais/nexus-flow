import { defineStore } from 'pinia'
import type { Column, Task } from '../types/kanban'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    columns: [
      { title: 'To Do', tasks: [] },
      { title: 'In Progress', tasks: [] },
      { title: 'Done', tasks: [] }
    ] as Column[]
  }),

  actions: {
    addTaskToColumn(columnTitle: string, task: Task) {
      const column = this.columns.find((col) => col.title === columnTitle)
      if (column) {
        column.tasks.push(task)
      }
    },

    removeTask(taskId: number) {
      this.columns.forEach((column) => {
        column.tasks = column.tasks.filter((task) => task.id !== taskId)
      })
    }
  },

  persist: true
})
