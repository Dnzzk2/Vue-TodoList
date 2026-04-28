<script setup lang="ts">
import type { Todo } from '@/lib/types'
import TodoItem from './TodoItem.vue'

defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="todo-list">
    <TransitionGroup name="todo" tag="ul">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.todo-list ul {
  list-style: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

/* TransitionGroup 动画 */
.todo-enter-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.todo-leave-active {
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.todo-move {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.todo-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
}

.todo-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.todo-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.todo-leave-active {
  position: absolute;
  width: 100%;
}
</style>
