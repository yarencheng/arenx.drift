
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

class Rocket extends View {
  render() {
    var width = StyleSheet.flatten(this.props.style).width | 100;
    var height = StyleSheet.flatten(this.props.style).height | 100;

    // ToastAndroid.show(JSON.stringify(StyleSheet.flatten(this.props.style)), ToastAndroid.SHORT);

    return (

        <View
          style={[styles.debugHight, styles.rocket, this.props.style]}
        >
          <Surface  width={width*0.8} height={height}>

              <Shape
                d={"M0 0 H " + width + " L " + (width/2) + " " + height + " L 0 0"}
                fill='red'
              />


          </Surface>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  debugHight:{
    borderColor: 'blue',
    borderWidth: 1,
    padding: 1,
    margin: 1
  },
  rocket:{
    width: 10,
    height: 10
  }
})

module.exports = Rocket;
