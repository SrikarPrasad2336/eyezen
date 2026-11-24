import { create } from 'zustand'
import { registerSW } from 'virtual:pwa-register'

// The browser's "install this app" offer (not in TypeScript's built-in types yet)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone(): boolean {
  const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true
  return window.matchMedia('(display-mode: standalone)').matches || iosStandalone
}

interface PwaState {
  online: boolean
  installed: boolean
  installEvent: BeforeInstallPromptEvent | null
  offlineReady: boolean // the app has just been saved for offline use
  needRefresh: boolean // a new version is waiting
  install: () => Promise<void>
  dismissOfflineReady: () => void
  dismissUpdate: () => void
  applyUpdate: () => void
}

let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | undefined

// Not saved on the device: this is all about "right now".
export const usePwa = create<PwaState>()((set, get) => ({
  online: navigator.onLine,
  installed: isStandalone(),
  installEvent: null,
  offlineReady: false,
  needRefresh: false,

  install: async () => {
    const event = get().installEvent
    if (!event) return
    await event.prompt()
    const choice = await event.userChoice
    set({ installEvent: null, installed: choice.outcome === 'accepted' })
  },

  dismissOfflineReady: () => set({ offlineReady: false }),
  dismissUpdate: () => set({ needRefresh: false }),
  applyUpdate: () => {
    void updateServiceWorker?.(true)
  },
}))

// Called once when the app starts
export function initPwa() {
  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh() {
      usePwa.setState({ needRefresh: true })
    },
    onOfflineReady() {
      usePwa.setState({ offlineReady: true })
    },
  })

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault() // we show our own, calmer Install button
    usePwa.setState({ installEvent: event as BeforeInstallPromptEvent })
  })
  window.addEventListener('appinstalled', () => {
    usePwa.setState({ installed: true, installEvent: null })
  })
  window.addEventListener('online', () => usePwa.setState({ online: true }))
  window.addEventListener('offline', () => usePwa.setState({ online: false }))
}