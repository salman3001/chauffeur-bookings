<script setup lang="ts">
import UiParentCard from '../shared/UiParentCard.vue'
import { getUploadUrl } from '@/utils/getUploadUrl'
import dummyAvatar from '@/assets/images/dummy-avatar.jpg'
import appConfig from '@/config/app.config'
import { resolvePaymentMode } from '@/utils/Payments.helper'
import { resolveBookingStatus } from '@/utils/bookings.helper'
import { useTable } from '@/composables/helpers/useTable'
import { useGetBookings } from '@/composables/api/booking/useGetBookings'

const props = defineProps<{
  type: 'admin' | 'customer' | 'chauffeur'
}>()

const { getBookings, data, query, processing } = useGetBookings(props.type)
const { headers, loadItems } = useTable(
  [
    {
      title: 'id',
      align: 'start',
      sortable: false,
      key: 'id'
    },
    {
      title: 'Date',
      align: 'start',
      sortable: false,
      key: 'createdAt'
    },
    {
      title: 'Customer',
      align: 'start',
      sortable: false,
      key: 'customerProfile'
    },
    {
      title: 'Chauffeur',
      align: 'start',
      sortable: false,
      key: 'chauffeurProfile'
    },
    {
      title: 'Price/h',
      align: 'start',
      sortable: false,
      key: 'pricePerHour'
    },
    {
      title: 'Booking Hours',
      align: 'start',
      sortable: false,
      key: 'bookedForHours'
    },
    {
      title: 'Total',
      align: 'start',
      sortable: false,
      key: 'total'
    },
    {
      title: 'Payment Mode',
      align: 'start',
      sortable: false,
      key: 'paymentMode'
    },
    {
      title: 'Payment Status',
      align: 'start',
      sortable: false,
      key: 'paymentStatus'
    },
    {
      title: 'Actions',
      align: 'center',
      sortable: false,
      key: 'actions'
    }
  ],
  query,
  () => {
    getBookings()
  }
)
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="My Bookings">
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
          <!-- Order ID -->
          <template #item.id="{ item }">
            {{ item.id }}
          </template>

          <!-- Date -->

          <template #item.createdAt="{ item }">
            <div style="min-width: 150px">
              {{ new Date(item.cretaedAt).toLocaleString() }}
            </div>
          </template>

          <!-- Customers  -->

          <template #item.customerProfile="{ item }">
            <div class="d-flex align-center gap-x-3">
              <VAvatar
                size="34"
                :color="item?.customerProfile?.avatar?.thumbnailUrl ? 'primary' : ''"
                :variant="'tonal'"
              >
                <VImg
                  :src="getUploadUrl(item?.customerProfile?.avatar?.thumbnailUrl, dummyAvatar)"
                />
              </VAvatar>

              <div class="d-flex flex-column">
                <div class="text-body-1 font-weight-medium">
                  {{ item.customerProfile.user.firstName }} {{ item.customerProfile.user.lastName }}
                </div>
              </div>
            </div>
          </template>

          <!-- Chauffeur  -->

          <template #item.chauffeurProfile="{ item }">
            <div class="d-flex align-center gap-x-3">
              <div class="d-flex flex-column">
                <div class="text-body-1 font-weight-medium">
                  {{ item.chauffeurProfile.user.firstName }}
                  {{ item.chauffeurProfile.user.lastName }}
                </div>
              </div>
            </div>
          </template>

          <!--Ride Price per hour-->

          <template #item.pricePerHour="{ item }">
            <span v-html="appConfig.currency"></span>{{ item.pricePerHour }}
          </template>

          <!-- Booked for hours -->

          <template #item.bookedForHours="{ item }">
            {{ item.bookedForHours }}
          </template>

          <!-- Total -->
          <template #item.total="{ item }">
            <span v-html="appConfig.currency"></span>{{ item?.total }}
          </template>

          <!-- Payments -->

          <template #item.paymentStatus="{ item }">
            payment status
            <!-- <div
              :class="`text-${resolvePaymentStatus(item.payment.)?.color}`"
              class="font-weight-medium d-flex align-center gap-x-2"
            >
              <VIcon icon="tabler-circle-filled" size="10" />
              <div style="line-height: 22px">
                {{ resolvePaymentStatus(item?.paymentDetail?.paymentStatus)?.text }}
              </div>
            </div> -->
          </template>

          <!-- Status -->

          <template #item.status="{ item }">
            <VChip v-bind="resolveBookingStatus(item.status)" label size="small" />
          </template>

          <!-- Method -->
          <template #item.paymentMode="{ item }">
            <VChip v-bind="resolvePaymentMode(item?.paymentMode)" label size="small" />
          </template>

          <!-- Actions -->

          <template #item.actions="{ item }">
            <v-btn
              size="small"
              color="primary"
              flat
              :to="{ name: 'Bookings.Show', params: { id: item.id } }"
              >view
            </v-btn>
          </template>
        </v-data-table-server>
      </UiParentCard>
    </v-col></v-row
  >
</template>
