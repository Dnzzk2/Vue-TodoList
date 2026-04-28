<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 21V4"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M4 4L19 4L15 9L19 14H4"
      :fill="filled ? fillColor : 'transparent'"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number
    fillColor?: string
    strokeColor?: string
    filled?: boolean
  }>(),
  {
    size: 16,
    fillColor: '#a8a29e',
    strokeColor: '#a8a29e',
    filled: false,
  },
)
</script>
