import { ref } from 'vue'
import type { FilterStatus, FilterPriority, Priority } from '@/lib/types'
import { store } from '@/lib/store'
import { computed } from 'vue'

const UNDO_WINDOW = 10_000

export function useTodos() {
  const newTodo = ref('')
  const selectPriority = ref<Priority>('medium')

  const filteredTodos = computed(() => {
    let result = store.todos

    if (store.filter === 'active') result = result.filter((t) => !t.completed)
    else if (store.filter === 'completed') result = result.filter((t) => t.completed)

    if (store.priorityFilter !== 'all') result = result.filter((t) => t.priority === store.priorityFilter)

    return result
  })

  function addTodo() {
    const text = newTodo.value.trim()
    if (!text) return
    store.todos.unshift({
      id: Date.now(),
      text,
      completed: false,
      priority: selectPriority.value,
      createdAt: new Date(),
    })
    newTodo.value = ''
  }

  function toggleTodo(id: number) {
    const todo = store.todos.find((t) => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  function deleteTodo(id: number) {
    store.todos = store.todos.filter((t) => t.id !== id)
  }

  function archiveTodo(id: number) {
    const todo = store.todos.find((t) => t.id === id)
    if (todo) todo.archivedAt = Date.now()
  }

  function archiveAllCompleted() {
    store.todos.forEach((t) => {
      if (t.completed) t.archivedAt = Date.now()
    })
  }

  function restoreTodo(id: number) {
    const todo = store.todos.find((t) => t.id === id)
    if (todo) delete todo.archivedAt
  }

  function isUndoable(id: number): boolean {
    const todo = store.todos.find((t) => t.id === id)
    if (!todo?.archivedAt) return false
    return Date.now() - todo.archivedAt < UNDO_WINDOW
  }

  return {
    todos: store.todos,
    filteredTodos,
    newTodo,
    selectPriority,
    filter: computed({
      get: () => store.filter,
      set: (v: FilterStatus) => (store.filter = v),
    }),
    priorityFilter: computed({
      get: () => store.priorityFilter,
      set: (v: FilterPriority) => (store.priorityFilter = v),
    }),
    addTodo,
    toggleTodo,
    deleteTodo,
    archiveTodo,
    archiveAllCompleted,
    restoreTodo,
    isUndoable,
  }
}