<script setup lang="ts">
import { useAuth } from '@/composables/helpers/useAuth'
import type { Menu } from '../sidebarItem'
import { computed } from 'vue'
import { useNavlinkVisibility } from '@/composables/helpers/useNavlinkVisibility'

defineProps<{ item: Menu; level?: number }>()
const { isVisible } = useNavlinkVisibility()
</script>

<template>
  <v-list-subheader
    color="darkText"
    class="smallCap text-uppercase text-subtitle-2 mt-5 font-weight-bold mini-text"
    v-if="isVisible(item)"
    >{{ item?.header }}</v-list-subheader
  >
</template>
