import { Shop } from '@/api/types'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'

interface Props {
    marker: Shop
}

export function CustomMarker(props: Props) {
    const latitude = parseFloat(props.marker.coordinates.latitude)
    const longitude = parseFloat(props.marker.coordinates.longitude)

    if (isNaN(latitude) || isNaN(longitude)) {
        console.log(`Invalid coordinates for marker ${props.marker.id}`)
        return null
    }

    return (
        <Marker
            key={props.marker.id}
            coordinate={{ latitude, longitude }}
            title={props.marker.name}
            description={props.marker.address}
        >
            <Image
                source={require('../../../assets/images/shape.png')}
                style={{ width: 28, height: 28 }}
            />
        </Marker>
    )
}
