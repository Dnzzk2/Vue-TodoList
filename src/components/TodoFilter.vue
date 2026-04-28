<script setup lang="ts">
import type { Priority } from '@/lib/types'
import { priorityList, statusOptions } from '@/lib/constants'

const filter = defineModel<'all' | 'active' | 'completed'>('filter', { required: true })
const priorityFilter = defineModel<'all' | Priority>('priorityFilter', { required: true })

const props = defineProps<{ hasCompleted: boolean }>()

const emit = defineEmits<{
  archive: []
}>()
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
    <div class="right-group">
      <button
        v-if="hasCompleted && (filter === 'all' || filter === 'completed')"
        class="archive-btn"
        title="归档所有已完成任务"
        @click="emit('archive')"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
          ></path>
        </svg>
        归档
      </button>
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
  flex-wrap: wrap;
  gap: 4px;
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
  white-space: nowrap;
}

.status-btn:hover {
  color: #57534e;
  background: rgba(0, 0, 0, 0.03);
}

.status-btn.active {
  color: #1c1917;
  background: rgba(0, 0, 0, 0.05);
}

/* 右侧区域 */
.right-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.archive-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 0.72rem;
  font-weight: 500;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.archive-btn:hover {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.3);
  color: #4f46e5;
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

/* 移动端：折叠成两行 */
@media (max-width: 480px) {
  .archive-btn {
    display: none;
  }
}
</style>
