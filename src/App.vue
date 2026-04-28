<script setup lang="ts">
import { useTodos } from './composables/useTodos'
import TodoInput from './components/TodoInput.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoList from './components/TodoList.vue'

const {
  filteredTodos,
  newTodo,
  selectPriority,
  filter,
  priorityFilter,
  addTodo,
  toggleTodo,
  deleteTodo,
} = useTodos()
</script>

<template>
  <main>
    <div class="background"></div>
    <div class="todo">
      <h1>Vue-TodoList</h1>
      <p>管理您的日常任务，保持高效</p>
      <TodoInput
        v-model:new-todo="newTodo"
        v-model:select-priority="selectPriority"
        @add="addTodo"
      />
      <TodoFilter
        v-model:filter="filter"
        v-model:priority-filter="priorityFilter"
      />
      <TodoList
        :todos="filteredTodos"
        @delete="deleteTodo"
        @toggle="toggleTodo"
      />
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
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style>
