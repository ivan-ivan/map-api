import React, { Component } from 'react';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          coords: {}
        };
        this.getCoords = this.getCoords.bind(this);
    }

    getCoords() {
        const cityName = this.inputValue.value;
        if (!cityName) {
            return;
        }
        const url = `/coords/${cityName}`;

        fetch(url)    
          .then(data => data.json())
          .then(data => this.setState({ coords: data }))
          .catch(error => console.log(`Error: ${error}`));
    }

    render() {
      return (
        <section>
          <section>
            <input type="text" placeholder="put your city's name here" ref={input => this.inputValue = input} />
            <button type="button" onClick={this.getCoords}>Get coordinates</button>
          </section>
          <section>
              {
                this.state.coords.lat &&
                  <div>
                    <div>Here's {this.inputValue.value} coords</div>
                    <span>{this.state.coords.lat}</span><span>{this.state.coords.lng}</span>
                  </div>
              }
          </section>
        </section>
        );
    } 
}
