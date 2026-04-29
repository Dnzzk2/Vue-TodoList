<script setup lang="ts">
import type { Todo } from '@/lib/types'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import TodoItem from './TodoItem.vue'

const UNDO_WINDOW = 10_000

const props = defineProps<{ todos: Todo[] }>()

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 200)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const activeTodos = computed(() =>
  props.todos.filter((t) => !t.archivedAt || now.value - t.archivedAt < UNDO_WINDOW),
)

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  archive: [id: number]
  restore: [id: number]
}>()
</script>

<template>
  <div class="todo-list">
    <TransitionGroup name="todo" tag="ul">
      <TodoItem
        v-for="todo in activeTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
        @archive="emit('archive', $event)"
        @restore="emit('restore', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.todo-list ul {
  list-style: none;
  text-align: left;
  position: relative;
  padding: 0;
  list-style-type: none;
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