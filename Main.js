
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ART,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ToastAndroid,
  Dimensions
} from 'react-native';

const {
  Surface,
  Group,
  Shape,
  Circle,
  Rectangle
} = ART;

import Rocket from './Rocket'

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fill: 'red',
      x:0,
      rocketPosition: {
        x: 100, // TODO: change default position
        y: 100
      },
      rocketRotate: '-90 deg'
    };
  }

  render() {

    var flattenRocketStyle = StyleSheet.flatten(styles.rocket);

    // ToastAndroid.show(JSON.stringify(Math.tan(90)), ToastAndroid.SHORT);

    return (
      <TouchableWithoutFeedback
        onPress={(e)=>{

          var x = e.nativeEvent.pageX - (Dimensions.get('window').width / 2);
          var y = - (e.nativeEvent.pageY - (Dimensions.get('window').height / 2));

          var rad = (-Math.atan2(y, x) - (Math.PI/2)) + ' rad';

          this.setState({
            rocketRotate: rad
          });
        }}
        onLayout={(e)=>{
          this.setState({
            rocketPosition: {
              x: e.nativeEvent.layout.width / 2,
              y: e.nativeEvent.layout.height / 2,
            }
          });
        }}
      >
        <View style = {[styles.debugHight1, styles.main]} >
          <Text>{this.state.rocketRotate}</Text>
          <Rocket
            style={[
              styles.rocket,
              {
                position: 'absolute',
                left: this.state.rocketPosition.x - (flattenRocketStyle.width / 2),
                top: this.state.rocketPosition.y - (flattenRocketStyle.height / 2),
                transform: [{
                  rotate: this.state.rocketRotate
                }]
              }
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  debugHight1:{
    borderColor: 'red',
    borderWidth: 1,
    padding: 1,
    margin: 1
  },
  debugHight2:{
    borderColor: 'green',
    borderWidth: 1,
    padding: 1,
    margin: 1
  },
  main: {
    flex: 1
  },
  rocket: {
    width: 100,
    height: 100
  }
})

module.exports = Main;
