import { create } from 'zustand'

interface UIStore {
    isCartOpen: boolean
    toggleCart: () => void
    closeCart: () => void
    openCart: () => void
}

export const useUIStore = create<UIStore>((set) => ({
    isCartOpen: false,
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    closeCart: () => set({ isCartOpen: false }),
    openCart: () => set({ isCartOpen: true }),
}))
