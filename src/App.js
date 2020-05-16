import React, { Component } from 'react';
import logo from "./logo.svg";
import adhan from "adhan"
import './App.css'
import GitHubButton from 'react-github-btn'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)

function LocationButton (props) {
  return (
    <a className="locButton" onClick={props.geolocate}>Wrong location?</a>
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
  if (!props.reversed) {
    return (
      <div className='layl-container'>
        <img src={logo} alt="Logo"/>
        <Times maghrib={props.maghrib} twoSixth={props.twoSixth} threeSixth={props.threeSixth} 
          fourSixth={props.fourSixth} fiveSixth={props.fiveSixth} sixSixth={props.sixSixth} fajr={props.fajr}/>
        <Location city={props.city} country={props.country} />
        <LocationButton geolocate={props.geolocate}/>
      </div>
    )
  } else {
    return (
      <div className='layl-container'>
        <img src={logo} alt="Logo"/>
        <Times maghrib={props.maghrib} twoSixth={props.twoSixth} threeSixth={props.threeSixth} 
          fourSixth={props.fourSixth} fiveSixth={props.fiveSixth} sixSixth={props.sixSixth} fajr={props.fajr}/>
        <Location city={props.city} country={props.country} />
      </div>
    )
  }
}

function Info () { 
  return (
    <div style={{width:'100vw'}}>
      <div className='first-bottom' >
        <p><a href="#details">How does this work? 👇🏼</a></p></div>
      <div className='second-screen' >
        <div className='text-row'>
          <div className='text-column' >
            <h1 id="details">Why calculate the night?</h1>
            <blockquote>“So perform the regular prayers in the period from the time the sun is 
              past its zenith till the darkness of the night, and [recite] the Qur’an at dawn— 
              dawn recitation is always witnessed— and during the night wake up and pray, 
              as an extra offering of your own, so that your Lord may raise you to a [highly]
              praised status.” <br /><em>(The Quran 17:78-79, as translated by Abdel Haleem)</em></blockquote>
            <p> </p>
            <blockquote>The Messenger of Allah - blessings and peace be upon him, his family, 
              and companions - said, “Our Lord descends to the lowest heaven in the 
              last third of every night, and he says: Who is calling upon me
              that I may answer him? Who is asking from me that I may give
              him? Who is seeking forgiveness that I may forgive him?” <br /><em>(Sahih Bukhari)</em></blockquote>
            <p>These parts of the night lets us follow the lifestyles of the prophets, 
              may peace be upon them all. Divine guidance calls us to sleep parts of the night, 
              and also to wake up and worship during other parts. Worship includes prayer 
              (salah), remembrance (dhikr), Quran recitation, and more. <em>(If you 
              read the Quran on your computer, you can try my other app: <a href="https://qawl.navedislam.com">
              Qawl, the Quran reader for desktop</a>.)</em></p>
            <p>Beyond voluntary worship, these parts of the night are important for duties like 
              praying Isha on time.</p>
            <p><a href="https://www.gettoby.com/p/jfjfjlg8mpw2">Sources and further reading.</a></p>
          </div>
          <div className='text-column' >
            <h1>Details of calculation</h1>
            <p>The Islamic night starts at Maghrib time, right after sunset, and lasts until
              Fajr, which is dawn. The time between them is the night. Our sources mention halves, 
              thirds and sixths as the divisions of the night. Thus we divide the night into 
              six parts (sixths) because it easily converts to halves or thirds.</p>
            <p>The time of Maghrib or Fajr depends on your location. This app automatically finds your 
              location based on your internet connection. But this may be inaccurate based on the 
              network, or completely wrong if you use a VPN. If this happens, press 
              the <em>"Wrong location?"</em> button to share your GPS location with Layl for best accuracy.</p>
            <p>The calculation of Maghrib time is clear and simple in most places. But the 
              calculation of Fajr relies upon different methods. The best method 
              is different in each place, and can change with the seasons too. 
              This app uses a well-tested calculation method with the proven <em>"Adhan"</em> prayer
              calculation software—but it may be incorrect.</p>
            <p> Thus, please <strong>double-check the Maghrib and Fajr times</strong> given by this app – 
              if they are correct then the other times will be correct. Also, safeguard your 
              worship by keeping enough time before or after the times given by any app.</p>
            <p>These warnings aren't pretty, but they're part of 
              responsible app development. May Allah accept our worship, <em>ameen</em>.</p>
          </div>
      </div>
        <div className="footer">
          <p>Made with 💗 by <a href="https://navedislam.com" target="_blank">Naved</a></p>
          <div style={{paddingLeft: '15px', paddingBottom: '10px', color: 'white'}}>
            <GitHubButton href="https://github.com/mr-islam/layl" data-icon="octicon-star" 
              data-show-count="true" aria-label="Star mr-islam/layl on GitHub">Star</GitHubButton>
          </div>
        </div>
      </div>
    </div>
    
  )
}


class Layl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      country: "",
      loading: true,
      times: null,
      today: null,
      tomorrow: null,
      fajr: null,
      maghrib: null,
      lat: null,
      lon: null,
      reversed: false,
    }
    this.locationApi = this.locationApi.bind(this)
    this.geolocate = this.geolocate.bind(this)
  }
  geolocate() {
    if ("geolocation" in navigator) {
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
              reversed: true
            })
          })
      })
    } else {
      /* geolocation IS NOT available */
    }
  }
  locationApi() {
    fetch(`https://geolocation-db.com/json/c2634e30-5d22-11e9-a32f-912b09051755
    `) 
      .then(response => {
        return response.json()
      }).then(json => {
        this.processLoc(json);
      }).catch(ex => {
        console.log('parsing ip failed', ex)
        fetch(`https://extreme-ip-lookup.com/json/`)
          .then(response => {
            return response.json()
          }).then(json => {
            this.processLoc(json);
          }).catch(ex => {
            console.log('parsing ip 2 failed', ex)
          })
      })
  }
  processLoc(json) {
    let city = json.city
    let lat = json.latitude || json.lat
    let lon = json.longitude || json.lon
    let country = json.country_code || json.country
    this.setState({
      city,
      country,
      lat, 
      lon
    })
    console.log('location: '+city)
    this.calcTimes()
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
        loading: false,
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
    this.locationApi()
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
        reversed={this.state.reversed}
        />
        <Info />
      </div>
      )
    } else {
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
