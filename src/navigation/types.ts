import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CategoryType } from '@/store';

export type TabParamList = {
  Home: undefined;
  Add: undefined;
  Summary: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  Settings: undefined;
  CategoryDetail: { category: CategoryType; categoryTitle: string };
};

export type TabScreenProps<Screen extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, Screen>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}