<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { Icon } from '@iconify/vue'
import { useTable } from '@/composables/helpers/useTable'
import ConfirmModal from '@/components/shared/modals/ConfirmModal.vue'
import { useGetCars } from '@/composables/api/cars/useGetCars'
import { useDeleteCar } from '@/composables/api/cars/useDeleteCar'
import { getUploadUrl } from '@/utils/getUploadUrl'

const { data, getCars, processing, query, refresh, debouncedSearch } = useGetCars()
const { deleteCar } = useDeleteCar()

const { headers, loadItems } = useTable(
  [
    {
      title: 'Image',
      align: 'start',
      sortable: false,
      key: 'image',
      width: '50px'
    },
    {
      title: 'Name',
      align: 'start',
      sortable: false,
      key: 'name'
    },
    { title: 'year', key: 'year', align: 'start' },
    { title: 'make', key: 'make', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false }
  ],
  query,
  () => {
    getCars()
  }
)
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4 d-flex justify-end">
        <v-btn class="mb-2" color="primary" flat :to="{ name: 'Cars.Create' }"> + New Car </v-btn>
      </div>
      <UiParentCard title="Cars">
        <v-data-table-server
          v-model:items-per-page="query.perPage"
          :page="query.page"
          :headers="headers"
          :items="data?.results"
          :items-length="data?.count || 0"
          :loading="processing"
          item-value="name"
          :search="query.search"
          @update:options="loadItems"
        >
          <template v-slot:top>
            <v-text-field
              v-model.lazy="debouncedSearch"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              hide-details
              single-line
              variant="outlined"
              density="compact"
              style="max-width: 300px"
            >
            </v-text-field>
          </template>
          <template v-slot:item.image="{ item }"
            ><v-img
              height="30px"
              width="60px"
              :src="getUploadUrl(item.image?.thumbnailUrl)"
              aspect-ratio="16/9"
              cover
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-end ga-2">
              <v-btn icon flat size="sm" :to="{ name: 'Cars.Edit', params: { id: item.id } }">
                <Icon
                  icon="material-symbols:edit"
                  height="22"
                  width="22"
                  @click="() => {}"
                  class="text-primary cursor-pointer"
                />
              </v-btn>
              <ConfirmModal message="Delete Car?" :on-confirm="() => deleteCar(item?.id, refresh)">
                <template v-slot:activaor="{ props }">
                  <v-btn icon flat size="sm" v-bind="props">
                    <Icon
                      icon="mdi:trash"
                      height="22"
                      width="22"
                      @click="() => {}"
                      class="text-primary cursor-pointer"
                    />
                  </v-btn>
                </template>
              </ConfirmModal>
            </div>
          </template>
        </v-data-table-server>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
