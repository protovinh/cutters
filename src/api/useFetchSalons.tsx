import { useState, useEffect } from 'react'
import { Shop } from './types'

export function useFetchSalons() {
    const [data, setData] = useState<Shop[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const apiResponse = await fetch(
                    'https://api.test.cutters.no/v2/salons'
                )
                const apiData: Shop[] = await apiResponse.json()
                setData(apiData)
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

//Fetching of Test data.
