import React from 'react'

import { AuthorService } from '../services';
import { LoginPage } from '../pages'

type Props = {};
type State = {
  name: string,
  isLoading: boolean,
};

class LoginScreen extends React.Component<Props, State> {
  state = {
    name: '',
    isLoading: false,
  };

  constructor(props: Props) {
    super(props)

    this.login = this.login.bind(this)
  }

  componentDidMount() {
    this.initializeAuthor()
  }

  async initializeAuthor() {
    this.setState({ name: await AuthorService.getName() })
  }

  async login() {
    const { name } = this.state
    this.setState({ isLoading: true })
    await AuthorService.setName(name)
    this.setState({ isLoading: false })
  }

  render() {
    const { name, isLoading } = this.state;

    return (
      <LoginPage
        name={name}
        isLoading={isLoading}
        onChange={text => this.setState({ name: text })}
        onSubmit={this.login}
      />
    )
  }
}

export default LoginScreen
