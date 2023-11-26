import { useState, useEffect } from 'react'

export function useWindowSize(getBreakpoint = false) {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () =>
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })

            window.addEventListener('resize', handleResize, { passive: true })
            handleResize()
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])
    if (getBreakpoint) {
        const { width } = windowSize
        if (width <= 342) return 'mobileMini'
        else if (width > 342 && width <= 400) return 'mobile'
        else if (width > 400 && width <= 640) return 'mobilePlus'
        else if (width > 640 && width <= 800) return 'tablet'
        else if (width > 800 && width <= 1000) return 'tabletPlus'
        else if (width > 1000 && width <= 1024) return 'tabletLandscape'
        else if (width < 1024 && width <= 1150) return 'desktop'
        else return 'desktopPlus'
    }
    return windowSize
}
