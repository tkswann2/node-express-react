const React = require('react')


var data = [
        {id: 1, author: "Pete Hunt", text: "This is one comment"},
        {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
      ];
const CommentBox = React.createClass({
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    // this comment arg is data coming from child CommentForm
    handleCommentSubmit: function(comment) {
      console.log('Hello from the handleCommentSubmit function!', comment);
      var comments = this.state.data;
      // this is so we don't have to wait on server response
      // Optimistically set an id on the new comment. It will be replaced by an
      // id generated by the server. In a production application you would likely
      // not use Date.now() for this and would have a more robust system in place.
      comment.id = Date.now();
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});
      // $.ajax({
      //   url: this.props.url,
      //   dataType: 'json',
      //   type: 'POST',
      //   data: comment,
      //   success: function(data) {
      //     this.setState({data: data});
      //   }.bind(this),
      //   error: function(xhr, status, err) {
      //     // if request fails, load prexisting data and re-render
      //     this.setState({data: comments})
      //     console.error(this.props.url, status, err.toString());
      //   }.bind(this)
      // });
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadCommentsFromServer();
      // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments: </h1>
          {this.props.children}
        </div>
      );
    }
})

module.exports = CommentBox

// <CommentList data={this.state.data}/>
// <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
