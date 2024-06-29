<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue'
/* Login form */
import appConfig from '@/config/app.config'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'
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
              <div class="text-body-1 text-muted text-center mb-3">
                Forgot password? Please enter your email to recieve password reset link
              </div>
              <ForgotPasswordForm />
              <h6
                class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3"
              >
                New to {{ appConfig.appName }}?
                <RouterLink
                  :to="{ name: 'Register' }"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Create an account</RouterLink
                >
              </h6>
              <h6
                class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3"
              >
                Already have account?
                <RouterLink
                  :to="{ name: 'Login' }"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Login</RouterLink
                >
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
