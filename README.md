# Cutters - The start of a new era

App is created with Expo react native. It uses the prebuild configuration, which means that it will generate the /ios and /android folders on build.

## Get started

1. Install dependencies and ENV variables

    ```bash
    npm install

    ```

Rename `.env.example` -> `.env` and add a working `GOOGLE_API_KEY=`
Guide to create Google API key here https://docs.expo.dev/versions/latest/sdk/map-view

2. Start the app for Android
   Requirements:

    - Android Studio
    - Running Android simulator or connected Android device. [Guide here if needed](https://reactnative.dev/docs/running-on-device)

    ```bash
     npm run android
    ```

3. Start the app for Android
   Requirements

    - Xcode
    - Running iPhone simulator or connected iphone device. [Guide here if needed](https://reactnative.dev/docs/running-on-device?platform=ios)

    ```bash
     npm run ios
    ```

## Deployments

Using Expo Application Services (EAS) for deployment

It's required to have an Expo account. [Register here](https://expo.dev/signup)

It's free up to 1 000 monthly active user (MAU). An active user = 1 user launching the app in a given month
For 1,000 to 50,000 MAU - the pricing is 99$/month.

Expo provide Over-the-air update, which is a feature allowing deployment without going through the ordinary Apple and Google submission process.

For development environment, for each new device register the UUID with this link https://expo.dev/register-device/26128e5e-c70d-4d80-afa1-a235a5d81e22
The Expo development client require a UUID to identify and authenticate with the deployed development build. [Read more here](https://docs.expo.dev/build/internal-distribution/)

```bash
# build a development profile
eas build --profile development

# build production profile
eas build --profile production
```

**For every new registered UUID device, it's required to build a new development profile build!**

### OTA update

Specify a branch and message for over-the-air update

```
eas update --branch test --message="a message"

```

## Run tests

Running integration test with Jest framework

```
npm run test
```
