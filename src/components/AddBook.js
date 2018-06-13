import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    displayAuthors() {
        let data = this.props.getAuthorsQuery
        if (data.loading) {
            return (<option>Loading Authors...</option>);
        } else {
            return data.authors.map((author, index) =>
                <option key={index} value={author.id}>{author.name}</option>
            )
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.submitForm }>
                    <div>
                        <label>Book name:</label>
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div>
                        <label>Genre:</label>
                        <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                    </div>
                    <div>
                        <label>Author</label>
                        <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                            <option value="">Select author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button>Add Book</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"}),
)(AddBook);