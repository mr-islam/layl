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
      today: new Date(), //TODO: question: set date like this, or set by API return data?
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
  getTimes() {
    jsonp(
      `http://muslimsalat.com/${this.state.city}/weekly.json?key=1f3f533bb4b16343e373be5de3601247s`,
      null,
      (err, data) => {
        if (err) {
          console.error(err.message)
        } else {
          console.log(`getTimes location: `+data.city)
          console.log(data.items[0])
        }
        let maghrib = parse(`${format(this.state.today, "YYYY-MM-DD")} ${data.items[0].maghrib}`)
        let fajr = parse(`${format(this.state.tomorrow, "YYYY-MM-DD")} ${data.items[1].fajr}`)
        console.log(maghrib)
        this.setState({
          maghrib,
          fajr,
        })
        let interval = differenceInMilliseconds(fajr, maghrib) / 6
        console.log(interval)
        let times = [fajr, maghrib, maghrib, maghrib, maghrib, maghrib, maghrib]
        console.log(times.map((time) => addMilliseconds(time, interval)))
      }
    )
  }
  componentDidMount() {
    this.getLocation()
    }
  componentDidUpdate() {
    if (this.state.maghrib === null) {
      this.getTimes()
    } else if (this.state.maghrib !== null) {
      console.log('yay')
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