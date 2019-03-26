import React, { Component } from 'react';
import jsonp from 'jsonp'
import { format, addDays, parse, differenceInMilliseconds, addMilliseconds } from 'date-fns';
//import { getLocation } from './getLocation';

function Table (props) {
  return (
    <div>
      <p>{props.times}</p>
      <p>{props.city}</p>
    </div>
  )
}

class Layl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      times: "",
      today: new Date(),
      tomorrow: addDays(new Date(), 1),
      fajr: null,
      maghrib: null,
    }
    this.getLocation = this.getLocation.bind(this)
    this.getTimes = this.getTimes.bind(this)
  }
  getLocation() {
    jsonp(`
    http://ip-api.com/json?fields=city`, 
    null, 
    (err, data) => {
      if (err) {
        console.error(err.message)
      } else {
        console.log(`getLocation location: `+data.city)
        this.setState({
          city: data.city
        })
      }
    }
    )
  }
  getTimes(date) {
    jsonp(
      `http://muslimsalat.com/${this.state.city}/daily/${date}.json?key=1f3f533bb4b16343e373be5de3601247s`,
      null,
      (err, data) => {
        if (err) {
          console.error(err.message)
        } else {
          console.log(`getTimes location: `+data.city)
          console.log(data.items[0])
          console.log('l')
        }
        let maghrib = data.items[0].maghrib
        let fajr = data.items[1].fajr
        this.setState({
          maghrib,
          fajr,
        })
        let interval = differenceInMilliseconds(maghrib, fajr) / 6
        console.log(interval)
        // let times = []
        // for (let i = 0; i < 7; i++) {
        //   times.push(addMilliseconds((this.state.maghrib), i*interval))
        // }
        // console.log(times)
      }
    )
  }
  componentDidMount() {
    this.getLocation()
    }
  componentDidUpdate() {
    if (this.state.maghrib === null) {
      this.getTimes(format(this.state.today, "DD-MM-YYYY"))
      this.getTimes(format(this.state.tomorrow, "DD-MM-YYYY"))
    }
  }
  render() {
    return (
      <div>
        <Table 
        times={this.state.times}
        city={this.state.city}
        />
      </div>
    )
  }
}

export default Layl 