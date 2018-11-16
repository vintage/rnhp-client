import React from 'react'
import { FlatList, Image, TouchableOpacity, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-paper'
import { Col, Row, Grid } from 'react-native-easy-grid'

import { ChatMessage, ErrorMessage } from '../components'

type Props = {
  message: string,
  messages: Array,
  isLoading: boolean,
  error: string,
  picture: string,
  onRefresh: Function,
  onMessageChange: Function,
  onMessageSend: Function,
  onMessageLike: Function,
  onPictureTake: Function,
};

const styles = StyleSheet.create({
  messageContainer: {
    paddingVertical: 5,
  },
  messageContainerRight: {
    alignItems: 'flex-end',
  },
})

const ChatPage = (props: Props) => {
  const {
    message, messages, isLoading, error, onRefresh, onMessageChange,
    onMessageSend, onMessageLike, onPictureTake, picture,
  } = props

  return (
    <Grid>
      <Row style={{ height: 75 }}>
        <Col>
          <TextInput
            label="Message"
            value={message}
            disabled={isLoading}
            onChangeText={onMessageChange}
          />
        </Col>

        <Col style={{ width: 60 }}>
          {picture ? (
            <Image source={{ uri: picture }} style={{ width: 50, height: 50 }} />
          ) : (
            <TouchableOpacity onPress={onPictureTake}>
              <Icon
                name="camera"
                size={50}
                color="blue"
              />
            </TouchableOpacity>
          )}
        </Col>

        <Col style={{ width: 60 }}>
          <TouchableOpacity onPress={onMessageSend}>
            <Icon
              name="alarm"
              size={50}
              color="red"
            />
          </TouchableOpacity>
        </Col>
      </Row>

      <Row>
        <FlatList
          renderItem={(({ index, item }) => (
            <View style={[
              styles.messageContainer,
              index % 2 ? styles.messageContainerRight : null,
            ]}
            >
              <ChatMessage
                content={item.content}
                author={item.author}
                likesCount={item.likes_count}
                picture={item.image}
                onMessageLike={() => onMessageLike(item)}
              />
            </View>
          ))}
          keyExtractor={item => item.id.toString()}
          data={messages}
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      </Row>

      {error && (
        <Row>
          <ErrorMessage message={error} />
        </Row>
      )}
    </Grid>
  )
}

export default ChatPage
