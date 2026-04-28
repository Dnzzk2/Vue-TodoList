import { reactive, watch } from 'vue'
import type { Todo, FilterStatus, FilterPriority } from './types'

const STORAGE_KEY = 'vue-todo-store'

interface StoreState {
  todos: Todo[]
  filter: FilterStatus
  priorityFilter: FilterPriority
}

function loadFromStorage(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { todos: [], filter: 'all', priorityFilter: 'all' }
    const parsed = JSON.parse(raw)
    parsed.todos = parsed.todos.map((t: Todo) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }))
    return {
      todos: parsed.todos ?? [],
      filter: parsed.filter ?? 'all',
      priorityFilter: parsed.priorityFilter ?? 'all',
    }
  } catch {
    return { todos: [], filter: 'all', priorityFilter: 'all' }
  }
}

function saveToStorage(state: StoreState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const store = reactive<StoreState>(loadFromStorage())

watch(
  () => ({ ...store }),
  (state) => saveToStorage(state),
  { deep: true },
)