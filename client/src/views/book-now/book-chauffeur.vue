<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import LocationAutoComplete from '@/components/shared/form/LocationAutoComplete.vue'
import { useCreateBooking } from '@/composables/api/booking/useCreateBooking'
import appConfig from '@/config/app.config'

const { chauffeur, createBooking, form } = useCreateBooking()
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Book Now">
        <div>
          <v-list density="compact">
            <v-list-item
              title="Chauffeur"
              :subtitle="`${chauffeur?.firstName} ${chauffeur?.lastName}`"
            ></v-list-item>
            <v-list-item
              title="Ride"
              :subtitle="`${chauffeur?.chauffeurProfile?.car?.name}`"
            ></v-list-item>
            <v-list-item title="Price per hour"
              ><span v-html="appConfig.currency"></span
              >{{ chauffeur?.chauffeurProfile?.pricePerHour }}</v-list-item
            >
          </v-list>
        </div>
        <br />
        <div>
          <h5 class="text-h5">Date Time</h5>
          <br />
          <div v-if="form.pickupDateTime">
            Booking time : {{ new Date(form.pickupDateTime) }} <br />
            Duration: {{ form.bookedForHours }} hour
          </div>
        </div>
        <br />
        <div>
          <h5 class="text-h5">Address Information</h5>
          <br />
          <v-row>
            <v-col cols="12" :md="6">
              <div>
                <v-label class="mb-1"> Select pickup Location </v-label>
                <LocationAutoComplete
                  @selection="
                    (opt) => {
                      form.pickupCords = opt.coordinates
                    }
                  "
                  :error="
                    form.errors?.pickupCords?.x?.errors || form.errors?.pickupCords?.y?.errors
                  "
                />
              </div>
              <div>
                <v-label class="mb-1"> Pickup ddress </v-label>
                <v-text-field
                  v-model="form.pickupAddress"
                  :error="form.errors?.pickupAddress?.errors ? true : false"
                  :error-messages="form.errors?.pickupAddress?.errors"
                  variant="outlined"
                  color="primary"
                />
              </div>
            </v-col>
            <v-col cols="12" :md="6">
              <div>
                <v-label class="mb-1"> Select drop off Location </v-label>
                <LocationAutoComplete
                  @selection="
                    (opt) => {
                      form.dropoffCords = opt.coordinates
                    }
                  "
                  :error="
                    form.errors?.dropoffCords?.x?.errors || form.errors?.dropoffCords?.y?.errors
                  "
                />
              </div>
              <div>
                <v-label class="mb-1"> Drop off ddress </v-label>
                <v-text-field
                  v-model="form.dropoffAddress"
                  :error="form.errors?.dropoffAddress?.errors ? true : false"
                  :error-messages="form.errors?.dropoffAddress?.errors"
                  variant="outlined"
                  color="primary"
                />
              </div>
            </v-col>
          </v-row>
        </div>
        <div>
          <h5 class="text-h5">Total Price</h5>
          <br />
          <span v-html="appConfig.currency"></span
          >{{
            chauffeur?.chauffeurProfile?.pricePerHour
              ? (Number(chauffeur?.chauffeurProfile?.pricePerHour) * form.bookedForHours).toFixed(2)
              : 'error'
          }}
          ( <span v-html="appConfig.currency"></span
          >{{ chauffeur?.chauffeurProfile?.pricePerHour }} X {{ form.bookedForHours }}hours)
        </div>
        <br />
        <div>
          <h5 class="text-h5">Payment Method</h5>
          <br />
          <v-radio-group
            v-model="form.paymentMode"
            :error="form.errors?.paymentMode?.errors ? true : false"
            :error-messages="form.errors?.paymentMode?.errors"
          >
            <v-radio label="Online" value="online"></v-radio>
            <v-radio label="Cash" value="cod"></v-radio>
          </v-radio-group>
        </div>
        <br />
        <div class="d-flex w-100">
          <v-btn color="primary" class="w-100" flat @click="createBooking">Book Now</v-btn>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
