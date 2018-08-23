import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Store from '../services/store';
import { Link } from 'react-router-dom';
class Stores extends Component{
	constructor(props)
	{
		super(props);
		this.state={
			location:{
				lat:26.9124,
				lang:75.7873
			},
			center : {
      			lat: 26.9124,
      			lng: 75.7873
    		},
			radius:5000,
			stores:[],
			zoom: 13,
    		mapTypeId: 'roadmap',
    		place_formatted: '',
			place_id: '',
			place_location: ''
		}
		this.getNearByStores = this.getNearByStores.bind(this);
		this.createMarker = this.createMarker.bind(this);
		this.placeChangeListner = this.placeChangeListner.bind(this);
	}
	getNearByStores(latitude=this.state.latitude, longitude=this.state.longitude, radius=this.state.radius)
	{
		var data= {
			latitude: latitude,
			longitude: longitude,
			radius: radius
		}
		console.log(data)
		Store.getNearByStore(data, (err, stores) => {
			console.log('data', stores)
			this.setState({
				stores: stores
			})
			stores.map((store, k) => {
				this.createMarker({lat:store.location[1], lng:store.location[0]});
			})
		})
	}
	createMap()
	{
		let map = new window.google.maps.Map(document.getElementById('map'), {
      		center: this.state.center,
      		zoom: this.state.zoom,
      		mapTypeId: this.state.mapTypeId,
      		styles: this.state.styles
    	});
    	return map;
	}
	createMarker(location)
	{
		
		let marker = new window.google.maps.Marker({
	  		map: this.state.map,
	  		position: location,
	  		label: 'key'
		});
	}
	placeChangeListner(autoComplete, map)
	{
		console.log(autoComplete)
		let place = autoComplete.getPlace();
		let location = place.geometry.location;

		this.setState({
			place_formatted: place.formatted_address,
		    place_id: place.place_id,
		    place_location: location.toString(),
		    center: location.toJSON()
		});
		console.log(location)
		map.fitBounds(place.geometry.viewport);
		map.setCenter(location);
		this.getNearByStores(location.toJSON().lat, location.toJSON().lng);
	}
	componentDidMount()
	{
		let map = new window.google.maps.Map(document.getElementById('map'), {
      		center: this.state.center,
      		zoom: this.state.zoom,
      		mapTypeId: this.state.mapTypeId,
      		styles: this.state.styles
    	});
    	this.setState({
    		map: map
    	})
    	
    	let inputNode = document.getElementById('place_input');
		//map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
		let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
		autoComplete.addListener('place_changed', () => {
			this.placeChangeListner(autoComplete, map);
		});
		this.getNearByStores();
	}
	render(){
		return(

			<div className="Store-container">
				<Header />
				<div className="place-search-container">
					<input id='place_input' type='text' placeholder='Enter a location' />
					<Link to="/map/add-store" className="btn-nav">Add New Store</Link>
				</div>
				<div className="map-container">
					<div id="map" style={{ height: '80vh', width: '100%' }}></div>
				</div>
				<Footer />
			</div>
		)
	}
}

export default Stores;