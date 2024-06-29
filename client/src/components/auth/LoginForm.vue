<script setup lang="ts">
import { useLogin } from '@/composables/api/auth/useLogin'
import { watch } from 'vue'

const { form, login } = useLogin({ email: '', password: '' })
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
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Password</v-label>
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
      <div class="d-flex flex-wrap align-center">
        <div class="ml-sm-auto">
          <RouterLink
            :to="{ name: 'Forgot-Password' }"
            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
            >Forgot Password ?</RouterLink
          >
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn color="primary" size="large" block flat @click="login" :disabled="form.processing"
        >Sign in</v-btn
      >
    </v-col>
  </v-row>
</template>
