import { PaymentMode } from './enums/PaymentMode'
import { PaymentStatus } from './enums/PaymentStatus'

export const resolvePaymentStatus = (status: PaymentStatus) => {
  if (status === PaymentStatus.PENDING) return { text: 'Pending', color: 'warning' }
  if (status === PaymentStatus.PAID) return { text: 'Paid', color: 'success' }
  if (status === PaymentStatus.REFUND_REQUESTED)
    return { text: 'Refund Requested', color: 'warning' }
  if (status === PaymentStatus.REFUNDED) return { text: 'Refunded', color: 'success' }
}

export const resolvePaymentMode = (status: PaymentMode) => {
  if (status === PaymentMode.CASH) return { text: 'COD', color: 'info' }
  if (status === PaymentMode.ONLINE) return { text: 'Online', color: 'info' }
}
