var App = React.createClass({
  getInitialState: function () {
    return { questions: [], currentPage: 1 };
  },
  componentDidMount: function () {
    console.log("App Component is mounted");
    $.ajax({
      url: "http://localhost:3000/api/v1/questions",
      method: "GET",
      error: function () {
        alert("Problem loading question");
      },
      success: function (data) {
        var elements = data.map(function (question) {
          return React.createElement(
            "h2",
            { key: question.id },
            question.title
          );
        });
        console.log(this);
        this.setState({ questions: elements });
      }.bind(this)
    });
  },

  loadMore: function () {
    console.log("Loading more questions");
    var newPage = this.state.currentPage + 1;
    $.ajax({
      url: "http://localhost:3000/api/v1/questions?page=" + newPage,
      method: "GET",
      error: function () {
        alert("Couldn't load more questions");
      },
      success: function (data) {
        var elements = data.map(function (question) {
          return React.createElement(
            "h2",
            { key: question.id },
            question.title
          );
        });
        this.setState({ questions: this.state.questions.concat(elements), currentPage: newPage });
      }.bind(this)
    });
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Awesome Answers"
      ),
      this.state.questions,
      React.createElement(
        "a",
        { href: "javascript:void(0);", onClick: this.loadMore },
        "Load More..."
      )
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('main-container'));