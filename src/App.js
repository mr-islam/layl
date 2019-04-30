import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import logo from "./logo.svg";
dayjs.extend(customParseFormat)


function Table (props) {
  return (
    <div>
      <img src={logo} alt="Logo"/>
      <p>You are in: <strong>{props.city}, {props.country}</strong></p> {/*TODO: make a resusable component for each line */}
      <p>Half the night is at: <strong>{props.first_third}</strong></p>
      <p>The last third of the night starts at: <strong>{props.last_third}</strong></p>
    </div>
  )
}

class Layl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      country: "",
      times: "Loading…",
      today: null, //TODO: question: set date like this, or set by API return data?
      tomorrow: null,
      fajr: null,
      maghrib: null,
    }
    this.getTimes = this.getTimes.bind(this)
  }
  getTimes() {
    fetchJsonp(`https://extreme-ip-lookup.com/json/`)
      .then(response => {
        return response.json()
      }).then(json => {
        let city = json.city
        console.log('location: '+city)
        this.callApi(city)
      }).catch(ex => {
        console.log('parsing failed', ex)
      })
  }
  callApi(city) {
    fetchJsonp(`https://muslimsalat.com/${city}/weekly.json?key=1f3f533bb4b16343e373be5de3601247s`)
      .then(response => {
        console.log(response)
        return response.json()
      }).then(json => {
        console.log('parsed json', json)
        console.log(json.city)
        console.log(json.items[1].fajr)
        let today = json.items[0].date_for
        let tomorrow = json.items[1].date_for
        let maghrib = dayjs(`${today} ${json.items[0].maghrib}`, "YYYY-M-D h:mm a")
        let fajr = dayjs(`${tomorrow} ${json.items[1].fajr}`, "YYYY-M-D h:mm a")
        console.log(maghrib)
        console.log(fajr)
        
        let interval = fajr.diff(maghrib, 'millisecond') / 6
        console.log(interval)
        let times = []
        for (let i = 0; i < 7; i++) {
          times.push(maghrib.add(interval * i, 'millisecond'))
        }
          this.setState({
          maghrib,
          fajr,
          today,
          tomorrow,
          first_third: times[3].format('h:mm a'),
          last_third: times[4].format('h:mm a'),
          city: json.city,
          country: json.country,
        })
        console.log(Object.values(times).map((time) => time.format('h:mm a')))
      }).catch(ex => {
        console.log('parsing failed', ex)
      })
  }
  componentDidMount() {
    this.getTimes()
    }
  componentDidUpdate() {
  }
  render() {
    return (
      <div>
        <Table 
        first_third={this.state.first_third}
        last_third={this.state.last_third}
        city={this.state.city}
        country={this.state.country}
        />
      </div>
    )
  }
}

export default Layl