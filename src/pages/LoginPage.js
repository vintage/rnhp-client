import React from 'react'
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

type Props = {
  name: string,
  isLoading: boolean,
  onChange: Function,
  onSubmit: Function,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#29b45b',
  },
})

const LoginPage = (props: Props) => {
  const { name, isLoading, onChange, onSubmit } = props

  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput
        label="Name"
        value={name}
        disabled={isLoading}
        onChangeText={onChange}
      />

      <Button onPress={onSubmit} title={!isLoading ? 'Save' : 'Loading ...'} />
    </SafeAreaView>
  )
}

export default LoginPage
