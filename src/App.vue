<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from './lib/util'

type Priority = 'high' | 'medium' | 'low'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: Priority
  createdAt: Date
}

const priorityList: { value: Priority; label: string; color: string }[] = [
  { value: 'high', label: '高', color: '#ef4444' },
  { value: 'medium', label: '中', color: '#f59e0b' },
  { value: 'low', label: '低', color: '#6366f1' },
]

const todos = ref<Todo[]>([])
const newTodo = ref('')
const selectPriority = ref<Priority>('medium')
const filter = ref<'all' | 'active' | 'completed'>('all')

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return
  todos.value.unshift({
    id: Date.now(),
    text: newTodo.value,
    completed: false,
    priority: selectPriority.value,
    createdAt: new Date(),
  })

  newTodo.value = ''
}

function getPriorityColor(priority: Priority) {
  return priorityList.find((p) => p.value === priority)!.color
}

function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.completed = !todo.completed
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <main>
    <div class="background"></div>
    <div class="todo">
      <h1>Vue-TodoList</h1>
      <p>管理您的日常任务，保持高效</p>
      <div class="input-wrapper">
        <button class="add-btn" title="添加任务" @click="addTodo">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <input v-model="newTodo" type="text" placeholder="添加新任务..." @keyup.enter="addTodo" />
        <div class="priority">
          <button
            v-for="item in priorityList"
            :key="item.value"
            class="priority-flag"
            :class="{ active: selectPriority === item.value }"
            :title="item.label + '优先级'"
            @click="selectPriority = item.value"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 21V4"
                :stroke="selectPriority === item.value ? item.color : '#a8a29e'"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 4L19 4L15 9L19 14H4"
                :fill="selectPriority === item.value ? item.color : 'transparent'"
                :stroke="selectPriority === item.value ? item.color : '#a8a29e'"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="todo-title">
        <span>待办</span>
        <span>创建时间</span>
      </div>
      <div class="todo-list">
        <ul>
          <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
            <span
              class="priority-dot"
              :style="{ background: getPriorityColor(todo.priority) }"
            ></span>
            <button
              class="check-btn"
              :title="todo.completed ? '撤回' : '完成'"
              @click="toggleTodo(todo.id)"
            >
              <svg
                v-if="!todo.completed"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12L10 17L19 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 7H15C17.7614 7 20 9.23858 20 12C20 14.7614 17.7614 17 15 17H12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 4L4 7L7 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span class="todo-text">{{ todo.text }}</span>
            <span class="todo-date">{{ formatDate(todo.createdAt) }}</span>
            <button class="delete-btn" title="删除" @click="deleteTodo(todo.id)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100dvh;
  width: 100%;
  position: relative;
}

.background {
  position: absolute;
  z-index: 0;
  inset: 0;
  background-image:
    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 0;
  mask-image:
    repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
    repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
  -webkit-mask-image:
    repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
    repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}

.todo {
  position: relative;
  z-index: 1;
  padding-top: 140px;
  padding-bottom: 80px;
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.todo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #1c1917;
  margin-bottom: 4px;
}

.todo p {
  font-size: 0.875rem;
  color: #a8a29e;
  margin-bottom: 20px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 28px;
}

.todo input[type='text'] {
  width: 100%;
  padding: 10px 112px 10px 40px;
  font-size: 0.875rem;
  color: #1c1917;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  outline: none;
  transition: all 0.25s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

.todo input[type='text']::placeholder {
  color: #a8a29e;
  font-weight: 400;
}

.todo input[type='text']:hover {
  border-color: #d6d3d1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.todo input[type='text']:focus {
  border-color: #6366f1;
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.15),
    0 2px 12px rgba(99, 102, 241, 0.1);
}

.add-btn {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #a8a29e;
  transition: all 0.2s ease;
  padding: 0;
}

.add-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #6366f1;
}

.priority {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  display: flex;
  gap: 2px;
  align-items: center;
}

.priority-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.priority-flag:hover {
  background: rgba(0, 0, 0, 0.05);
}

.priority-flag.active {
  background: rgba(0, 0, 0, 0.06);
}

.priority-flag svg {
  transition: all 0.2s ease;
}

.todo-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #a8a29e;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e7e5e4;
  margin-bottom: 12px;
}

.todo-list ul {
  list-style: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.todo-list ul li {
  position: relative;
  padding: 10px 12px;
  font-size: 0.875rem;
  color: #1c1917;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.todo-list ul li:hover {
  border-color: #d6d3d1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.todo-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 4px;
}

.priority-dot {
  flex-shrink: 0;
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.85;
  margin-left: 6px;
}

.check-btn,
.delete-btn {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #a8a29e;
  transition: all 0.2s ease;
  padding: 0;
}

.check-btn {
  left: 8px;
}

.delete-btn {
  right: 8px;
}

.check-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #22c55e;
}

.todo-list ul li.completed .check-btn:hover {
  color: #f59e0b;
}

.delete-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #ef4444;
}

.todo-list ul li:hover .priority-dot {
  visibility: hidden;
}

.todo-list ul li:hover .check-btn {
  display: flex;
}

.todo-list ul li:hover .todo-date {
  visibility: hidden;
}

.todo-list ul li:hover .delete-btn {
  display: flex;
}

.todo-list ul li.completed .todo-text {
  text-decoration: line-through;
  color: #a8a29e;
}

.todo-date {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: #a8a29e;
  font-variant-numeric: tabular-nums;
}
</style>
