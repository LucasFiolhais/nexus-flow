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
  //para mudar os dados
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
  //manter os dados mesmo após o refresh da página
  persist: true //é preicso o plugin 'pinia-plugin-persistedstate'
})
