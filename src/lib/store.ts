import { reactive, watch } from 'vue'
import type { Todo } from './types'

const STORAGE_KEY = 'vue-todo-store'

interface StoreState {
  todos: Todo[]
}

function loadFromStorage(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { todos: [] }
    const parsed = JSON.parse(raw)
    // 还原 Date 对象
    parsed.todos = parsed.todos.map((t: Todo) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }))
    return parsed
  } catch {
    return { todos: [] }
  }
}

function saveToStorage(state: StoreState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const store = reactive<StoreState>(loadFromStorage())

watch(
  () => store.todos,
  () => saveToStorage({ todos: store.todos }),
  { deep: true },
)
