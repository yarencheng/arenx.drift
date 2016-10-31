
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

class Planet extends React.Component {
  render() {

    return (

        <View
          style={[
            styles.debugHight, {
              position: 'absolute',
              top: this.props.y - ( this.props.height/2),
              left: this.props.x - ( this.props.width/2),
              width: this.props.width,
              height: this.props.height,
            }]}
        >
          <View style={[
            styles.planet_type1,
            {
              position: 'absolute',
              top: 0,
              left: 0,
              width: this.props.width,
              height: this.props.height,
            }
          ]}/>
          <Text
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {this.props.name + ' (' + Math.round(this.props.x) + ',' + Math.round(this.props.y) + ')'}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  debugHight:{
    borderColor: 'green',
    borderWidth: 1,
  },
  planet_type1:{
    borderRadius: 50,
    backgroundColor: 'yellow'
  }
})

module.exports = Planet;
