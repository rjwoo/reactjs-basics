// Use props to make font color editable
// One more prop for fontSize
var HelloWorld = function (props) {
  var styles = {
    color: props.color,
    backgroundColor: 'MidnightBlue',
    fontSize: props.fontSize + 'px',
    display: 'inline-block',
    borderRadius: '5px',
    padding: '0 5px'
  };

  return <p style={styles}>Hello World and Hello {props.name}</p>;
};

// We want to valid the types of name, color and fontSize props
HelloWorld.propTypes = {
  name: React.PropTypes.string,
  color: React.PropTypes.string,
  fontSize: React.PropTypes.number
};
// For a list of PropTypes:
// https://facebook.github.io/react/docs/reusable-components.html

// We'll use state to keep track of the Square's color
// Therefore, we need to use React.createClass
var Square = React.createClass({
  getInitialState: function () {
    return {
      backgroundColor: 'Magenta'
    }
  },
  // Callback passed to onClick props
  // It gets an event argument like an event listenner
  toggleColor: function (event) {
    // setState takes an object as argument
    // the object will be merged with this.state
    if (this.state.backgroundColor == 'Magenta') {
      this.setState({
        backgroundColor: 'Teal'
      });
    } else {
      this.setState({
        backgroundColor: 'Magenta'
      });
    }
  },
  // render is required!
  render: function () {
    var styles = {
      width: '100px',
      height: '100px',
      backgroundColor: this.state.backgroundColor
    };
    return <div onClick={this.toggleColor} style={styles}></div>
  }
});

var StopWatch = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  start: function(){
    if(!this.intervalID) {
      this.intervalID = setInterval(this.tick, 1000);
    }
  },
  stop: function(){
    clearInterval(this.intervalID);
    this.intervalID = null;
  },
  reset: function(){
    if(this.intervalID) {
      this.stop();
    }
    this.setState({count: 0});
  },
  tick: function(){
    this.setState({count: this.state.count + 1});
  },
  render: function(){
    return (<div>
              <h1>Stop Watch</h1>
              <p>Time is: {this.state.count}</p>
              <button onClick={this.start}>Start</button>
              <button onClick={this.stop}>Stop</button>
              <button onClick={this.reset}>Reset</button>
              <hr />
            </div>);
  }
});

var Search = React.createClass({
  getInitialState: function() {
    return {filteredNames: this.props.names}
  },
  filter: function() {
    var searchFilter = function(string) {
      return string.includes(this.refs.keyword.value)
    }.bind(this)
    var filteredList = this.props.names.filter(searchFilter);
    this.setState({filteredNames: filteredList});
  },
  names: function() {
    var nameComponents = this.state.filteredNames.map(function(name, index){
      return <li key={index}>{name}</li>;
    })
    return nameComponents;
  },
  render: function() {
    return <div>
            <input type="text" ref="keyword" onChange={this.filter} />
            <ul>{this.names()}</ul>
           </div>
  }
});

var Calculator = React.createClass({
  getInitialState: function(){
    return {
      answer: null
    }
  },
  Number1: function(x){
    this.setState({num1: x.target.value});
  },
  Number2: function(x){
    this.setState({num2: x.target.value});
  },
  sum: function(){
    this.setState({answer: parseInt(this.state.num1) + parseInt(this.state.num2)})
  },
  render: function(){
    return (
      <div>
        <input type='textfield' name='Num1' onChange={this.Number1} />+
        <input type='textfield' name='Num2' onChange={this.Number2} />
        <button onClick={this.sum}>=</button>
        <span> The sum of {this.state.num1} and {this.state.num2} is {this.state.answer}</span>
      </div>
    )
  }
});

// var AddNumber = React.createClass({
//   getInitialState: function() {
//     return {answer: null};
//   },
//   calculate: function(event) {
//     var num1 = parseFloat(this.refs.num1.value);
//     var num2 = parseFloat(this.refs.num2.value);
//     if(isNaN(num1 + num2)) {
//       this.setState({answer: "invlid input"});
//     } else {
//       this.setState({answer: num1 + num2});
//     }
//   },
//   render: function(){
//     return <div>
//              <input ref="num1" type="text" />
//              +
//              <input ref="num2" type="text" />
//              <button onClick={this.calculate} value="abc">=</button>
//              {this.state.answer}
//            </div>;
//   }
// });

var Timer = React.createClass({
  getInitialState: function () {
    return {
      date: Date()
    }
  },
  componentDidMount: function () {
    console.log("I'm loaded!!!")
    this.timerID = setInterval(
      this.tick,
      1000
    );
  },
  componentWillUnmount: function () {
    clearInterval(this.timerId);
  } ,
  tick: function () {
    this.setState({ date: Date() });
  },
  render: function () {
    return <p>Time is: { this.state.date }</p>
  }
})

var Cross = React.createClass({
  componentDidMount: function () {
    console.log(this.refs);
  },
  toggleStrike: function (event) {
    console.log('Has Changed!!!');
    var checkBox = event.target;
    if (checkBox.checked) {
      this.refs.label.style.textDecoration = "line-through";
    } else {
      this.refs.label.style.textDecoration = "none";
    }
  },
  render: function () {
    return (
      <div ref="parent">
        <input ref="input" onChange={this.toggleStrike} type="checkbox"/>
        <span ref="label">A box</span>
      </div>
    );
  }
})

var ShoppingList = React.createClass({
  getInitialState: function(){
    return {total: 0};
  },
  setTotal: function(number) {
    this.setState({total: this.state.total + number});
  },
  render: function() {
    return <div>
              <div style={{width: 150, border: "1px solid black"}}>
                <ListItem text="Book" value={20}  getValue={this.setTotal}/>
                <ListItem text="Computer" value={200} getValue={this.setTotal} />
                <ListItem text="Pen" value={1} getValue={this.setTotal} />
                <ListItem text="Phone" value={100} getValue={this.setTotal} />
                <ListItem text="Table" value={20}  getValue={this.setTotal}/>
              </div>
              <div>Total: ${this.state.total}</div>
           </div>
  }
});

var ListItem = React.createClass({
  getInitialState: function(){
    return {bgColor: "white"};
  },
  clickAdder: function(){
    if(this.state.bgColor === "white") {
      this.setState({bgColor: "green"});
      this.props.getValue(this.props.value)
    } else {
      this.setState({bgColor: "white"});
      this.props.getValue(-1 * this.props.value)
    }
  },
  render: function() {
    return <div style={{backgroundColor: this.state.bgColor, border: "1px solid black", height: 40}} onClick={this.clickAdder}>
            {this.props.text} - {this.props.value}
           </div>;
  }
});

// Let's create a component to hold ALL COMPONENTS!
var App = React.createClass({
  render: function () {
    // HelloWorld is nested inside our App component
    // We could also nest a component inside HelloWorld and so on...
    return (
      <div>
        <StopWatch />
        <Search names={["Ryan", "Anu", "Kenan", "Matt"]} />
        <Calculator />
        <HelloWorld name='Tam' color='White' fontSize={30} />
        <Items />
        <Square />
        <Timer />
        <Cross />
      </div>
    );
  }
})

// Props are passed to JSX components as if they were
// HTML attributes

// App is our base component, we'll nest our components inside of it
ReactDOM.render(
  <App />,
  document.getElementById('example')
);
