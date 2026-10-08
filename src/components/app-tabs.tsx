import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      {/* Home */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'house',
            selected: 'house.fill',
          }}
          md={{
            default: 'home',
            selected: 'home',
          }}
        />
      </NativeTabs.Trigger>

      {/* Reels-style screen */}
      <NativeTabs.Trigger name="create">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'play.rectangle',
            selected: 'play.rectangle.fill',
          }}
          md={{
            default: 'ondemand_video',
            selected: 'ondemand_video',
          }}
        />
      </NativeTabs.Trigger>

      {/* Messages-style screen */}
      <NativeTabs.Trigger name="activity">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'paperplane',
            selected: 'paperplane.fill',
          }}
          md={{
            default: 'send',
            selected: 'send',
          }}
        />
      </NativeTabs.Trigger>

      {/* Search */}
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf="magnifyingglass"
          md="search"
        />
      </NativeTabs.Trigger>

      {/* Profile */}
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'person.crop.circle',
            selected: 'person.crop.circle.fill',
          }}
          md={{
            default: 'account_circle',
            selected: 'account_circle',
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}