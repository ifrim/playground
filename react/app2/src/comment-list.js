import React from 'react';
import Comment from './comment';

export default React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
        {this.props.comments.map(function(comment) {
            return (
                <Comment key={comment.id} author={comment.name}>{comment.comment}</Comment>
            );
        })}
      </div>
    );
  }
});