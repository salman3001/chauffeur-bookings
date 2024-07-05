<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import AvatarInput from '@/components/shared/form/AvatarInput.vue'
import { useEditCar } from '@/composables/api/cars/useEditCar'
import { getUploadUrl } from '@/utils/getUploadUrl'
import { Icon } from '@iconify/vue/dist/iconify.js'

const { form, createCar, car } = useEditCar()
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4">
        <v-btn class="mb-2" color="primary" flat :to="{ name: 'Cars.Index' }">
          <Icon icon="solar:arrow-left-line-duotone" height="25"></Icon>
        </v-btn>
      </div>
      <UiParentCard title="Edit Car">
        <v-row class="d-flex mb-3">
          <v-col cols="12">
            <div>
              <v-label class="font-weight-bold mb-1">Image</v-label>
            </div>
            <AvatarInput
              :url="getUploadUrl(car?.image?.thumbnailUrl)"
              @image="
                (f) => {
                  form.image = f
                }
              "
              size="200"
            />
          </v-col>
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
              >Update</v-btn
            >
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col></v-row
  >
</template>
