<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useGetUsers } from '@/composables/api/users/useGetUsers'
import type { ReadonlyHeaders } from '@/types/interfaces/Vuetify'
import { UserType } from '@/utils/enums/UserType'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import useApiForm from '@/composables/api/useApiForm'

const { data, getUsers, processing, query } = useGetUsers()

const editDialog = ref(false)
const deleteDialog = ref(false)
const isEdited = ref(false)
const deleteId = ref(0)
const formTitle = computed(() => (isEdited ? 'New Item' : 'Edit Item'))

const initialForm = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  isActive: false,
  emailVerfied: false,
  userType: UserType.CUSTOMER
}

const form = useApiForm(initialForm)

function editItem(item: any) {
  isEdited.value = true

  for (const key in item) {
    // @ts-ignore
    form[key] = item[key]
  }

  form.firstName = item.firstName
  form.lastName = item.lastName
  form.email = item.email
  form.phone = item.phone
  form.isActive = item.isActive
  form.emailVerfied = item.emailVerfied
  form.userType = item.userType

  editDialog.value = true
}

function save() {
  if (isEdited.value) {
    console.log('edited', form)
    form.pacth(`/users/${form.id}`)

    //update here
  } else {
    //create new here
    console.log('new', form)
    form.post('/users')
  }
  close()
}

function close() {
  form.reset()
  isEdited.value = false
  editDialog.value = false
}

function deleteItem(item: any) {
  deleteId.value = item.id
  deleteDialog.value = true
}

function deleteItemConfirm() {
  //delete with delete id
  closeDelete()
}

function closeDelete() {
  deleteId.value = 0
  deleteDialog.value = false
}

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
  { title: 'Actions', key: 'actions', align: 'end' }
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
        <v-dialog v-model="editDialog" max-width="500px" @after-leave="close">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" variant="elevated" v-bind="props">
              + New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="form.firstName" label="First name"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="form.lastName" label="LastName"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field type="email" v-model="form.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      type="password"
                      v-model="form.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="form.phone" label="Phone"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <UiParentCard title="Users">
        <v-data-table-server
          v-model:items-per-page="query.perPage"
          :headers="headers"
          :items="data?.results"
          :items-length="data?.count || 0"
          :loading="processing"
          item-value="name"
          @update:options="loadItems"
        >
          <template v-slot:top>
            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
            <Icon
              icon="material-symbols:edit"
              height="22"
              width="22"
              @click="editItem(item)"
              class="text-primary cursor-pointer"
            />
            <Icon
              icon="mdi:trash"
              height="22"
              width="22"
              @click="deleteItem(item)"
              class="text-primary cursor-pointer"
            />
          </template>
        </v-data-table-server>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
