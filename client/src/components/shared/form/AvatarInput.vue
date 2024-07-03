<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  name?: string
  url?: string
  size?: string
  helperText?: string
}>()

const urlRef = ref(props.url)

const emit = defineEmits<{
  (e: 'image', image: File): void
}>()

const file = ref<File | null>(null)
const refInputEl = ref<null | HTMLInputElement>(null)

function previewSelectedImage() {
  if (
    file.value &&
    ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.value.type)
  ) {
    const reader = new FileReader()
    reader.readAsDataURL(file.value)
    reader.onload = function (e: any) {
      urlRef.value = e.target.result as string
    }

    emit('image', file.value)
  }
}

watch(
  () => props.url,
  () => {
    urlRef.value = props.url
  }
)
</script>

<template>
  <!-- 👉 Avatar -->
  <VAvatar
    rounded
    :size="size"
    :image="urlRef"
    class="me-4 cursor-pointer"
    @click="refInputEl?.click()"
  />
  <br />
  <br />
  <!-- 👉 Upload Photo -->
  <form class="d-flex flex-column justify-center gap-4">
    <div class="d-flex flex-wrap gap-4">
      <VBtn variant="tonal" color="primary" size="small" @click="refInputEl?.click()">
        <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
        <span class="d-none d-sm-block">Upload new photo</span>
      </VBtn>
      <input
        ref="refInputEl"
        type="file"
        :name="name"
        accept=".jpeg,.png,.jpg,GIF"
        hidden
        @change="
          (e) => {
            // @ts-ignore
            file = e.target?.files[0]
            previewSelectedImage()
          }
        "
      />
    </div>

    <p class="text-body-1 mb-0">{{ helperText || 'Allowed JPG, GIF or PNG. Max size of 2mb' }}</p>
  </form>
</template>
