import { useEffect, useRef, useState } from 'react'

const useHeadingObserver = () => {
    const [activeHeadings, setActiveHeadings] = useState<string[]>([])
    const observer = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            const newActiveHeadings: string[] = []

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    newActiveHeadings.push(entry.target.id)
                }
            })

            setActiveHeadings(newActiveHeadings)

            console.log('newActiveHeadings', newActiveHeadings)
        })

        document.querySelectorAll('h2[id], h3[id]').forEach((heading) => {
            observer.current?.observe(heading)
        })

        return () => {
            observer.current?.disconnect()
        }
    }, [])

    return activeHeadings
}

export default useHeadingObserver
