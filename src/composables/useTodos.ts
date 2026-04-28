import type { Priority } from '@/lib/types'
import { store } from '@/lib/store'
import { ref, computed } from 'vue'

export function useTodos() {
  const newTodo = ref('')
  const selectPriority = ref<Priority>('medium')
  const filter = ref<'all' | 'active' | 'completed'>('all')
  const priorityFilter = ref<'all' | Priority>('all')

  const filteredTodos = computed(() => {
    let result = store.todos

    if (filter.value === 'active') result = result.filter((t) => !t.completed)
    else if (filter.value === 'completed') result = result.filter((t) => t.completed)

    if (priorityFilter.value !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter.value)
    }

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

  return { todos: store.todos, filteredTodos, newTodo, selectPriority, filter, priorityFilter, addTodo, toggleTodo, deleteTodo }
}
