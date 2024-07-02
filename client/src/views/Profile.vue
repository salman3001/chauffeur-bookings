<script setup lang="ts">
import ChangeAvatarForm from '@/components/profile/ChangeAvatarForm.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { ref } from 'vue'

const tabs = ref('avatar')
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard>
        <v-tabs v-model="tabs" color="primary">
          <v-tab value="avatar">Profile</v-tab>
          <v-tab value="notifications">Notifcations</v-tab>
        </v-tabs>
        <br />
        <v-tabs-window v-model="tabs">
          <v-tabs-window-item value="avatar">
            <ChangeAvatarForm />
          </v-tabs-window-item>
          <v-tabs-window-item value="notifications"> notifications </v-tabs-window-item>
        </v-tabs-window>
      </UiParentCard>
    </v-col></v-row
  >
</template>
