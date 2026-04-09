import { defineStore } from 'pinia'
import type { Column, Task } from '../types/kanban'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    columns: [
      { title: 'To do', tasks: [] },
      { title: 'In Progress', tasks: [] },
      { title: 'Done', tasks: [] }
    ] as Column[],

    selectedTask: null as Task | null,
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
    },

    stats: (state) => {
      const allTasks = state.columns.flatMap((col) => col.tasks)

      const total = allTasks.length

      const completed =
        state.columns.find((col) => col.title.toUpperCase() === 'DONE')?.tasks.length || 0

      const pending = total - completed

      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

      return {
        total,
        completed,
        pending,
        percentage
      }
    }
  },

  actions: {
    selectTask(task: Task | null) {
      this.selectedTask = task
    },

    addTaskToColumn(columnTitle: string, task: Task) {
      const column = this.columns.find(
        (col) => col.title.toUpperCase() === columnTitle.toUpperCase()
      )
      if (column) {
        if (!task.subtasks) task.subtasks = []
        column.tasks.push(task)
      }
    },

    updateTask(updatedTask: Task) {
      this.columns.forEach((col) => {
        const index = col.tasks.findIndex((t) => t.id === updatedTask.id)
        if (index !== -1) {
          col.tasks[index] = { ...updatedTask }
        }
      })

      if (this.selectedTask?.id === updatedTask.id) {
        this.selectedTask = { ...updatedTask }
      }
    },

    removeTask(taskId: number) {
      this.columns.forEach((column) => {
        column.tasks = column.tasks.filter((task) => task.id !== taskId)
      })
      if (this.selectedTask?.id === taskId) this.selectedTask = null
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
        const targetCol = this.columns.find(
          (col) => col.title.toUpperCase() === newColumnTitle.toUpperCase()
        )
        if (targetCol) {
          targetCol.tasks.push(taskToMove)
        }
      }
    }
  },
  persist: true
})
