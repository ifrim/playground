import React from 'react';
import CommentList from './comment-list';
import CommentForm from './comment-form';

let comments = [
	{id: 1, name: 'Vlad', comment: 'Just a comment'},
	{id: 2, name: 'Mihai', comment: 'Just another comment'}
];

export default React.createClass({

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

	getInitialState: function() {
		return {data: []}
	},

	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, 5000);
	},

	handleCommentSubmit: function(author, text) {
		console.log('comment submitted', author, text);
	},

	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList comments={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});