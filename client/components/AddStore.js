import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Stores from '../services/store';
class AddStore extends Component{
	constructor(props)
	{
		super(props);
		this.state={
			location_center:{
				lat:26.9124,
				lng:75.7873
			},
    		name:null,
    		address:null,
    		location:[],
    		modal:false,
			zoom: 13,
    		mapTypeId: 'roadmap',
    		place_formatted: '',
			place_id: '',
			place_location: ''
		}
		this.addStore = this.addStore.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.hideAlert = this.hideAlert.bind(this);
	}
	handleChangeName(e)
	{
		this.setState({
			name:e.target.value
		})
	}
	addStore(latitude, longitude, name, address)
	{
		var data= {
			location:[longitude, latitude],
			name: name,
			address: address
		}
		Stores.addStore(data, (err, success) => {
			if(success)
            {
                const getAddAlert = () => (
                    <SweetAlert 
                        success 
                        title="Woot!" 
                        onConfirm={this.hideAlert} 
                    > 
                    Store has been added
                    </SweetAlert>
                );
                this.setState({
                    alert: getAddAlert(),
                    name:null,
                    address:null,
                    location:[]
                });
            }
            else
            {
                const getAddAlert = () => (
                    <SweetAlert 
                        error 
                        title="OOps!" 
                        onConfirm={this.hideAlert} 
                    > 
                    Server unable to add store !
                    </SweetAlert>
                );
                this.setState({
                    alert: getAddAlert()
                });
            }
		})
	}
	hideAlert()
	{
		this.setState({
			alert:null
		})
	}
	handleSubmit(e)
	{
		e.preventDefault();
		if(this.state.name && this.state.address && this.state.location)
		{
			this.addStore(this.state.location[1], this.state.location[0], this.state.name, this.state.address)
		}
	}
	componentDidMount()
	{
		let map = new window.google.maps.Map(document.getElementById('map'), {
      		center: this.state.location_center,
      		zoom: this.state.zoom,
      		mapTypeId: this.state.mapTypeId,
      		styles: this.state.styles
    	});
    	var infoWindow = new window.google.maps.InfoWindow;
    	let marker = new window.google.maps.Marker({
	  		map: map,
	  		position: this.state.location_center,
	  		label: 'key'
		});
		
		
    	
    	let inputNode = document.getElementById('place_input');
		let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
		autoComplete.addListener('place_changed', () => {
		  let place = autoComplete.getPlace();
		  let location = place.geometry.location;

		  this.setState({
		    address: place.formatted_address,
		    place_id: place.place_id,
		    center: location.toJSON(),
		    location:[location.toJSON().lng, location.toJSON().lat]
		  });
		  console.log(this.state, location.toJSON())
		  // bring the selected place in view on the map
		  map.fitBounds(place.geometry.viewport);
		  map.setCenter(location);
		  marker.setPlace({
		    placeId: place.place_id,
		    location: location,
		  });
		});
	}
	render(){
		return(
			<div className="Store-container">
				{this.state.alert}
				<Header />
				<div className="place-search-container">
					<input className="store-name" type="text" onChange={(e) => this.handleChangeName(e)} value={this.state.name} placeholder="Enter a store name" />
					<input id='place_input' type='text' placeholder='Enter a location' />
					<button className="submit-btn"onClick={(e) => this.handleSubmit(e)}>Add Store</button>
				</div>
				<div className="map-container">
					<div id="map" style={{ height: '80vh', width: '100%' }}></div>
				</div>
				<Footer />
			</div>
		)
	}
}

export default AddStore;