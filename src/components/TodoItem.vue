<script setup lang="ts">
import type { Todo } from '@/lib/types'
import { getPriorityColor } from '@/lib/constants'
import { formatDate } from '@/lib/util'
import IconCheck from './icons/IconCheck.vue'
import IconUndo from './icons/IconUndo.vue'
import IconClose from './icons/IconClose.vue'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <li :class="{ completed: todo.completed }">
    <span class="priority-dot" :style="{ background: getPriorityColor(todo.priority) }"></span>
    <button
      class="check-btn"
      :title="todo.completed ? '撤回' : '完成'"
      @click="emit('toggle', todo.id)"
    >
      <IconCheck v-if="!todo.completed" />
      <IconUndo v-else />
    </button>
    <span class="todo-text">{{ todo.text }}</span>
    <span class="todo-date">{{ formatDate(todo.createdAt) }}</span>
    <button class="delete-btn" title="删除" @click="emit('delete', todo.id)">
      <IconClose />
    </button>
  </li>
</template>

<style scoped>
li {
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

li:hover {
  border-color: #d6d3d1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
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
  transition: all 0.25s ease;
}

.check-btn,
.delete-btn {
  display: flex;
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
  opacity: 0;
  pointer-events: none;
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

li.completed .check-btn:hover {
  color: #f59e0b;
}

.delete-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #ef4444;
}

li:hover .priority-dot {
  opacity: 0;
}

li:hover .check-btn {
  opacity: 1;
  pointer-events: auto;
}

li:hover .todo-date {
  opacity: 0;
}

li:hover .delete-btn {
  opacity: 1;
  pointer-events: auto;
}

li.completed .todo-text {
  text-decoration: line-through;
  color: #a8a29e;
}

.todo-date {
  flex-shrink: 0;
  font-size: 0.7rem;
  color: #78716c;
  font-variant-numeric: tabular-nums;
  background: rgba(0, 0, 0, 0.03);
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.02em;
  transition: opacity 0.2s ease;
}
</style>
