import { useEffect, useRef } from 'react'
import MapView from 'react-native-maps'
import PagerView from 'react-native-pager-view'
import { Shop } from '@/api/types'

interface UseMapActionsProps {
    data: Shop[]
    loading: boolean
    setExpandedMarkerId: (id: number) => void
}

export function useMapActions({
    data,
    loading,
    setExpandedMarkerId,
}: UseMapActionsProps) {
    const mapRef = useRef<MapView>(null)

    const pagerRef = useRef<PagerView>(null)

    useEffect(() => {
        if (loading) return
        if (data && data.length > 0 && mapRef.current && pagerRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: parseFloat(data[0].coordinates.latitude),
                    longitude: parseFloat(data[0].coordinates.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                1000
            )
            pagerRef.current.setPage(0)
            setExpandedMarkerId(data[0].id)
        }
    }, [data, loading])

    const handleMarkerPress = (markerId: number) => {
        setExpandedMarkerId(markerId)

        const shop = data.find((s) => s.id === markerId)
        if (shop && mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: parseFloat(shop.coordinates.latitude),
                    longitude: parseFloat(shop.coordinates.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                200
            )
            const pageIndex = data.findIndex((s) => s.id === markerId)
            if (pageIndex !== -1 && pagerRef.current) {
                pagerRef.current.setPage(pageIndex)
            }
        }
    }

    const handlePageSelected = (event: any) => {
        const newPage = event.nativeEvent.position
        const shop = data[newPage]
        if (shop && mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: parseFloat(shop.coordinates.latitude),
                    longitude: parseFloat(shop.coordinates.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                200
            )
            setExpandedMarkerId(shop.id)
        }
    }

    return {
        mapRef,
        pagerRef,
        handleMarkerPress,
        handlePageSelected,
    }
}
