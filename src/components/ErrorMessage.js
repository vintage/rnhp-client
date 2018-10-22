import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Banner } from 'react-native-paper'

type Props = {
  message: string,
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
})

const ChatMessage = (props: Props) => {
  const { message } = props

  return (
    <Banner
      visible
      actions={[]}
    >
      <Text style={styles.text}>{message}</Text>
    </Banner>
  )
}

export default ChatMessage
