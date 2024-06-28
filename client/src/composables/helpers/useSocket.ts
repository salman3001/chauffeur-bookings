import { io, type Socket } from 'socket.io-client'
import { ref } from 'vue'
import { useAuth } from './useAuth'

export function useSocket() {
  const socket = ref<Socket | null>(null)
  const { user } = useAuth()

  const connectSocket = (url: string) => {
    if (!socket.value) {
      socket.value = io(url || '', {
        transports: ['websocket'],
        auth: {
          userId: user?.value!.id as unknown as string
        }
      })
    }
  }

  const disconnectSocket = () => {
    if (socket.value) {
      socket.value.removeAllListeners()
      socket.value.disconnect()
      socket.value = null
    }
  }

  return {
    socket,
    connectSocket,
    disconnectSocket
  }
}
