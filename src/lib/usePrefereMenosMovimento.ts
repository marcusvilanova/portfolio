'use client'

import { useSyncExternalStore } from 'react'

const CONSULTA = '(prefers-reduced-motion: reduce)'

function assinar(aoMudar: () => void) {
  const lista = window.matchMedia(CONSULTA)
  lista.addEventListener('change', aoMudar)
  return () => lista.removeEventListener('change', aoMudar)
}

/** true quando o sistema pede menos movimento. No servidor, assume que sim (nada anima antes da hidratação). */
export function usePrefereMenosMovimento(): boolean {
  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(CONSULTA).matches,
    () => true,
  )
}
