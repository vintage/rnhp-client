import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { TextInput } from 'react-native-paper'

type Props = {
  name: string,
  isLoading: boolean,
  onChange: Function,
  onSubmit: Function,
};

const LoginPage = (props: Props) => {
  const { name, isLoading, onChange, onSubmit } = props

  return (
    <View>
      <TextInput
        label="Name"
        value={name}
        disabled={isLoading}
        onChangeText={onChange}
      />

      <Button onPress={onSubmit} title={!isLoading ? 'Save' : 'Loading ...'} />
    </View>
  )
}

export default LoginPage
