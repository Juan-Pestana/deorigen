import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {

    constructor() {
        super()
        this.state = {
            storeName : "",
            center : {},
            
 


        }
      
    }

    componentDidMount = () => {
      
        this.props.location && this.setStoreLocation()
        
    
    }


    setStoreLocation = () =>{
    
        this.setState({storeName : this.props.storeName,
                        center: {
                            lat: this.props.location[1],
                            lng: this.props.location[0]
                        }})
    } 

 
  

  render() {

    const style = {
        width: this.props.style.width,
        height: this.props.style.height
      }
   

    

    return (
        <>
         <Map
        google={this.props.google}
        style={style}
        initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
        center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng
            }}
        zoom={15}
        onClick={this.onMapClicked}
      >
 
        <Marker 
                onClick={this.onMarkerClick}
                name={this.state.storeName}
                position = {this.state.center} 
                icon={{
                  url: "https://res.cloudinary.com/pestana/image/upload/v1602604357/deorigen/marker_zi7cwi.png",
                  scaledSize: new this.props.google.maps.Size(40,40)}}
                />
 
        
      </Map>
        </>
       
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)