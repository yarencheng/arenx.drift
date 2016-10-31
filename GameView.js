
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
  InteractionManager
} from 'react-native';

import Rocket from './Rocket'
import Planet from './Planet'

const {
  Surface,
  Group,
  Shape,
  Circle,
  Rectangle,
  Transform
} = ART;

var gameData = {
  screenSize: {width: 0, height: 0}
};

class GameView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameViewLayout: {x: 0, y: 0, width: 0, height: 0},
      rocketSize: {width: 50, height: 50},
      rocketSpeed: {vx: 10, vy: 50, ax: 1, ay: 2, lastUpdate: 0},
      planets: []
    };
  }



  componentDidMount(){

    this.isUpdating = false;
    setInterval(()=>{
      // this.setState(this.updateAll(this.state));

      if (this.isUpdating) {
        return;
      }

      this.isUpdating = true;

      InteractionManager.runAfterInteractions(() => {
        // return this.updateAll(this.state);
        this.setState(this.updateAll(this.state));
        this.isUpdating = false;
      });
    }, 1000/35);
  }

  updateRocketSpeed(state){

    if (0 === state.rocketSpeed.lastUpdate) {
      state.rocketSpeed.lastUpdate = new Date().getTime();
      return state;
    }

    var now = new Date().getTime();
    var diff = now - state.rocketSpeed.lastUpdate;

    state.rocketSpeed.lastUpdate = now;
    state.rocketSpeed.vx += state.rocketSpeed.ax * diff / 1000;
    state.rocketSpeed.vy += state.rocketSpeed.ay * diff / 1000;

    return state;
  }

  updatePlanets(state){

    if (state.gameViewLayout.width === 0 || state.gameViewLayout.height === 0) {
      return state;
    }

    // 5*5 groups
    // [ planets[], planets[], planets[], planets[], planets[] ]
    // [ planets[], planets[], planets[], planets[], planets[] ]
    // [ planets[], planets[], planets[], planets[], planets[] ]
    // [ planets[], planets[], planets[], planets[], planets[] ]
    // [ planets[], planets[], planets[], planets[], planets[] ]


    // remove out-of-range planets(not in 5*5 group)
    var min_x = -2 * state.gameViewLayout.width;
    var max_x = 3 * state.gameViewLayout.width;
    var min_y = -2 * state.gameViewLayout.height;
    var max_y = 3 * state.gameViewLayout.height;

    state.planets = state.planets.filter((p)=>{
      return min_x <= p.x && p.x < max_x && min_y <= p.y && p.y < max_y;
    });


    // find out which group is empty
    // for (var index_x = 0; index_x < 5; index_x++) {
    //
    //   var left_x = (index_x - 2) * state.gameViewLayout.width;
    //   var right_x = (index_x - 1) * state.gameViewLayout.width;
    //
    //   for (var index_y = 0; index_y < 5; index_y++) {
    //
    //     var left_y = (index_y - 2) * state.gameViewLayout.height;
    //     var right_y = (index_y - 1) * state.gameViewLayout.height;
    //
    //     var count = state.planets.filter((p)=>{
    //       return left_x <= p.x && p.x < right_x && left_y <= p.y && p.y < right_y;
    //     }).length;
    //
    //     if (0 !== count) {
    //       continue;
    //     }

        // create plante randomly
        // TODO
        // state.planets.push({
        //   x: (left_x + right_x) / 2,
        //   y: (left_y + right_y) / 2,
        //   width: 20,
        //   height: 20
        // });
    //   }
    // }

    var group = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    state.planets.forEach((p)=>{
      var index_x = Math.floor(p.x / state.gameViewLayout.width) + 2;
      if (index_x < 0 || 5 <= index_x) {
        return;
      }
      var index_y = Math.floor(p.y / state.gameViewLayout.height) + 2;
      if (index_y < 0 || 5 <= index_y) {
        return;
      }
      group[index_x][index_y]++;
    });

    for (var index_x = 0; index_x < 5; index_x++) {

      var left_x = (index_x - 2) * state.gameViewLayout.width;
      var right_x = (index_x - 1) * state.gameViewLayout.width;

      for (var index_y = 0; index_y < 5; index_y++) {

        var left_y = (index_y - 2) * state.gameViewLayout.height;
        var right_y = (index_y - 1) * state.gameViewLayout.height;

        if (index_x === 2 && index_y ==2) {
          continue;
        }

        if (0 === group[index_x][index_y]) {
          // create plante randomly
          // TODO
          state.planets.push({
            x: (left_x + right_x) / 2,
            y: (left_y + right_y) / 2,
            width: 100,
            height: 100
          });
        }
      }
    }


    // move to next location based on speed of rocket
    var now = new Date().getTime();
    if (!state.lastUpdate) {
      state.lastUpdate = now;
    } else {
      var diff = now - state.lastUpdate;
      state.lastUpdate = now;
      var dvx = state.rocketSpeed.vx * diff / 1000;
      var dvy = state.rocketSpeed.vy * diff / 1000;
      state.planets.forEach((p)=>{

        // var now = new Date().getTime();
        // var diff = now - p.lastUpdate;

        // p.lastUpdate = now;
        p.x -= dvx;
        p.y -= dvy;
      });
    }

    return state;
  }


  updateAll(state){

    state = this.updateRocketSpeed(state);
    state = this.updatePlanets(state);

    return state;
  }

  onLayoutChange(newLayout, oldLayout){

    if (JSON.stringify(newLayout) == JSON.stringify(oldLayout)) {
      return;
    }

    var state = this.state;

    state.gameViewLayout = newLayout;

    state = this.updateAll(state);

    this.setState(state);


  }

  render() {

    var mapWidth = this.props.mapWidth;

    var planets = [];

    this.state.planets
      .filter((p)=>{
        // filter planets not in screen to reduce UI latency
        return (0 <= p.x + (p.width/2)) &&
          (p.x - (p.width/2) <= this.state.gameViewLayout.width) &&
          (0 <= p.y + (p.height/2)) &&
          (p.y - (p.height/2) <= this.state.gameViewLayout.height);
      })
      .map((p)=>{
        // map metadata to UI component
        planets.push((
          <Planet
            key={planets.length}
            x={p.x}
            y={p.y}
            width={p.width}
            height={p.height}
            name={planets.length}
          />
        ));
      });

    return (
      <View
        style={[styles.debugHight, this.props.style]}
        onLayout={(e)=>{this.onLayoutChange(e.nativeEvent.layout, this.state.gameViewLayout);}}
      >
        <Rocket
          x={(this.state.gameViewLayout.width - this.state.rocketSize.width)/2}
          y={(this.state.gameViewLayout.height - this.state.rocketSize.height)/2}
          width={this.state.rocketSize.width}
          height={this.state.rocketSize.height}
        />
        <View
          style={[styles.debugHight, this.props.style]}

        >
          {planets}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  debugHight:{
    borderColor: 'green',
    borderWidth: 1,
  }
})

module.exports = GameView;
