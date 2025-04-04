import { useState, useEffect } from 'react'
import { openingHours } from './mocks/openingHours'
import { OpeningHours } from './types'

export function useFetchOpeningHours() {
    const [data, setData] = useState<
        Array<{
            openinghours: OpeningHours
        }>
    >([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                setData(openingHours)
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
