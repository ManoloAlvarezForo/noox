import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
    constructor(props){
        super()
    }
    render() {
        return (
            <div>
               <p>Book details</p>
            </div>
        )
    }
}

export default graphql(getBookQuery)(BookDetails);