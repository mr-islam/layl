import React, { Component } from 'react';
import logo from "./logo.svg";
import adhan from "adhan"
import './App.css'
import Info from './Info.jsx'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)



function LocationButtonBig (props) {
  return (
    <button className="buttonBig" onClick={props.geolocate}>Calculate for My Location</button>
  )
}
function LocationButtonSmall (props) {
  return (
    <button className="buttonSmall" onClick={props.geolocate}>Update Location</button>
  )
}

function Location (props) {
  return (
    <div style={{textAlign: "center"}}>
      <p><em>You are in {props.city}, {props.country}</em></p>
    </div>
  )
}

function Times (props) {
  return (
    <div className='times-container'>
      <ul>
        <li className="zero">Maghrib starts the night: <strong>{props.maghrib}</strong></li>
        <li className="one">One-sixth of the night: <strong>{props.twoSixth}</strong> </li>
        <li className="two">One-third of the night: <strong>{props.threeSixth}</strong></li>
        <li className="three">Half of the night: <strong>{props.fourSixth}</strong></li>
        <li className="four">Last-third of the night: <strong>{props.fiveSixth}</strong></li>
        <li className="five">Last-sixth of the night: <strong>{props.sixSixth}</strong></li>
        <li className="six">Fajr ends the night: <strong>{props.fajr}</strong></li>
      </ul>
    </div>
  )
}

function Table (props) {
    return (
      <div className='layl-container'>
        <img src={logo} alt="Logo"/>
        <Times maghrib={props.maghrib} twoSixth={props.twoSixth} threeSixth={props.threeSixth} 
          fourSixth={props.fourSixth} fiveSixth={props.fiveSixth} sixSixth={props.sixSixth} fajr={props.fajr}/>
        <Location city={props.city} country={props.country} />
        <LocationButtonSmall geolocate={props.geolocate}/>
      </div>
    )
}


class Layl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      country: "",
      loading: false,
      times: null,
      today: null,
      tomorrow: null,
      fajr: null,
      maghrib: null,
      lat: null,
      lon: null,
      reversed: false,
    }
    this.geolocate = this.geolocate.bind(this)
  }
  geolocate() {
    if ("geolocation" in navigator) {
      this.setState({loading: true})
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        this.calcTimes()
        let geo = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${this.state.lat}%2C${this.state.lon}%2C150&mode=retrieveAddresses&gen=9&app_id=oye7XL09Prx5G64NrSE8&app_code=-Dw2OYlGw40jZwCC_UGvKg`
        fetch(geo).then(response => response.json())
          .then(result => {
            let location = result.Response.View[0].Result[0].Location.Address
            console.dir(location)
            this.setState({
              city: location.City,
              country: location.Country,
              reversed: true,
              loading: false
            })
          })
      })
    } else {
      alert("I'm very sorry, but it looks like this web browser does not support GPS… can you please come back again with an updated browser 😌?");
    }
  }
  calcTimes() {
      let coordinates = new adhan.Coordinates(this.state.lat, this.state.lon)
      let today = new Date()
      let tomorrow = new Date()
      tomorrow.setDate(today.getDate()+1)
      var params = adhan.CalculationMethod.MoonsightingCommittee()
      let prayerTimesToday = new adhan.PrayerTimes(coordinates, today, params)
      let prayerTimesTomorrow = new adhan.PrayerTimes(coordinates, tomorrow, params)
      console.log(prayerTimesTomorrow)

      let maghrib = dayjs(prayerTimesToday.maghrib)
      let fajr = dayjs(prayerTimesTomorrow.fajr)
      console.log(maghrib)
      console.log(fajr)
      
      let interval = fajr.diff(maghrib, 'millisecond') / 6
      console.log(interval)
      let times = []
      for (let i = 0; i < 7; i++) {
        times.push(maghrib.add(interval * i, 'millisecond'))
      }
      console.log(times)
      let timeFormat = "h:mm a"
      this.setState({
        today,
        tomorrow,
        maghrib: times[0].format(timeFormat),
        twoSixth: times[1].format(timeFormat),
        threeSixth: times[2].format(timeFormat),
        fourSixth: times[3].format(timeFormat),
        fiveSixth: times[4].format(timeFormat),
        sixSixth: times[5].format(timeFormat),
        fajr: times[6].format(timeFormat),
      })
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    if (this.state.loading) {
      return (
      <div>
        <div style={{textAlign: "center"}}>
         <p className="loading">Loading…</p>
        </div>
        
        <Info />
      </div>
      )
    } 
    if (!this.state.reversed) {
      return (
        <div className='layl-container'>
          <img src={logo} alt="Logo"/>
          <p>As salamu alaykum 👋</p>
          <p>Calculating prayer times depends on where you are – please share your location 
            to find out the divisions of the night!
          </p>
          <LocationButtonBig geolocate={this.geolocate}/>
          <Info />

      </div>
      )
    }
    else {
      return (
      <div>
        <Table 
        twoSixth={this.state.twoSixth}
        threeSixth={this.state.threeSixth}
        fourSixth={this.state.fourSixth}
        fiveSixth={this.state.fiveSixth}
        sixSixth={this.state.sixSixth}
        city={this.state.city}
        country={this.state.country}
        maghrib={this.state.maghrib}
        fajr={this.state.fajr}
        geolocate={this.geolocate}
        reversed={this.state.reversed}
        />
        <Info />
      </div>
      )
    }
  }
}

export default Layl
