<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useCreateUser } from '@/composables/api/users/useCreateUser'
import { useEditUser } from '@/composables/api/users/useEditUser'
import { UserType } from '@/utils/enums/UserType'
import { Icon } from '@iconify/vue/dist/iconify.js'

const { form, createUser, user } = useEditUser()
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4">
        <v-btn class="mb-2" color="primary" flat :to="{ name: 'Users.Index' }">
          <Icon icon="solar:arrow-left-line-duotone" height="25"></Icon>
        </v-btn>
      </div>
      <UiParentCard title="Edit Users">
        <v-row class="d-flex mb-3" v-if="user">
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">First Name</v-label>
            <v-text-field
              v-model="form.firstName"
              :error="form?.errors?.firstName ? true : false"
              :error-messages="form?.errors?.firstName?.errors"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="6" :lg="4">
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
          <v-col cols="12" :md="6" :lg="4">
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
          <v-col cols="12" :md="6" :lg="4">
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
          <v-col cols="12" :md="6" :lg="4">
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
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">User Type</v-label>
            <v-select
              v-model="form.userType"
              :error="form?.errors?.userType ? true : false"
              :error-messages="form?.errors?.userType?.errors"
              :items="Object.values(UserType)"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-select>
          </v-col>
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Activate</v-label>
            <v-checkbox
              v-model="form.isActive"
              :error="form?.errors?.isActive ? true : false"
              :error-messages="form?.errors?.isActive?.errors"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Email Verified</v-label>
            <v-checkbox
              v-model="form.emailVerified"
              :error="form?.errors?.emailVerified ? true : false"
              :error-messages="form?.errors?.emailVerified?.errors"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-btn
              color="primary"
              size="large"
              block
              flat
              @click="createUser"
              :disabled="form.processing"
              >Update
            </v-btn>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col></v-row
  >
</template>
