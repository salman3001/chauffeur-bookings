import useApiForm from '../useApiForm'
import { useRoute, useRouter } from 'vue-router'
import useApiGet from '../useApiGet'
import { onMounted } from 'vue'
import type { ChauffeurProfile } from '@/types/entities/chauffeurProfile'

export const useUpdateChauffeur = () => {
  const route = useRoute()
  const { data: chauffeurProfile, exec } = useApiGet<ChauffeurProfile>()

  const router = useRouter()

  const availability = {
    sunday: false,
    sundayFullDay: false,
    sundayFrom: '',
    sundayTo: '',
    monday: false,
    mondayFullDay: false,
    mondayFrom: '',
    mondayTo: '',
    tuesday: false,
    tuesdayFullDay: false,
    tuesdayFrom: '',
    tuesdayTo: '',
    wednesday: false,
    wednesdayFullDay: false,
    wednesdayFrom: '',
    wednesdayTo: '',
    thursday: false,
    thursdayFullDay: false,
    thursdayFrom: '',
    thursdayTo: '',
    friday: false,
    fridayFullDay: false,
    fridayFrom: '',
    fridayTo: '',
    saturday: false,
    saturdayFullDay: false,
    saturdayFrom: '',
    saturdayTo: ''
  }

  const form = useApiForm({
    carId: 0,
    pricePerHour: '',
    availability: availability
  })

  const updateChauffeurProfile = () => {
    form.pricePerHour = form?.pricePerHour?.toString()
    form.patch(
      `/chauffeur-profile/${route.params.id}/`,
      {},
      {
        onSucess() {
          router.push({ name: 'Users.Index' })
        }
      }
    )
  }

  onMounted(async () => {
    await exec(`/chauffeur-profile/${route.params.id}`)

    if (chauffeurProfile.value) {
      if (chauffeurProfile.value.availability) {
        form.assign(chauffeurProfile.value)
        form.carId = chauffeurProfile.value?.car?.id
      } else {
        form.assign({ ...chauffeurProfile.value, availability: availability })
      }
    }
  })

  return {
    form,
    updateChauffeurProfile,
    chauffeurProfile
  }
}
