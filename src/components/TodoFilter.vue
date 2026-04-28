<script setup lang="ts">
import type { Priority } from '@/lib/types'
import { priorityList } from '@/lib/constants'

const filter = defineModel<'all' | 'active' | 'completed'>('filter', { required: true })
const priorityFilter = defineModel<'all' | Priority>('priorityFilter', { required: true })

const statusOptions: { value: 'all' | 'active' | 'completed'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
]
</script>

<template>
  <div class="filter-bar">
    <div class="status-filters">
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        :class="['status-btn', { active: filter === opt.value }]"
        @click="filter = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>
    <div class="priority-filters">
      <button
        class="priority-dot-btn"
        :class="{ active: priorityFilter === 'all' }"
        title="全部优先级"
        @click="priorityFilter = 'all'"
      >
        <span class="ring" style="--ring-color: #a8a29e"></span>
      </button>
      <button
        v-for="opt in priorityList"
        :key="opt.value"
        class="priority-dot-btn"
        :class="{ active: priorityFilter === opt.value }"
        :title="opt.label + '优先级'"
        @click="priorityFilter = opt.value"
      >
        <span class="ring" :style="{ '--ring-color': opt.color }"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
  margin-bottom: 6px;
}

.filter-bar:hover {
  border-color: #d6d3d1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 状态筛选 */
.status-filters {
  display: flex;
  gap: 2px;
}

.status-btn {
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #a8a29e;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.status-btn:hover {
  color: #57534e;
  background: rgba(0, 0, 0, 0.03);
}

.status-btn.active {
  color: #1c1917;
  background: rgba(0, 0, 0, 0.05);
}

/* 优先级圆环 */
.priority-filters {
  display: flex;
  gap: 2px;
  align-items: center;
}

.priority-dot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.priority-dot-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}

.ring {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--ring-color);
  background: transparent;
  transition: all 0.25s ease;
}

.priority-dot-btn.active .ring {
  background: var(--ring-color);
}
</style>
