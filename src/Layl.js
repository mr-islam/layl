import React, { Component } from 'react';
import jsonp from 'jsonp'
import { format, addDays, parse, differenceInMilliseconds, addMilliseconds } from 'date-fns';

function Table (props) {
  return (
    <div>
      <p>You are in: <em>{props.city}, {props.country}</em></p>
      <p>Half the night is at: <em>{props.times}</em></p>
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
      today: new Date(), //TODO: question: set date like this, or set by API return data?
      tomorrow: addDays(new Date(), 1),
      fajr: null,
      maghrib: null,
    }
    this.getTimes = this.getTimes.bind(this)
  }
  getTimes() {
    jsonp(
      `https://muslimsalat.com/weekly.json?key=1f3f533bb4b16343e373be5de3601247s`,
      null, //TODO: use muwaqqit API instead?
      (err, data) => {
        if (err) {
          console.error(err.message)
        } else {
          console.log(`getTimes location: `+data.city)
          console.log(data.items[1].fajr)
        }
        let today = data.items[0].date_for
        let tomorrow = data.items[1].date_for
        let maghrib = parse(`${today} ${data.items[0].maghrib}`)
        let fajr = parse(`${tomorrow} ${data.items[1].fajr}`)
        console.log(maghrib)
        console.log(fajr)
        
        let interval = differenceInMilliseconds(fajr, maghrib) / 6
        console.log(interval)
        let times = []
        for (let i = 0; i < 7; i++) {
          times.push(addMilliseconds(maghrib, i*interval))
        }
        this.setState({
          maghrib,
          fajr,
          today,
          tomorrow,
          times: format(times[3], "hh:mm aa"),
          city: data.city,
          country: data.country,
        })
        console.log(Object.values(times).map((time) => format(time, 'hh mm aa')))
      }
    )
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
        times={this.state.times}
        city={this.state.city}
        country={this.state.country}
        />
      </div>
    )
  }
}

export default Layl 