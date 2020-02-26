import { HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'

export const stackNavigatorDefaultProps = ({ theme }) => ({
  screenOptions: {
    headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

export const stackNavigatorCardProps = ({ theme }) => ({
  screenOptions: {
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalPresentationIOS,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  mode: 'modal',
})

export const stackScreenDefaultProps = ({ theme }) => ({
  options: (props) => ({
    ...DefaultNavigationComponent({ ...props, theme }),
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }),
})

export const stackScreenCardProps = ({ theme }) => ({
  options: (props) => ({
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    header: () => null,
}),
})

export const tabNavigatorProps = ({ theme }) => ({
  tabBarOptions: {
    showLabel: false,
    activeTintColor: theme.colors.primaryIcon,
    style: {
      backgroundColor: theme.colors.backgroundPrimary,
      borderTopWidth: 0,
    },
  },
})