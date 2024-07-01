<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useCreateCar } from '@/composables/api/cars/useCreateCar'
import { useCreateUser } from '@/composables/api/users/useCreateUser'
import { UserType } from '@/utils/enums/UserType'
import { Icon } from '@iconify/vue/dist/iconify.js'

const { form, createCar } = useCreateCar()
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4">
        <v-btn class="mb-2" color="primary" flat :to="{ name: 'Users.Index' }">
          <Icon icon="solar:arrow-left-line-duotone" height="25"></Icon>
        </v-btn>
      </div>
      <UiParentCard title="Add Car">
        <v-row class="d-flex mb-3">
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Name</v-label>
            <v-text-field
              v-model="form.name"
              :error="form?.errors?.name ? true : false"
              :error-messages="form?.errors?.name?.errors"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Make</v-label>
            <v-text-field
              v-model="form.make"
              :error="form?.errors?.make ? true : false"
              :error-messages="form?.errors?.make?.errors"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Model</v-label>
            <v-text-field
              v-model="form.year"
              :error="form?.errors?.year ? true : false"
              :error-messages="form?.errors?.year?.errors"
              type="email"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-btn
              color="primary"
              size="large"
              block
              flat
              @click="createCar"
              :disabled="form.processing"
              >Create</v-btn
            >
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col></v-row
  >
</template>
