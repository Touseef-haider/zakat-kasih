import React, { Component } from 'react';
import {
  Row,
  Col,
  Label
} from 'reactstrap';
import { WifiOff } from 'react-feather';

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
            { 
                isDisconnected ? 
                    <Row>
                        <Col xs="12" className="text-center m-auto">
                            <WifiOff size={120} />
                            <br />
                            <Label className="my-3">Lost Connection</Label>
                            <br />
                            <Label>Please check your internet connection and try again.</Label>
                        </Col>
                    </Row> 
                : 
                    <ComposedComponent {...this.props} />
            }
        </div>
      );
    }
  }

  return NetworkDetector;
}