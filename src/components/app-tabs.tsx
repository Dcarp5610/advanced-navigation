import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{
        selected: {
          color: colors.text,
        },
      }}
    >
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

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf="magnifyingglass"
          md="search"
        />
      </NativeTabs.Trigger>

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