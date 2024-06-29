<script setup lang="ts">
import { useConfirmEmail } from '@/composables/api/auth/useConfirmEmail'
import Logo from '@/layouts/full/logo/Logo.vue'
import { onMounted } from 'vue'
const { confirmEmail } = useConfirmEmail()

onMounted(() => {
  confirmEmail()
})
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card elevation="10" class="px-sm-1 px-0 mx-auto" max-width="500">
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <Logo />
              </div>
              <div class="text-body-1 text-muted text-center mb-3">Confirming Email..</div>
              <div class="my-10 d-flex justify-center">
                <VProgressCircular color="primary" indeterminate size="80" />
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
