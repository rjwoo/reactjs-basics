var Shape = function (props) {
  var styles = {
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    width: props.width,
    height: props.height,
    display: 'inline-block'
  };

  var handler = function () {
    props.clickHandler(props.randomNumber);
  };

  return React.createElement(
    'div',
    { style: styles, onClick: handler },
    props.randomNumber
  );
};

var Circle = React.createClass({
  shapeClickHandler: function (number) {
    console.log("Clicked on a Circle shape with number" + number);
    this.props.squareSetSelected(number);
  },
  render: function () {
    return React.createElement(Shape, {
      clickHandler: this.shapeClickHandler,
      backgroundColor: this.props.backgroundColor,
      width: this.props.diameter,
      height: this.props.diameter,
      randomNumber: Math.ceil(Math.random() * 100),
      borderRadius: '50%' });
  }
});

var Square = React.createClass({
  getInitialState: function () {
    return {
      backgroundColor: 'Grey',
      selectedNumber: "?"
    };
  },
  setSelectedNumber: function (number) {
    this.setState({ selectedNumber: number });
  },
  render: function () {
    var styles = {
      backgroundColor: this.state.backgroundColor,
      width: this.props.width,
      height: this.props.height,
      textAlign: "center"
    };

    var halfHeight = this.props.height / 2;

    return React.createElement(
      'div',
      { style: styles },
      React.createElement(Circle, { backgroundColor: 'Red', diameter: '30px', squareSetSelected: this.setSelectedNumber }),
      React.createElement(Circle, { backgroundColor: 'Red', diameter: '30px', squareSetSelected: this.setSelectedNumber }),
      React.createElement(Circle, { backgroundColor: 'Blue', diameter: '30px', squareSetSelected: this.setSelectedNumber }),
      React.createElement(Circle, { backgroundColor: 'Yellow', diameter: '30px', squareSetSelected: this.setSelectedNumber }),
      React.createElement(
        'div',
        { style: { fontSize: 40, paddingTop: "50%" } },
        this.state.selectedNumber
      )
    );
  }
});

ReactDOM.render(React.createElement(Square, { bgColor: 'Gainsboro', width: '600px', height: '600px' }), document.getElementById('exercise'));