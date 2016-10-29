
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
  Rectangle,
  Transform
} = ART;


class GameView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rocketPosition: {x: this.props.mapWidth/2, y: this.props.mapWidth/2},
      rocketVelocity: {x: 10, y:10},
      rocketAcceleration: {x: 1, y:2},
      lastUpdate: null
    };
  }

  componentDidMount(){
    ToastAndroid.show(JSON.stringify(new Date().getMilliseconds()), ToastAndroid.SHORT);

    setInterval(()=>{

      // TODO: remove
      if (!!this.state.lastUpdate) {

        var d = new Date();
        var secondDiff = (d.getTime() - this.state.lastUpdate.getTime()) / 1000;

        this.setState({
          rocketVelocity: {
            x: this.state.rocketVelocity.x + (this.state.rocketAcceleration.x * secondDiff),
            y: this.state.rocketVelocity.y + (this.state.rocketAcceleration.y * secondDiff)},
          rocketPosition: {
            x: this.state.rocketPosition.x + (this.state.rocketVelocity.x * secondDiff),
            y: this.state.rocketPosition.y + (this.state.rocketVelocity.y * secondDiff)},
            lastUpdate: d
        });
      } else {
        this.setState({
          lastUpdate: new Date()
        });
      }


    }, 10);
  }


  getGridline() {

    var width = this.props.mapWidth;

    if (!this.props.showGridline) {
      return ;
    }
    return (
      <Group x={0} y={0}>
        <Shape d = {"M0 0 H " + width} stroke = 'green'/>
        <Shape d = {"M0 " + width*0.2 + " H " + width} stroke = 'green'/>
        <Shape d = {"M0 " + width*0.4 + " H " + width} stroke = 'green'/>
        <Shape d = {"M0 " + width*0.6 + " H " + width} stroke = 'green'/>
        <Shape d = {"M0 " + width*0.8 + " H " + width} stroke = 'green'/>
        <Shape d = {"M0 " + width + " H " + width} stroke = 'green'/>
        <Shape d = {"M 0 0 V " + width} stroke = 'green'/>
        <Shape d = {"M " + width*0.2 + " 0 V " + width} stroke = 'green'/>
        <Shape d = {"M " + width*0.4 + " 0 V " + width} stroke = 'green'/>
        <Shape d = {"M " + width*0.6 + " 0 V " + width} stroke = 'green'/>
        <Shape d = {"M " + width*0.8 + " 0 V " + width} stroke = 'green'/>
      </Group>
    );
  }

  getRocket(){

    var rocketScale = this.props.rocketScale;
    var rocketWidth = 100 * rocketScale;

    return (
      <Group
        scale={rocketScale}
        x={this.state.rocketPosition.x - (rocketWidth/2)}
        y={this.state.rocketPosition.y - (rocketWidth/2)} >
      <Shape
        d={"M35.6,66.5c2.2,2.2,1.4,6.4-1.8,9.6c-3.7,3.8-12.7,6.2-13.1,6.3l-1.5,0.4l0.4-1.5c0.1-0.4,2.8-9.6,6.3-13 c1.9-1.9,4.3-3,6.4-3C33.6,65.2,34.7,65.7,35.6,66.5z"}
        fill='red'

      />
      <Shape
        d={"M80.8,19.8l0,1.7c0,14.8-2.9,25.9-17,38.9c0.2,7-1.9,12.6-6.4,17.1L56,78.9l-8.7-12.8c-3,1.3-7.2,0.2-10.2-2.8 C34,60.2,33,56,34.3,53l-12.8-8.8l1.5-1.4c4.5-4.5,10.2-6.6,17.2-6.3c13.1-14,24.2-16.8,39-16.7L80.8,19.8z M66.7,40.3     c0.1-3.5-2.6-6.5-6.2-6.7c-3.5-0.2-6.5,2.6-6.7,6.2c-0.1,3.5,2.6,6.5,6.2,6.7S66.5,43.9,66.7,40.3z"}
        fill='red'
      />
      </Group>
    );
  }

  render() {

    var mapWidth = this.props.mapWidth;

    return (

        <View
          style={[styles.debugHight, this.props.style, {
            width: mapWidth,
            height: mapWidth
          }]}
        >
          <Surface width={mapWidth} height={mapWidth}>
            {this.getGridline()}
            {this.getRocket()}
          </Surface>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  debugHight:{
    borderColor: 'green',
    borderWidth: 1,
    padding: 1,
    margin: 1
  }
})

module.exports = GameView;
