
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ART,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';

const {
  Surface,
  Group,
  Shape,
  Circle,
  Rectangle
} = ART;

class Rocket extends React.Component {
  render() {

    return (

        <View
          style={[
            styles.debugHight, {
              position: 'absolute',
              top: this.props.y,
              left: this.props.x,
              width: this.props.width,
              height: this.props.height,
            }]}
        >
          <View style={styles.rocket}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  rocket:{
    flex: 1,
    backgroundColor: 'blue'
  }
})

module.exports = Rocket;
