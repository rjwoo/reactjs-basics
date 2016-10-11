var Shape = function (props) {
  var styles = {
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      width: props.width,
      height: props.height,
      display: 'inline-block'
  };

  var handler = function(){
    props.clickHandler(props.randomNumber);
  }

  return <div style={styles} onClick={handler}>{props.randomNumber}</div>;
}

var Circle = React.createClass({
  shapeClickHandler: function(number) {
    console.log("Clicked on a Circle shape with number" + number);
    this.props.squareSetSelected(number);
  },
  render: function(){
    return (
      <Shape
        clickHandler={this.shapeClickHandler}
        backgroundColor={this.props.backgroundColor}
        width={this.props.diameter}
        height={this.props.diameter}
        randomNumber={Math.ceil(Math.random() * 100)}
        borderRadius='50%' />
    );
  }
});

var Square = React.createClass({
  getInitialState: function () {
    return {
      backgroundColor: 'Grey',
      selectedNumber:  "?"
    }
  },
  setSelectedNumber: function(number){
    this.setState({selectedNumber: number});
  },
  render: function () {
    var styles = {
      backgroundColor: this.state.backgroundColor,
      width: this.props.width,
      height: this.props.height,
      textAlign: "center"
    };

    var halfHeight = (this.props.height / 2);

    return (
      <div style={styles}>
        <Circle backgroundColor='Red' diameter='30px' squareSetSelected={this.setSelectedNumber}/>
        <Circle backgroundColor='Red' diameter='30px' squareSetSelected={this.setSelectedNumber}/>
        <Circle backgroundColor='Blue' diameter='30px' squareSetSelected={this.setSelectedNumber}/>
        <Circle backgroundColor='Yellow' diameter='30px' squareSetSelected={this.setSelectedNumber}/>
        <div style={{fontSize: 40, paddingTop: "50%"}}>{this.state.selectedNumber}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <Square bgColor='Gainsboro' width='600px' height='600px' />,
  document.getElementById('exercise')
);
