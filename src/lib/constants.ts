import type { Priority } from './types'

export const priorityList: { value: Priority; label: string; color: string }[] = [
  { value: 'high', label: '高', color: '#ef4444' },
  { value: 'medium', label: '中', color: '#f59e0b' },
  { value: 'low', label: '低', color: '#6366f1' },
]

export function getPriorityColor(priority: Priority) {
  return priorityList.find((p) => p.value === priority)!.color
}
