<script setup lang="ts">
import dummyCar from '@/assets/images/dummy-car.png'
import dummyAvatar from '@/assets/images/dummy-avatar.jpg'
import appConfig from '@/config/app.config'
import type { User } from '@/types/entities/user'

defineProps<{
  chauffeur: User
}>()
</script>

<template>
  <VCard variant="outlined" title="Hundai Sentra 2019">
    <VImg height="250px" cover :src="dummyCar" />

    <VCardText class="position-relative">
      <!-- User Avatar -->
      <VAvatar size="75" class="avatar-center" :image="dummyAvatar" />

      <!-- Title, Subtitle & Action Button -->
      <div class="d-flex justify-space-between flex-wrap pt-8">
        <div class="me-2 mb-2">
          <VCardTitle class="pa-0">{{ chauffeur?.firstName }} {{ chauffeur?.lastName }}</VCardTitle>
          <VCardTitle class="pa-0 text-primary"
            ><span v-html="appConfig.currency"></span>
            {{ chauffeur?.chauffeurProfile?.pricePerHour }}/h</VCardTitle
          >
        </div>
        <VBtn variant="tonal" color="primary">Book Now</VBtn>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}

.v-btn {
  transform: none;
}
</style>
