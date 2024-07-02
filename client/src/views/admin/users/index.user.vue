<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useGetUsers } from '@/composables/api/users/useGetUsers'
import { Icon } from '@iconify/vue'
import { useTable } from '@/composables/helpers/useTable'
import { useDeleteUser } from '@/composables/api/users/useDeleteUser'
import ConfirmModal from '@/components/shared/modals/ConfirmModal.vue'
import { getUploadUrl } from '@/utils/getUploadUrl'
import dummyAvatar from '@/assets/images/dummy-avatar.jpg'

const { data, getUsers, processing, query, refresh, debouncedSearch } = useGetUsers()
const { deleteUser } = useDeleteUser()

const { headers, loadItems } = useTable(
  [
    {
      title: 'Avatar',
      align: 'start',
      key: 'avatar',
      width: '10px'
    },
    {
      title: 'Name',
      align: 'start',
      key: 'firstName',
      value: (item) => `${item?.firstName} ${item?.lastName}`
    },
    { title: 'Email', key: 'email', align: 'start', sortable: false },
    { title: 'Phone', key: 'phone', align: 'center', sortable: false },
    { title: 'User Type', key: 'userType', align: 'center' },
    { title: 'Active', key: 'isActive', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false }
  ],
  query,
  () => {
    getUsers()
  }
)
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4 d-flex justify-end">
        <v-btn class="mb-2" color="primary" flat :to="{ name: 'Users.Create' }"> + New User </v-btn>
      </div>
      <UiParentCard title="Users">
        <v-data-table-server
          v-model:items-per-page="query.perPage"
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
          <template v-slot:item.avatar="{ item }">
            <v-avatar :image="getUploadUrl(item?.profile?.avatar?.thumbnailUrl, dummyAvatar)">
            </v-avatar>
          </template>
          <template v-slot:item.isActive="{ item }">
            <v-chip v-if="item.isActive" color="success" density="compact">Active</v-chip>
            <v-chip v-if="!item.isActive" color="error" density="compact">inactive</v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-end ga-2">
              <v-btn icon flat size="sm" :to="{ name: 'Users.Edit', params: { id: item.id } }">
                <Icon
                  icon="material-symbols:edit"
                  height="22"
                  width="22"
                  @click="() => {}"
                  class="text-primary cursor-pointer"
                />
              </v-btn>
              <ConfirmModal
                message="Delete User?"
                :on-confirm="() => deleteUser(item?.id, refresh)"
              >
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
