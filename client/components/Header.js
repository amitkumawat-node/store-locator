import React, { Component } from 'react';

class Header extends Component {

    render(){
        return(
            <div className='store-locator-header'>
                <h2><img src="/images/marker.svg" />Store Locator</h2>
            </div>
        );
    }
}

export default Header;