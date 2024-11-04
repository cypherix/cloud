import React, { Component } from 'react';

class Hello extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Yogesh'
        }
    }

    componentDidMount(){
        console.log('Component Mounted');
    }

    componentWillUnmount(){
        console.log('Component UnMounted');
    }
    componentDidUpdate(){
        console.log('Component Updated');
    }
    shouldComponentUpdate(){
        console.log('Should Component Update');
        return true;
    }
    render() {
        return (
            <div>
                <h1>Hello {this.state.name}</h1>
            </div>
        );
    }
}