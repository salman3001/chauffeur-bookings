export interface Availability {
  sunday: typeof daySlots;
  moday: typeof daySlots;
  tuesday: typeof daySlots;
  wednesday: typeof daySlots;
  thursday: typeof daySlots;
  friday: typeof daySlots;
  saturday: typeof daySlots;
}

const daySlots = [
  {
    name: ' slot1',
    time: '00:00-01:00',
    available: false,
  },
  {
    name: ' slot2',
    time: '01:00-02:00',
    available: false,
  },
  {
    name: ' slot3',
    time: '02:00-03:00',
    available: false,
  },
  {
    name: ' slot4',
    time: '03:00-04:00',
    available: false,
  },
  {
    name: ' slot5',
    time: '04:00-05:00',
    available: false,
  },
  {
    name: ' slot6',
    time: '05:00-06:00',
    available: false,
  },
  {
    name: ' slot7',
    time: '06:00-07:00',
    available: false,
  },
  {
    name: ' slot8',
    time: '07:00-08:00',
    available: false,
  },
  {
    name: ' slot9',
    time: '08:00-09:00',
    available: false,
  },
  {
    name: 'slot10',
    time: '09:00-10:00',
    available: false,
  },
  {
    name: 'slot11',
    time: '10:00-11:00',
    available: false,
  },
  {
    name: 'slot12',
    time: '11:00-12:00',
    available: false,
  },
  {
    name: 'slot13',
    time: '12:00-13:00',
    available: false,
  },
  {
    name: 'slot14',
    time: '13:00-14:00',
    available: false,
  },
  {
    name: 'slot15',
    time: '14:00-15:00',
    available: false,
  },
  {
    name: 'slot16',
    time: '15:00-16:00',
    available: false,
  },
  {
    name: 'slot17',
    time: '16:00-17:00',
    available: false,
  },
  {
    name: 'slot18',
    time: '17:00-18:00',
    available: false,
  },
  {
    name: 'slot19',
    time: '18:00-19:00',
    available: false,
  },
  {
    name: 'slot20',
    time: '19:00-20:00',
    available: false,
  },
  {
    name: 'slot21',
    time: '20:00-21:00',
    available: false,
  },
  {
    name: 'slot22',
    time: '21:00-22:00',
    available: false,
  },
  {
    name: 'slot23',
    time: '22:00-23:00',
    available: false,
  },
  {
    name: 'slot24',
    time: '23:00-00:00',
    available: false,
  },
];

export const defaultSlots: Availability = {
  sunday: daySlots,
  moday: daySlots,
  tuesday: daySlots,
  wednesday: daySlots,
  thursday: daySlots,
  friday: daySlots,
  saturday: daySlots,
};
