<script setup lang="ts">
import { useForgetPassword } from '@/composables/api/auth/useForgetPassword'

const { form, reset } = useForgetPassword({ email: '' })
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Email</v-label>
      <v-text-field
        v-model="form.email"
        :error="form?.errors?.email ? true : false"
        :error-messages="form?.errors?.email?.errors"
        type="email"
        variant="outlined"
        density="compact"
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn color="primary" size="large" block flat @click="reset" :disabled="form.processing"
        >Get Reset Link</v-btn
      >
    </v-col>
  </v-row>
</template>
