import { useEffect } from 'react'

export function useClickOutside(ref, handler, watchers) {
    useEffect(
        () => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handler()
                }
            }
            document.addEventListener('mousedown', handleClickOutside, { passive: true })
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        },
        watchers ? [ref, ...watchers] : [ref]
    )
}
