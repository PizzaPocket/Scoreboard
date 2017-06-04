import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var createReactClass = require('create-react-class');

var PLAYERS = [
  {
  name: "Kaius Reese",
  score: 1,
  id: 1
  },
  {
  name: "Leo Reese",
  score: 2,
  id: 2
  },
  {
  name: "Tingting Lu",
  score: 5,
  id: 3
  },
  {
  name: "Beebop McGoo",
  score: 328,
  id: 4
  },

]

function Header(props) {
  return(
    <div className="header">
     <h1>{props.title}</h1>
   </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}


function Counter(props){
  return(
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
        <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

function Player(props){
  return(
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired
}


var Application = createReactClass({
  PropTypes: {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })).isRequired
  },

  getDefaultProps: function(){
    return{
      title: "Scoreboard"
    }
  },

  getInitialState: function(){
    return {
      players: this.props.initialPlayers
    };
  },

onScoreChange: function(delta) {
  console.log('onScoreChange is working', delta);
},

  render: function(){
    return(
      <div className="scoreboard">
        <Header title={this.props.title}/>
        <div className="players">
          {this.state.players.map (function(player) {
            return (
              <Player
                onScoreChange={this.onScoreChange}
                name={player.name}
                score={player.score}
                key={player.id}/>
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Application initialPlayers = {PLAYERS}/>, document.getElementById('container'));
