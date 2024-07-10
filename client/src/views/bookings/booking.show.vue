<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useViewBooking } from '@/composables/api/booking/useViewBooking'
import appConfig from '@/config/app.config'
import { resolveBookingStatus } from '@/utils/bookings.helper'
import { getUploadUrl } from '@/utils/getUploadUrl'
import dummyAvatar from '@/assets/images/dummy-avatar.jpg'

const { data: booking, viewBookings } = useViewBooking()
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard v-if="booking" title="Booking Detail">
        <div class="d-flex justify-space-between align-center flex-wrap ga-4 mb-6">
          <div>
            <div class="d-flex ga-2 align-center mb-2 flex-wrap">
              <h5 class="text-h5">Booking #{{ booking?.id }}</h5>
              <VChip v-bind="resolveBookingStatus(booking.status)" label size="small" />
            </div>
            <div class="d-flex ga-2 align-center mb-2 flex-wrap">
              <h6 class="text-h6">Payment Status</h6>
              <VChip label size="small">Payment Status</VChip>
              <!-- <VChip
                v-bind="resolvePaymentStatus(booking)"
                label
                size="small"
              /> -->
            </div>

            <div class="text-body-1">
              {{ new Date(booking.createdAt).toLocaleString() }}
            </div>
          </div>
          <!-- <BookingStatusUpdate
            :booking="booking"
            booking-type="normal"
            :allowed-options="[BookingStatus.CANCLED, OrderStatus.COMPLETED]"
          /> -->
        </div>

        <VRow>
          <VCol cols="12" md="8">
            <!-- 👉 Order Details -->
            <VCard variant="outlined" class="mb-6">
              <VCardText>
                <div class="d-flex flex-wrap ga-4">
                  <div class="d-flex justify-center text-h5 align-center" style="flex-grow: 1">
                    {{ booking?.chauffeurProfile?.car?.name }} Hundai sentra 2017
                  </div>
                  <v-table density="compact">
                    <tbody>
                      <tr>
                        <td width="200px">Price per hour</td>
                        <td class="font-weight-medium">
                          <span v-html="appConfig.currency"></span>{{ booking.pricePerHour }}
                        </td>
                      </tr>
                      <tr>
                        <td>Booking Hours</td>
                        <td class="font-weight-medium">{{ booking.bookedForHours }}</td>
                      </tr>
                      <tr>
                        <td class="text-high-emphasis font-weight-medium">Total:</td>
                        <td class="font-weight-medium">
                          <span v-html="appConfig.currency"></span>{{ booking?.total }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
              </VCardText>
            </VCard>

            <!-- 👉 Address Information -->
            <VCard variant="outlined">
              <v-card-title class="text-h5">Address information</v-card-title>
              <VCardText>
                <div class="d-flex flex-column ga-1">
                  <div class="d-flex justify-space-between align-center">
                    <h6 class="text-h6">Pickup Address</h6>
                  </div>
                  <span>{{ booking.pickupAddress }} </span>
                  <span>{{ booking.pickupCords }} </span>
                </div>
                <br />
                <div class="d-flex flex-column ga-1">
                  <div class="d-flex justify-space-between align-center">
                    <h6 class="text-h6">Dropoff Address</h6>
                  </div>
                  <span>{{ booking.dropoffAddress }} </span>
                  <span>{{ booking.dropoffCords }} </span>
                </div>
              </VCardText>
            </VCard>
            <br />
            <!-- 👉 Booking Activity -->
            <VCard variant="outlined">
              <v-card-title class="text-h5">Booking Activities</v-card-title>
              <VCardText>
                <VTimeline
                  truncate-line="both"
                  line-inset="9"
                  align="start"
                  side="end"
                  line-color="primary"
                  density="compact"
                >
                  <VTimelineItem
                    v-for="(h, i) in booking?.history"
                    :key="i"
                    dot-color="primary"
                    size="x-small"
                  >
                    <div class="d-flex justify-space-between align-center">
                      <div class="app-timeline-title">
                        {{ h.event }}
                      </div>
                      <div class="app-timeline-meta">
                        {{ new Date(h?.dateTime).toLocaleString() }}
                      </div>
                    </div>
                    <p class="app-timeline-text mb-0 mt-3">
                      {{ h.detail }}
                    </p>
                  </VTimelineItem>
                </VTimeline>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="4">
            <!-- 👉 Customer Details  -->
            <VCard variant="outlined" class="mb-6">
              <VCardText class="d-flex flex-column ga-6">
                <h5 class="text-h5">Customer details</h5>

                <div class="d-flex align-center ga-3">
                  <VAvatar
                    size="34"
                    :color="booking?.customerProfile?.avatar?.thumbnailUrl ? 'primary' : ''"
                    :variant="'tonal'"
                  >
                    <VImg
                      :src="
                        getUploadUrl(booking?.customerProfile?.avatar?.thumbnailUrl, dummyAvatar)
                      "
                    />
                  </VAvatar>
                  <div>
                    <h6 class="text-h6">
                      {{ booking?.customerProfile?.user.firstName }}
                      {{ booking?.customerProfile?.user.lastName }}
                    </h6>
                    <div class="text-body-1">
                      Customer ID: #{{ booking?.customerProfile?.user.id }}
                    </div>
                  </div>
                </div>

                <div class="d-flex flex-column ga-1">
                  <div class="d-flex justify-space-between align-center">
                    <h6 class="text-h6">Contact Info</h6>
                  </div>
                  <span>{{ booking?.customerProfile?.user.email }}</span>
                  <span>Mobile: {{ booking?.customerProfile?.user.phone }}</span>
                </div>
              </VCardText>
            </VCard>
            <!-- 👉 Chauffeur Details  -->
            <VCard variant="outlined" class="mb-6">
              <VCardText class="d-flex flex-column ga-6">
                <h5 class="text-h5">Chauffeur details</h5>

                <div class="d-flex align-center ga-3">
                  <VAvatar
                    size="34"
                    :color="
                      booking?.chauffeurProfile?.user?.profile?.avatar?.thumbnailUrl
                        ? 'primary'
                        : ''
                    "
                    :variant="'tonal'"
                  >
                    <VImg
                      :src="
                        getUploadUrl(
                          booking?.chauffeurProfile?.user?.profile?.avatar?.thumbnailUrl,
                          dummyAvatar
                        )
                      "
                    />
                  </VAvatar>
                  <div>
                    <h6 class="text-h6">
                      {{ booking?.chauffeurProfile?.user?.firstName }}
                      {{ booking?.chauffeurProfile?.user?.lastName }}
                    </h6>
                    <div class="text-body-1">
                      Chauffeur ID: #{{ booking?.chauffeurProfile?.user?.id }}
                    </div>
                  </div>
                </div>

                <div class="d-flex flex-column ga-1">
                  <div class="d-flex justify-space-between align-center">
                    <h6 class="text-h6">Contact Info</h6>
                  </div>
                  <span>{{ booking?.customerProfile?.user.email }}</span>
                  <span>Mobile: {{ booking?.customerProfile?.user.phone }}</span>
                </div>
              </VCardText>
            </VCard>
            <!-- 👉 Payment Details  -->
            <VCard variant="outlined" class="mb-6">
              <VCardText class="d-flex flex-column ga-6">
                <h5 class="text-h5">Payment details</h5>
                <div class="d-flex flex-column ga-1">
                  <div class="d-flex justify-space-between align-center">
                    <h6 class="text-h6">Payment Mode</h6>
                  </div>
                  <span>{{ booking?.paymentMode }}</span>
                </div>
                <div class="d-flex flex-column ga-1">
                  <div class="d-flex justify-space-between align-center">
                    <h6 class="text-h6">Other details</h6>
                  </div>
                  <span>other detail 1</span>
                  <span>other detail 2</span>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </UiParentCard></v-col
    ></v-row
  >
</template>
