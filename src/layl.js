import React, { Component } from 'react';
import jsonp from 'jsonp'
import { format, addDays, parse, differenceInMilliseconds, addMilliseconds } from 'date-fns';

function Table (props) {
  return (
    <div>
      <p>You are in: <em>{props.city}</em></p>
      <p>Half the night is at: <em>{props.times}</em></p>
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
          times: format(times[3], "hh:mm aa")
        })
        console.log(Object.values(times).map((time) => format(time, 'hh mm aa')))
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