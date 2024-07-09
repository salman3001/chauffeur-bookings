<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { useGetCars } from '@/composables/api/cars/useGetCars'
import { useUpdateChauffeur } from '@/composables/api/chauffeur/useUpdateChauffeur'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { onMounted } from 'vue'

const { form, chauffeurProfile, updateChauffeurProfile } = useUpdateChauffeur()
const { data, getCars, query } = useGetCars()

onMounted(() => {
  query.perPage = 1000
  getCars()
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="mb-4">
        <v-btn class="mb-2" color="primary" flat :to="{ name: 'Users.Index' }">
          <Icon icon="solar:arrow-left-line-duotone" height="25"></Icon>
        </v-btn>
      </div>
      <UiParentCard title="Update Chauffeur Profile">
        <v-row class="d-flex mb-3" v-if="chauffeurProfile">
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Assign Car</v-label>
            <v-select
              v-if="data?.results"
              v-model="form.carId"
              :error="form?.errors?.carId ? true : false"
              :error-messages="form?.errors?.carId?.errors"
              :items="data?.results"
              item-title="name"
              item-value="id"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-select>
          </v-col>
          <v-col cols="12" :md="6" :lg="4">
            <v-label class="font-weight-bold mb-1">Price per hour</v-label>
            <v-text-field
              type="number"
              v-model="form.pricePerHour"
              :error="form?.errors?.pricePerHour ? true : false"
              :error-messages="form?.errors?.pricePerHour?.errors"
              variant="outlined"
              density="compact"
              color="primary"
            ></v-text-field>
          </v-col>
        </v-row>
        <h6 class="text-h6">Availabilty</h6>
        <br />
        <v-table v-if="form.availability">
          <thead>
            <tr>
              <th class="text-left">Day</th>
              <th class="text-left">Available?</th>
              <th class="text-left">Full Day ?</th>
              <th class="text-left">Available From</th>
              <th class="text-left">Available Till</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.sunday"
                  :error="form?.errors?.availability?.sunday ? true : false"
                  :error-messages="form?.errors?.availability?.sunday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.sundayFullDay"
                  :error="form?.errors?.availability?.sundayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.sundayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.sundayFrom"
                  :error="form?.errors?.availability?.sundayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.sundayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.sundayTo"
                  :error="form?.errors?.availability?.sundayTo ? true : false"
                  :error-messages="form?.errors?.availability?.sundayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Monday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.monday"
                  :error="form?.errors?.availability?.monday ? true : false"
                  :error-messages="form?.errors?.availability?.monday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.mondayFullDay"
                  :error="form?.errors?.availability?.mondayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.mondayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.mondayFrom"
                  :error="form?.errors?.availability?.mondayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.mondayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.mondayTo"
                  :error="form?.errors?.availability?.mondayTo ? true : false"
                  :error-messages="form?.errors?.availability?.mondayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.tuesday"
                  :error="form?.errors?.availability?.tuesday ? true : false"
                  :error-messages="form?.errors?.availability?.tuesday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.tuesdayFullDay"
                  :error="form?.errors?.availability?.tuesdayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.tuesdayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.tuesdayFrom"
                  :error="form?.errors?.availability?.tuesdayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.tuesdayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.tuesdayTo"
                  :error="form?.errors?.availability?.tuesdayTo ? true : false"
                  :error-messages="form?.errors?.availability?.tuesdayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.wednesday"
                  :error="form?.errors?.availability?.wednesday ? true : false"
                  :error-messages="form?.errors?.availability?.wednesday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.wednesdayFullDay"
                  :error="form?.errors?.availability?.wednesdayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.wednesdayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.wednesdayFrom"
                  :error="form?.errors?.availability?.wednesdayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.wednesdayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.wednesdayTo"
                  :error="form?.errors?.availability?.wednesdayTo ? true : false"
                  :error-messages="form?.errors?.availability?.wednesdayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.thursday"
                  :error="form?.errors?.availability?.thursday ? true : false"
                  :error-messages="form?.errors?.availability?.thursday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.thursdayFullDay"
                  :error="form?.errors?.availability?.thursdayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.thursdayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.thursdayFrom"
                  :error="form?.errors?.availability?.thursdayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.thursdayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.thursdayTo"
                  :error="form?.errors?.availability?.thursdayTo ? true : false"
                  :error-messages="form?.errors?.availability?.thursdayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.friday"
                  :error="form?.errors?.availability?.friday ? true : false"
                  :error-messages="form?.errors?.availability?.friday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.fridayFullDay"
                  :error="form?.errors?.availability?.fridayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.fridayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.fridayFrom"
                  :error="form?.errors?.availability?.fridayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.fridayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.fridayTo"
                  :error="form?.errors?.availability?.fridayTo ? true : false"
                  :error-messages="form?.errors?.availability?.fridayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>
                <v-checkbox
                  v-model="form.availability.saturday"
                  :error="form?.errors?.availability?.saturday ? true : false"
                  :error-messages="form?.errors?.availability?.saturday?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="form.availability.saturdayFullDay"
                  :error="form?.errors?.availability?.saturdayFullDay ? true : false"
                  :error-messages="form?.errors?.availability?.saturdayFullDay?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                ></v-checkbox>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.saturdayFrom"
                  :error="form?.errors?.availability?.saturdayFrom ? true : false"
                  :error-messages="form?.errors?.availability?.saturdayFrom?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="form.availability.saturdayTo"
                  :error="form?.errors?.availability?.saturdayTo ? true : false"
                  :error-messages="form?.errors?.availability?.saturdayTo?.errors"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  placeholder="00:00:00"
                ></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-row class="d-flex mb-3" v-if="chauffeurProfile">
          <v-col cols="12" class="pt-0">
            <v-btn
              color="primary"
              size="large"
              block
              flat
              @click="updateChauffeurProfile"
              :disabled="form.processing"
              >Update
            </v-btn>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col></v-row
  >
</template>
