
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
import GameView from './GameView'

var debug_mode = true;

class Main extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render() {

    var flattenRocketStyle = StyleSheet.flatten(styles.rocket);
    var gameViewWidth = Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height;

    // ToastAndroid.show(JSON.stringify(Math.tan(90)), ToastAndroid.SHORT);

    return (
      <View style = {[styles.debugHight1, styles.main]} >
        <GameView
          showGridline = {debug_mode}
          mapWidth = {gameViewWidth}
          rocketScale = {1.5}
          style = {[styles.gameView, {
            left: (Dimensions.get('window').width - gameViewWidth) / 2,
            top: (Dimensions.get('window').height - gameViewWidth) / 2
          }]}
        />
      </View>
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
  gameView: {
    position: 'absolute',
    transform: [{
      scale: debug_mode ? 1 : 3
    }]
  }
})

module.exports = Main;
