<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useGetUsers } from '@/composables/api/users/useGetUsers'
import type { ReadonlyHeaders } from '@/types/interfaces/Vuetify'

const { data, getUsers, processing, query } = useGetUsers()

const headers: ReadonlyHeaders = [
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'firstName',
    value: (item) => `${item?.firstName} ${item?.lastName}`
  },
  { title: 'Email', key: 'email', align: 'start' },
  { title: 'Phone', key: 'phone', align: 'center' },
  { title: 'User Type', key: 'userType', align: 'center' },
  { title: 'Actions', align: 'end' }
]

function loadItems({ page, itemsPerPage, sortBy }) {
  ;(query.page = page), (query.perPage = itemsPerPage)
  getUsers()
  //   loading.value = true
  //   FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
  //     serverItems.value = items
  //     totalItems.value = total
  //     loading.value = false
  //   })
}
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4 d-flex justify-end">
        <VBtn color="primary" flat text="Add User" />
      </div>
      <UiParentCard title="users">
        <v-data-table-server
          v-model:items-per-page="query.perPage"
          :headers="headers"
          :items="data?.results"
          :items-length="data?.count"
          :loading="processing"
          item-value="name"
          @update:options="loadItems"
        ></v-data-table-server>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
