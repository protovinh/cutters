import 'dotenv/config'

export default {
    expo: {
        owner: 'vinhvu2000',
        name: 'Cutters',
        slug: 'cutters',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        newArchEnabled: false,
        ios: {
            bundleIdentifier: 'com.vinvu2000.Cutters',
            supportsTablet: true,
            config: {
                googleMapsApiKey: process.env.GOOGLE_API_KEY,
            },
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false,
                LocationWhenInUseUsageDescription:
                    'This app needs access to your location to show you the nearest salons',
            },
        },
        android: {
            package: 'com.vinvu2000.Cutters',
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            config: {
                googleMaps: {
                    apiKey: process.env.GOOGLE_API_KEY,
                },
            },
        },
        plugins: [
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                },
            ],
        ],
        extra: {
            eas: {
                projectId: 'fd546098-3abf-452d-b9b2-dbf67110a2a1',
            },
        },
    },
}
