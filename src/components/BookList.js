import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBooksQuery} from '../queries/queries'

import BookDetails from '../components/BookDetails'

class BookList extends Component {
    constructor(props){
        super()
    }

    displayBooks() {
        let data = this.props.data
        if (data.loading) {
            return(<div>Loading</div>);
        } else {
            return data.books.map((book, index) => 
            <li key={index}>
                {book.name}
            </li>)
        }
    }

    render() {
        return (
            <div>
                <ul>
                    { this.displayBooks() }
                </ul>
                <BookDetails />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);