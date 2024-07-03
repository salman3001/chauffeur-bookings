<script setup lang="ts">
import { useUpdateProfile } from '@/composables/api/profile/useUpdateProfile'
import { getUploadUrl } from '@/utils/getUploadUrl'
import AvatarInput from '../shared/form/AvatarInput.vue'

const { form, profile, updateProfile } = useUpdateProfile()
</script>
<template>
  <v-row class="d-flex mb-3" v-if="profile">
    <v-col cols="12">
      <div>
        <v-label class="font-weight-bold mb-1">My Avatar</v-label>
      </div>
      <AvatarInput
        :url="getUploadUrl(profile?.avatar?.thumbnailUrl)"
        @image="
          (f) => {
            form.avatar = f
          }
        "
        size="200"
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
../shared/form/AvatarInput.vue
