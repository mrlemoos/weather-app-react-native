import React, { FC, useMemo, memo } from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'

import { primaryColor } from '../../constants/Constants'
import type ButtonProps from './ButtonProps'

const Button: FC<ButtonProps> = ({ label, children, onPress, ...propDrilling }) => {
  const childEl = useMemo(() => {
    if (typeof label === 'string') {
      return <Text style={styles.label}>{label}</Text>
    }

    if (typeof children === 'string') {
      return <Text style={styles.label}>{children}</Text>
    }

    if (React.isValidElement(children)) {
      return <>{children}</>
    }

    return null
  }, [children, label])

  return (
    // Even though prop drilling is not a good thing to do, here it makes some sense to use it because
    // the Button component is nothing else but a simple wrapper for the Pressable.
    <Pressable {...propDrilling} style={styles.button}>
      {childEl}
    </Pressable>
  )
}

export default memo(Button)

const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
})
