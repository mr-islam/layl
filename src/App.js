import React, { Component } from 'react';
import logo from "./logo.svg";
import adhan from "adhan"
import './App.css'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)


function Table (props) { // TODO: Breakup the table into surroinding things like logo, and the actual times
  return (
    <div className='layl-container'>
      <img src={logo} alt="Logo"/>
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
      <p><em>You are in {props.city}, {props.country}</em></p> {/*TODO: make a resusable component for each line */}
    </div>
  )
}

function Info () { //TODO: move texts to a different file
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
          </div>
          <div className='text-column' >
            <h1>Details of calculation</h1>
            <p>The Islamic night starts at Maghrib time, right after sunset, and lasts until
              Fajr, which is dawn. The time between them is the night. Our sources mention halves, 
              thirds and sixths as the divisions of the night. Thus we divide the night into 
              six parts (sixths) because it easily converts to halves or thirds.</p>
            <p>The time of Maghrib or Fajr depends on your location. This app finds your 
              location based on your IP address. But this may be inaccurate based on your 
              internet setup, or completely wrong if you use a VPN. Other options for determining 
              location will be added later, <em>insha Allah</em>.</p>
            <p>The calculation of Maghrib time is clear and simple in most places. But the 
              calculation of Fajr relies upon different methods. The best method 
              is different in each place, and can change with the seasons too. 
              This app uses a well-tested calculation method with the proven <em>"Adhan"</em> prayer
              calculation software—but it may be incorrect. 
              Thus, <strong>please safeguard your worship by keeping enough 
              time before or after the times given by this app</strong>.</p>
            <p>These warnings aren't pretty, but they're part of 
              responsible app development. May Allah accept our worship, <em>ameen</em>.</p>
            <p><a href="https://www.gettoby.com/p/jfjfjlg8mpw2">Sources and further reading.</a></p>
          </div>
      </div>
        <div className="footer">
          <p>Made with 💗 by <a href="https://navedislam.com" target="_blank">@mrislam_</a></p>
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
      times: null,//
      today: null, //TODO: question: set date like this, or set by API return data?
      tomorrow: null,
      fajr: null,
      maghrib: null,
    }
    this.getTimes = this.getTimes.bind(this)
  }
  processLoc(json) {
    let city = json.city
    let lat = json.lat
    let lon = json.lon
    let country = json.country
    console.log('location: '+city)
    this.callApi(city, lat, lon, country)
  }
  getTimes() { //TODO: store location as a cookie, so no unnecessary fetches. that allows offline functionality, in addition to just geolocation anyway!!
    fetch(`https://extreme-ip-lookup.com/json/`)
      .then(response => {
        return response.json()
      }).then(json => {
        this.processLoc(json);
      }).catch(ex => {
        console.log('parsing ip failed', ex)
        fetch(`https://geoip-db.com/json/c2634e30-5d22-11e9-a32f-912b09051755`)
          .then(response => {
            return response.json()
          }).then(json => {
            this.processLoc(json);
          }).catch(ex => {
            console.log('parsing ip 2 failed', ex)
            //TODO: add geolocation API call, then run callApi
          })
      })
  }
  callApi(city, lat, lon, country) {
      let coordinates = new adhan.Coordinates(lat, lon)
      let today = new Date()
      let tomorrow = new Date()
      tomorrow.setDate(today.getDate()+1)
      var params = adhan.CalculationMethod.MoonsightingCommittee()
      console.log(city)
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
        city,
        country
      })
  }
  componentDidMount() {
    this.getTimes()
    }
  componentDidUpdate() {
  }
  render() { //TODO: instead of the table, show a loading variable only.
    if (this.state.loading) {
      return (
      <div>
        <span>Loading…</span>
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
        />
        <Info />
      </div>
      )
    }
  }
}

export default Layl