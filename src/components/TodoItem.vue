<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Todo } from '@/lib/types'
import { getPriorityColor } from '@/lib/constants'
import { formatDate } from '@/lib/util'
import IconCheck from './icons/IconCheck.vue'
import IconUndo from './icons/IconUndo.vue'
import IconClose from './icons/IconClose.vue'
import IconArchive from './icons/IconArchive.vue'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  archive: [id: number]
  restore: [id: number]
}>()

const UNDO_WINDOW = 10_000

const now = ref(Date.now())
const itemRef = ref<HTMLElement | null>(null)
const isActionOpen = ref(false)
const isTouchMode = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
let mediaQueryList: MediaQueryList | null = null

function updateTouchMode() {
  if (!window.matchMedia) return
  mediaQueryList = window.matchMedia('(hover: none), (pointer: coarse)')
  isTouchMode.value = mediaQueryList.matches
}

function handleActionOpen(event: MouseEvent) {
  if (!isTouchMode.value) return
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  if (target.closest('button')) return
  isActionOpen.value = true
}

function handleClickOutside(event: Event) {
  if (!isTouchMode.value || !isActionOpen.value || !itemRef.value) return
  const target = event.target
  if (!(target instanceof Node)) return
  if (!itemRef.value.contains(target)) {
    isActionOpen.value = false
  }
}

function closeActionLayer() {
  if (isTouchMode.value) {
    isActionOpen.value = false
  }
}

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 200)

  updateTouchMode()
  if (mediaQueryList) {
    mediaQueryList.addEventListener('change', updateTouchMode)
  }
  document.addEventListener('pointerdown', handleClickOutside)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', updateTouchMode)
  }
  document.removeEventListener('pointerdown', handleClickOutside)
})

function isUndoable() {
  return !!props.todo.archivedAt && now.value - props.todo.archivedAt < UNDO_WINDOW
}

const undoProgress = computed(() => {
  if (!props.todo.archivedAt) return 0
  const elapsed = now.value - props.todo.archivedAt
  if (elapsed >= UNDO_WINDOW) return 0
  return (UNDO_WINDOW - elapsed) / UNDO_WINDOW
})
</script>

<template>
  <li
    ref="itemRef"
    :class="{ completed: todo.completed, archived: !!todo.archivedAt, 'actions-open': isActionOpen }"
    @click="handleActionOpen"
  >
    <!-- 撤销进度条 -->
    <div v-if="isUndoable()" class="undo-progress-bar">
      <div class="undo-progress-fill" :style="{ width: undoProgress * 100 + '%' }"></div>
    </div>

    <span class="priority-dot" :style="{ background: getPriorityColor(todo.priority) }"></span>
    <button
      class="check-btn"
      :title="todo.completed ? '撤回' : '完成'"
      @click="emit('toggle', todo.id); closeActionLayer()"
    >
      <IconCheck v-if="!todo.completed" />
      <IconUndo v-else />
    </button>
    <span class="todo-text">{{ todo.text }}</span>
    <span class="todo-date">{{ formatDate(todo.createdAt) }}</span>
    <button
      v-if="isUndoable()"
      class="restore-btn"
      title="撤销归档（可撤销10秒）"
      @click="emit('restore', todo.id); closeActionLayer()"
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
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    </button>
    <button
      v-else-if="todo.completed && !todo.archivedAt"
      class="archive-btn"
      title="归档"
      @click="emit('archive', todo.id); closeActionLayer()"
    >
      <IconArchive :size="13" />
    </button>
    <button class="delete-btn" title="删除" @click="emit('delete', todo.id); closeActionLayer()">
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
  margin-bottom: 6px;
  overflow: hidden;
}

li:hover {
  border-color: #d6d3d1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
}


/* 归档进度条 */
.undo-progress-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: rgba(99, 102, 241, 0.15);
  z-index: 1;
  border-radius: 0 0 8px 8px;
}

.undo-progress-fill {
  height: 100%;
  background: #6366f1;
  border-radius: 0 0 0 0;
  transition: width 0.2s linear;
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
  width: 7px;
  height: 7px;
  border-radius: 50%;
  opacity: 0.85;
  margin-left: 6px;
  transition: all 0.25s ease;
}

.check-btn,
.restore-btn,
.archive-btn,
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

.restore-btn {
  right: 42px;
}

.archive-btn {
  right: 42px;
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

.restore-btn:hover {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
}

.archive-btn:hover {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
}

.delete-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #ef4444;
}

li:hover .priority-dot,
li.actions-open .priority-dot {
  opacity: 0;
}

li:hover .check-btn,
li.actions-open .check-btn {
  opacity: 1;
  pointer-events: auto;
}

li:hover .todo-date,
li.actions-open .todo-date {
  opacity: 0;
}

li:hover .restore-btn,
li:hover .archive-btn,
li.actions-open .restore-btn,
li.actions-open .archive-btn {
  opacity: 1;
  pointer-events: auto;
}

li:hover .delete-btn,
li.actions-open .delete-btn {
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