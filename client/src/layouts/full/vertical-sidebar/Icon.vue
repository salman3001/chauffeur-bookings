<script setup lang="ts">
import type { Menu } from './sidebarItem'

const props = defineProps<{ item: Menu; level: number }>()
</script>

<template>
  <template v-if="level > 0">
    <component :is="item" size="14" stroke-width="1.5" class="iconClass"></component>
  </template>
  <template v-else>
    <component :is="item" size="20" stroke-width="1.5" class="iconClass"></component>
  </template>
</template>
