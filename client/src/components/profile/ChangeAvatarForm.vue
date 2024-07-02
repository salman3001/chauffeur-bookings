<script setup lang="ts">
import { useUpdateProfile } from '@/composables/api/profile/useUpdateProfile'
import { getUploadUrl } from '@/utils/getUploadUrl'
import DropZone from '../shared/form/DropZone.vue'
import { ref } from 'vue'

const { form, profile, updateProfile } = useUpdateProfile()
</script>
<template>
  <v-row class="d-flex mb-3" v-if="profile">
    <v-col cols="12" class="d-flex justify-center flex-column align-center">
      <div>
        <v-avatar size="150px" :image="getUploadUrl(profile?.avatar?.thumbnailUrl)"> </v-avatar>
      </div>
      <v-label class="font-weight-bold mt-4">My avatar</v-label>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Upload Your avatar</v-label>
      <DropZone
        :max="1"
        @change="
          (f) => {
            form.avatar = f[0]?.file
          }
        "
      />
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn
        color="primary"
        size="large"
        block
        flat
        @click="updateProfile"
        :disabled="form.processing"
        >Update</v-btn
      >
    </v-col>
  </v-row>
</template>
