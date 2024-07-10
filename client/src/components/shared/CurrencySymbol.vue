<script setup lang="ts">
import appConfig from '@/config/app.config'
</script>
<template>
  <span v-html="appConfig.currency"></span>
</template>
