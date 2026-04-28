export type Priority = 'high' | 'medium' | 'low'
export interface Todo {
  id: number
  text: string
  completed: boolean
  priority: Priority
  createdAt: Date
  archivedAt?: number
}
export type FilterStatus = 'all' | 'active' | 'completed'
export type FilterPriority = 'all' | Priority