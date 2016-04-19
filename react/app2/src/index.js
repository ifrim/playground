import CommentBox from './comment-box';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <CommentBox url="/api/comments.json" />,
    document.getElementById('app')
);