// types/navigation.d.ts

import { StackNavigationProp, RouteProp } from '@react-navigation/native';

declare module '@react-navigation/native' {
  export type RootStackNavigationProp<T extends keyof RootStackParamList> =
    StackNavigationProp<RootStackParamList, T>;
  export type RootStackRouteProp<T extends keyof RootStackParamList> =
    RouteProp<RootStackParamList, T>;

  export function useNavigation<
    T extends keyof RootStackParamList,
  >(): RootStackNavigationProp<T>;
  export function useRoute<
    T extends keyof RootStackParamList,
  >(): RootStackRouteProp<T>;
}
