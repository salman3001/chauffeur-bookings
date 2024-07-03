<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useDeleteAllNotification } from '@/composables/api/notifications/useDeleteAllNotification'
import { useDeleteOneNotification } from '@/composables/api/notifications/useDeleteOneNotification'
import { useDeleteReadNotifications } from '@/composables/api/notifications/useDeleteReadNotification'
import { useGetNotifications } from '@/composables/api/notifications/useGetNotifications'
import { useMarkAsRead } from '@/composables/api/notifications/useMarkAsRead'
import { useMarkAsUnread } from '@/composables/api/notifications/useMarkAsUnread'
import { useTable } from '@/composables/helpers/useTable'
import {
  resolveNotifcationSubtitle,
  resolveNotifcationTitle,
  resolveNotificationIcon,
  resolveNotificationLink
} from '@/utils/notification.helpers'

import { VListItem } from 'vuetify/components'

const { data, getNotifications, processing, query } = useGetNotifications()
const { markAsRead } = useMarkAsRead()
const { markAsUnread } = useMarkAsUnread()
const { deleteOneNotification } = useDeleteOneNotification()
const { deleteReadNotifications } = useDeleteReadNotifications()
const { deleteAllNotification } = useDeleteAllNotification()

const { headers, loadItems } = useTable(
  [
    { title: 'Title', key: 'title', value: 'data.title', sortable: false },
    { title: 'Date', key: 'createdAt', sortable: false },
    { title: 'Read', key: 'readAt', sortable: false },
    { title: 'Action', key: 'actions', sortable: false }
  ],
  query,
  () => {
    getNotifications()
  }
)
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4 d-flex justify-end ga-2">
        <v-btn
          class="mb-2"
          color="primary"
          flat
          @click="() => deleteAllNotification(getNotifications)"
        >
          Delete All
        </v-btn>
        <v-btn
          class="mb-2"
          color="primary"
          flat
          @click="() => deleteReadNotifications(getNotifications)"
        >
          Delete Read
        </v-btn>
      </div>
      <UiParentCard title="Notifications">
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
          <!-- Date -->

          <template #item.createdAt="{ item }">
            {{ item?.createdAt }}
          </template>

          <!-- title  -->

          <template #item.title="{ item }">
            <div class="d-flex align-center ga-2 py-2">
              <VAvatar size="28" :variant="'tonal'">
                <VIcon :icon="resolveNotificationIcon(item)"></VIcon>
              </VAvatar>

              <RouterLink :to="resolveNotificationLink(item)">
                {{ resolveNotifcationTitle(item) }}
                <div class="text-grey-600">
                  {{ resolveNotifcationSubtitle(item) }}
                </div>
              </RouterLink>
            </div>
          </template>

          <template #item.readAt="{ item }">
            <VIcon
              size="22"
              :icon="item.readAt ? 'tabler-mail-opened' : 'tabler-mail'"
              :color="!item.readAt ? 'primary' : '#a8aaae'"
              :class="`${item.readAt ? 'visible-in-hover' : ''}`"
              class="mb-3"
            />
          </template>
          <!-- Actions -->

          <template #item.actions="{ item }">
            <v-btn color="primary" flat variant="tonal">
              <VIcon icon="tabler-dots-vertical" />
              <VMenu activator="parent">
                <VList>
                  <VListItem
                    prepend-icon="tabler-mail-opened"
                    value="view"
                    v-if="!item.readAt"
                    @click="
                      async () => {
                        await markAsRead(item.id)
                        await getNotifications()
                      }
                    "
                  >
                    Mark read</VListItem
                  >
                  <VListItem
                    prepend-icon="tabler-mail"
                    value="view"
                    v-if="item.readAt"
                    @click="
                      async () => {
                        await markAsUnread(item.id)
                        await getNotifications()
                      }
                    "
                  >
                    Mark unread</VListItem
                  >
                  <VListItem
                    prepend-icon="tabler-trash"
                    value="view"
                    @click="
                      async () => {
                        await deleteOneNotification(item.id)
                        await getNotifications()
                      }
                    "
                  >
                    Delete
                  </VListItem>
                </VList>
              </VMenu>
            </v-btn>
          </template>
        </v-data-table-server>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
