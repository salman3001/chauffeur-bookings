export interface Availability {
  sunday: AvailabilityByDay
  monday: AvailabilityByDay
  tuesday: AvailabilityByDay
  wednesday: AvailabilityByDay
  thursday: AvailabilityByDay
  friday: AvailabilityByDay
  saturday: AvailabilityByDay
}

interface AvailabilityByDay {
  available: boolean
  fullDay: boolean
  from: string | null
  to: string | null
}

const availabilityByDay: AvailabilityByDay = {
  available: false,
  fullDay: false,
  from: null,
  to: null
}

export const defaultAvailability: Availability = {
  sunday: availabilityByDay,
  monday: availabilityByDay,
  tuesday: availabilityByDay,
  wednesday: availabilityByDay,
  thursday: availabilityByDay,
  friday: availabilityByDay,
  saturday: availabilityByDay
}
