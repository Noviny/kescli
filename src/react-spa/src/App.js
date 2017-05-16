import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';
console.log(fetch);

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            userData: []
        };
    }

    fetchUserData() {
        fetch('/users')
            .then(r => r.json())
            .then(r => this.setState({ userData: r }))
            .catch(e => console.log('errar', e));
    }

    render() {
        return (
            <div>
                <p>Let us go then, you and I,</p>
                <p>When the evening is spread out against the sky</p>
                <button onClick={() => this.fetchUserData()}>
                    Fetch User Data
                </button>
                {this.state.userData.map(user => (
                    <ul key={user._id}>
                        <li>Name: {user.displayName}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                ))}
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
