<script setup lang="ts">
import BookingTable from '@/components/bookings/BookingTable.vue'
import { useGetCustomerBookings } from '@/composables/api/booking/useGetCustomerBookings'
import { useTable } from '@/composables/helpers/useTable'
</script>
<template>
  <BookingTable />
</template>
