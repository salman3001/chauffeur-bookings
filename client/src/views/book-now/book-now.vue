<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import DateTimePicker from '@/components/shared/form/DateTimePicker.vue'
import { useGetAvailableChauffeur } from '@/composables/api/chauffeur/useGetAvailableChauffeur'
import 'flatpickr/dist/flatpickr.css'
import ChauffeurCard from '@/components/shared/ChauffeurCard.vue'

const { query, data, processing, getAvailableChauffeur, errors } = useGetAvailableChauffeur()
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Book Now">
        <v-row>
          <v-col cols="12" :md="6">
            <v-label class="mb-1">Select Date and time</v-label>
            <DateTimePicker
              v-model="query.dateTime"
              :error="errors?.dateTime?.errors ? true : false"
              :error-messages="errors?.dateTime?.errors"
              :config="{
                enableTime: true
              }"
            />
            {{ errors }}
          </v-col>

          <v-col cols="12" :md="6">
            <v-label class="mb-1">Duration in hours</v-label>
            <v-text-field v-model="query.duration" type="number" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              size="large"
              block
              flat
              @click="getAvailableChauffeur"
              :disabled="processing"
              >Search chauffeurs</v-btn
            >
          </v-col>
          <v-col v-if="data" cols="12">
            <v-row>
              <v-col cols="12">
                <span class="text-h6" v-if="data && data.length > 0">1 Result</span>
                <span class="text-h6" v-else
                  >No Result. Please change the date and duration hours</span
                >
              </v-col>
              <v-col v-for="chauffeur in data" cols="12" :sm="6" :md="4">
                <ChauffeurCard
                  :chauffeur="chauffeur"
                  :date-time="new Date(query.dateTime).toISOString()"
                  :duration="query.duration"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
