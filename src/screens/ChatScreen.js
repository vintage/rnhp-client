import React from 'react'
import { Vibration, Share } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-simple-toast'

import { AuthorService, MessageService } from '../services'
import { ChatPage } from '../pages'

type Props = {};
type State = {
  isLoading: boolean,
  message: string,
  messages: Array,
  error: string,
  pictureSource: string,
  pictureData: string,
};

class ChatScreen extends React.Component<Props, State> {
  state = {
    message: '',
    messages: [],
    isLoading: false,
    pictureSource: null,
    pictureData: null,
  };

  constructor(props: Props) {
    super(props)

    this.fetchMessages = this.fetchMessages.bind(this)
    this.selectPicture = this.selectPicture.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.fetchMessages()
  }

  async fetchMessages() {
    this.setState({ isLoading: true })

    let error = null
    let messages = []
    try {
      messages = await MessageService.getAll()
    } catch (e) {
      error = 'Unable to fetch messages, check your internet connection'
    }

    if (this.hasMessagesChanged(messages)) {
      Vibration.vibrate()
    }

    this.setState({ messages, error, isLoading: false })
  }

  hasMessagesChanged(messages) {
    return messages.length > 0
  }

  selectPicture() {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error)
      } else {
        this.setState({
          pictureSource: response.uri,
          pictureData: response.data,
        })
      }
    })
  }

  async sendMessage() {
    const { message, pictureData } = this.state

    await MessageService.create(message, await AuthorService.getName(), pictureData)
    await this.fetchMessages()
  }

  async likeMessage(message) {
    try {
      await MessageService.like(message.id, await AuthorService.getName())
    } catch (error) {
      Toast.show('Not this time, sorry')
      return
    }

    // Dirty way to update likes count
    const { messages } = this.state
    const newMessages = messages.map((m) => {
      if (m.id === message.id) {
        m.likes_count += 1
      }

      return m
    })

    this.setState({ messages: newMessages })
  }

  async shareMessage(message) {
    Share.share({
      message: message.content,
      title: message.author,
      url: message.image || null,
    })
  }

  render() {
    const {
      message, messages, isLoading, error, pictureSource,
    } = this.state

    return (
      <ChatPage
        message={message}
        messages={messages}
        isLoading={isLoading}
        picture={pictureSource}
        error={error}
        onRefresh={this.fetchMessages}
        onMessageChange={text => this.setState({ message: text })}
        onMessageSend={this.sendMessage}
        onMessageLike={m => this.likeMessage(m)}
        onMessageShare={m => this.shareMessage(m)}
        onPictureTake={this.selectPicture}
      />
    )
  }
}

export default ChatScreen
