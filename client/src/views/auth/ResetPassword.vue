<script setup lang="ts">
import { usePasswordReset } from '@/composables/api/auth/usePasswordReset'
import Logo from '@/layouts/full/logo/Logo.vue'
import { onMounted } from 'vue'

const { resetPassword, form } = usePasswordReset({ password: '' })
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
              <div class="text-body-1 text-muted text-center mb-3">Reset Password</div>

              <VRow class="my-10 d-flex justify-center">
                <v-col cols="12">
                  <v-label class="font-weight-bold mb-1">New Password</v-label>
                  <v-text-field
                    v-model="form.password"
                    :error="form?.errors?.password ? true : false"
                    :error-messages="form?.errors?.password?.errors"
                    variant="outlined"
                    density="compact"
                    type="password"
                    color="primary"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    flat
                    @click="resetPassword"
                    :disabled="form.processing"
                    >Reset Password</v-btn
                  >
                </v-col>
              </VRow>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
