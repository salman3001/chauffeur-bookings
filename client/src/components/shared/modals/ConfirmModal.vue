<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  message: string
  onConfirm: () => void
}>()
</script>
<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activaor" :props="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancle" @click="isActive.value = false"></v-btn>
          <v-btn
            text="Confirm"
            @click="
              () => {
                onConfirm()
                isActive.value = false
              }
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
