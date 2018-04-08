import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Widget from './components/Widget';
import store from '../src/store/store';


export default class ConnectedWidget extends React.Component {
  componentDidMount() {

  }


  render() {
    return (
      <Provider store={store}>
        <Widget
          title={this.props.title}
          subtitle={this.props.subtitle}
          handleNewUserMessage={this.props.handleNewUserMessage}
          senderPlaceHolder={this.props.senderPlaceHolder}
          profileAvatar={this.props.profileAvatar}
          showCloseButton={this.props.showCloseButton}
          fullScreenMode={this.props.fullScreenMode}
          badge={this.props.badge}
          isRecording={this.props.isRecording}
        />
      </Provider>
    );
  }
}


ConnectedWidget.propTypes = {
  audio: PropTypes.func,
  isRecording: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  handleNewUserMessage: PropTypes.func.isRequired,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number
};

ConnectedWidget.defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  badge: 0
};

