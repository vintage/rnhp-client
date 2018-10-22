import React from 'react'
import { Paragraph, Surface, Text, Title } from 'react-native-paper'
import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type Props = {
  content: string,
  author: string,
  likesCount: number,
  picture: string,
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likesCount: {
    paddingTop: 5,
    paddingRight: 10,
  },
})

const ChatMessage = (props: Props) => {
  const { picture, content, author, likesCount } = props

  return (
    <Surface style={styles.container}>
      {!!picture && (
        <Image
          source={{ uri: picture }}
          style={{ width: 80, height: 80 }}
        />
      )}

      <Title>{content}</Title>
      <Paragraph>{author}</Paragraph>
      <View style={styles.footer}>
        <Text style={styles.likesCount}>{likesCount}</Text>
        <Icon name="thumb-up" size={25} color="#3b5998" />
      </View>
    </Surface>
  )
};

export default ChatMessage;
