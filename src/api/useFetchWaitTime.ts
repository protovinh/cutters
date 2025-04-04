import { useState, useEffect } from 'react'
import { WaitTime } from './types'
import { waitTime } from './mocks/waitTime'

export function useFetchWaitTime() {
    const [data, setData] = useState<WaitTime[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                setData(waitTime)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    return { data, loading }
}
