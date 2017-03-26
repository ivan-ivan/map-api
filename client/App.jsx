import React, { Component } from 'react';

export class App extends Component {
    constructor(props) {
        super(props);
        this.getCoords = this.getCoords.bind(this);
    }

    getCoords() {
        const cityName = this.inputValue.value;
        const url = `/coords/${cityName}`;

        fetch(url)    
            .then(data => data.json())
            .then(data => data)
            .catch(error => console.log(`Error: ${error}`));
    }

    render() {
        return (
            <section>
                <input type="text" placeholder="put your city's name here" ref={input => this.inputValue = input} />
                <button type="button" onClick={this.getCoords}>Get coordinates</button>
            </section>    
        );
    } 
}
