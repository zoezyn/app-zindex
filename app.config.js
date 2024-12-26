export default {
    expo: {
      name: "Zindex",
      slug: "app-zindex",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "myapp",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/images/icon.png",
        resizeMode: "contain",
        backgroundColor: "#ECFDF5"
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.anonymous.appzindex"
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/icon.png",
          backgroundColor: "#ECFDF5"
        },
        package: "com.anonymous.appzindex"
      },
      web: {
        bundler: "metro",
        output: "single",
        favicon: "./assets/images/favicon.png"
      },
      plugins: [
        "expo-router",
        "expo-font",
        [
          "@react-native-google-signin/google-signin",
          {
            // iosUrlScheme: process.env.EXPO_PUBLIC_IOS_URL_SCHEME ?? process.env.IOS_URL_SCHEME
            iosUrlScheme: "com.googleusercontent.apps.377004664714-t80dg0821t21vhjke9bteo4nimas8qg2"
          }
        ]
      ],
      experiments: {
        typedRoutes: true
      },
      extra: {
        router: {
          origin: false
        },
        eas: {
          projectId: "edd19bfb-381b-4236-a19b-34bea9482adb"
        },
        // Add environment variables here
        googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? 
          process.env.GOOGLE_IOS_CLIENT_ID,
        googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? 
          process.env.GOOGLE_ANDROID_CLIENT_ID,
        supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY,
      }
    }
  };