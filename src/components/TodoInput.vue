<script setup lang="ts">
import type { Priority } from '@/lib/types'
import { priorityList } from '@/lib/constants'
import IconPlus from './icons/IconPlus.vue'
import IconFlag from './icons/IconFlag.vue'

const newTodo = defineModel<string>('newTodo', { required: true })
const selectPriority = defineModel<Priority>('selectPriority', { required: true })
const emit = defineEmits<{ add: [] }>()
</script>

<template>
  <div class="input-wrapper">
    <button class="add-btn" title="添加任务" @click="emit('add')">
      <IconPlus />
    </button>
    <input v-model="newTodo" type="text" placeholder="添加新任务..." @keyup.enter="emit('add')" />
    <div class="priority">
      <button
        v-for="item in priorityList"
        :key="item.value"
        class="priority-flag"
        :class="{ active: selectPriority === item.value }"
        :title="item.label + '优先级'"
        @click="selectPriority = item.value"
      >
        <IconFlag
          :size="16"
          :filled="selectPriority === item.value"
          :fill-color="item.color"
          :stroke-color="selectPriority === item.value ? item.color : '#a8a29e'"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
  overflow: hidden;
}

.input-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.15),
    0 2px 12px rgba(99, 102, 241, 0.1);
}

.input-wrapper input[type='text'] {
  flex: 1;
  padding: 10px 8px;
  font-size: 0.875rem;
  color: #1c1917;
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
}


.input-wrapper input[type='text']::placeholder {
  color: #a8a29e;
  font-weight: 400;
}

.input-wrapper input[type='text']:focus {
  outline: none;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-left: 6px;
  flex-shrink: 0;
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
  display: flex;
  gap: 2px;
  align-items: center;
  padding-right: 6px;
  flex-shrink: 0;
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
</style>
