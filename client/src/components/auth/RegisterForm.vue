<script setup lang="ts">
import { useSignup } from '@/composables/api/auth/useSignup'
const { form, sigup } = useSignup({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: ''
})
</script>

<template>
  <v-row class="d-flex mb-3 gap-1">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Firt Name</v-label>
      <v-text-field
        v-model="form.firstName"
        :error="form?.errors?.firstName ? true : false"
        :error-messages="form?.errors?.firstName?.errors"
        variant="outlined"
        density="compact"
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Last Name</v-label>
      <v-text-field
        v-model="form.lastName"
        :error="form?.errors?.lastName ? true : false"
        :error-messages="form?.errors?.lastName?.errors"
        variant="outlined"
        density="compact"
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Email Address</v-label>
      <v-text-field
        v-model="form.email"
        :error="form?.errors?.email ? true : false"
        :error-messages="form?.errors?.email?.errors"
        variant="outlined"
        density="compact"
        type="email"
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
        type="password"
        density="compact"
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Phone</v-label>
      <v-text-field
        v-model="form.phone"
        :error="form?.errors?.phone ? true : false"
        :error-messages="form?.errors?.phone?.errors"
        variant="outlined"
        density="compact"
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" size="large" block flat @click="sigup" :disabled="form.processing"
        >Sign up</v-btn
      >
    </v-col>
  </v-row>
</template>
