const React = require('react')
const Comment = require('./Comment')

const CommentList = React.createClass({
  render: function() {
    let commentNodes = this.props.data.map(function(comment) {
      return(
        <Comment author={comment.author} key={comment.id} text={comment.text} />
      );
    });
   return (
     <div className="commentList">
       {commentNodes}
     </div>
   );
  }
})

module.exports = CommentList
