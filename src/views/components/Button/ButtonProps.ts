import type { PressableProps } from 'react-native'

type RNOmittedPressableProps = Omit<PressableProps, 'children' | 'onPress' | 'style'>
type RNPickedPressableProps = Pick<PressableProps, 'onPress'>
type RequiredRNPickedPressableProps = Required<RNPickedPressableProps>
type RNOmittedAndRequiredPickedPressablePropsUnion = RNOmittedPressableProps &
  RequiredRNPickedPressableProps

interface CustomPropsInjection {
  label: string
}

type ButtonProps = RNOmittedAndRequiredPickedPressablePropsUnion & CustomPropsInjection

export default ButtonProps
