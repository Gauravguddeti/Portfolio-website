'use client'

import { useServiceWorker } from '@/hooks/useServiceWorker'

export function ServiceWorkerRegistration() {
  useServiceWorker()
  return null
}
