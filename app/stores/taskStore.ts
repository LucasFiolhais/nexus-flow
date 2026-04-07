import { defineStore } from 'pinia'
import type { Column, Task } from '../types/kanban'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    columns: [
      { title: 'To do', tasks: [] },
      { title: 'In Progress', tasks: [] },
      { title: 'Done', tasks: [] }
    ] as Column[],

    searchQuery: '',
    filterPriority: 'all' as 'all' | 'low' | 'medium' | 'high'
  }),

  getters: {
    filteredColumns: (state) => {
      const query = state.searchQuery.toLowerCase().trim()

      return state.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => {
          const matchesSearch = task.title.toLowerCase().includes(query)
          const matchesPriority =
            state.filterPriority === 'all' || task.priority === state.filterPriority
          return matchesSearch && matchesPriority
        })
      }))
    }
  },

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
    },

    moveTask(taskId: number, newColumnTitle: string) {
      let taskToMove: Task | null = null

      this.columns.forEach((col) => {
        const index = col.tasks.findIndex((t) => t.id === taskId)
        if (index !== -1) {
          taskToMove = col.tasks.splice(index, 1)[0] as Task
        }
      })

      if (taskToMove) {
        const targetCol = this.columns.find((col) => col.title === newColumnTitle)
        if (targetCol) {
          targetCol.tasks.push(taskToMove)
        }
      }
    }
  },

  persist: true
})
