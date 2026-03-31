import { defineStore } from 'pinia'
import type { Column, Task } from '../types/kanban'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    columns: [
      {
        title: 'To Do',
        tasks: []
      },
      {
        title: 'In Progress',
        tasks: []
      },
      {
        title: 'Done',
        tasks: []
      }
    ] as Column[]
  }),
  //mudar os dados
  actions: {
    addTask(columnTitle: string, newTask: Task) {
      const column = this.columns.find((column) => column.title === columnTitle)
      if (column) {
        column.tasks.push(newTask)
      }
    },

    removeTask(taskId: number) {
      this.columns.forEach((column) => {
        column.tasks = column.tasks.filter((task) => task.id !== taskId)
      })
    }
  },
  // para manter os dados
  persist: true
})
