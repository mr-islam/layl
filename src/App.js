import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import logo from "./logo.svg";
dayjs.extend(customParseFormat)


function Table (props) {
  return (
    <div style={{height:'45vh'}}>
      <img src={logo} alt="Logo"/>
      <p>The night (¹⁄6) starts at <em>Maghrib</em>: <strong>{props.maghrib}</strong></p>
      <p>Second sixth (2⁄6) starts at: <strong>{props.twoSixth}</strong> </p>
      <p>First third ends, second third (3⁄6) begins: <strong>{props.threeSixth}</strong></p>
      <p>First half ends, second half (4⁄6) begins: <strong>{props.fourSixth}</strong></p>
      <p>Second third ends, last third (5⁄6) begins: <strong>{props.fiveSixth}</strong></p>
      <p>Last sixth (6⁄6) of the night starts at: <strong>{props.sixSixth}</strong></p>
      <p>The night ends at <em>Fajr</em>: <strong>{props.fajr}</strong></p>
      <p>You are in: <strong>{props.city}, {props.country}</strong></p> {/*TODO: make a resusable component for each line */}
    </div>
  )
}

function Info () {
  return (
    <div style={{width:'100vw'}}>
      <div style={{position: 'absolute',bottom:'0%', width:'100%',textAlign:'center'}}>How does this work? 👇🏼
      </div>
      <div style={{position: 'absolute',top:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', textAlign:'left', width:'46%', margin:'2%'}}>
            <h1>Why calculate the night?</h1>
            <p>The night is really significant for the believer, host to great times for worship and 
              prayer:</p>
            <blockquote>“Be ever steadfast in ⸢observing⸣ the Prayer at the declining of the sun, 
              until the darkening of the night. Moreover, ⸢hold fast to⸣ the Quran's recitation 
              at the dawn ⸢Prayer⸣. Indeed, the recitation at dawn is ever witnessed ⸢by hosts of 
              angels and believers⸣” (The Gracious Qur’an, 17:78-79).</blockquote>
            <blockquote>The Messenger of God - blessings and peace be upon him, his family, 
              and companions - said, “Hold fast to night prayer, for it was the way of 
              the righteous before you, a way of drawing closer to your Lord, an expiation 
              for wrong deeds, and a shield from sin” (Tirmidhi).</blockquote>
            <p>Although any prayer performed after the Isha prayer qualifies as the 
              virtuous night prayer, the most virtuous time is in it’s later parts.</p>
            <p>Additionally, knowing these divisions of the night allows us to follow the 
              sleep and worship lifestyles of the prophets, may peace be upon them all.</p>
            <p>More than just virtue, it is important to know divisions of the night so we 
              may fulfill obligations like the Isha prayer within the right time.</p>
            <p><a href="https://www.gettoby.com/p/jfjfjlg8mpw2">Sources and further reading.</a></p>
          </div>
          <div style={{display:'flex', flexDirection:'column', textAlign:'left', width:'46%', margin:'2%'}}>
            <h1>Details of calculations</h1>
            <p>The night is defined to begin at the time of Maghrib prayer, right after sunset, 
              and lasts till the start of Fajr time, which is dawn. As mentioned previously, 
              dividing the night into sixths provides the most flexibility and so we will 
              follow that method.</p>
            <p>Maghrib marks the beginning of the first-sixth of the night and Fajr is the 
              end of the last-sixth of the night. Dividing the length of night by six gives 
              the length of one-sixth of the night. That value can be added to Maghrib time 
              to find the start of the second-sixth of the night. Then, adding the length of 
              one-sixth of the night to the start of the second-sixth of night gives the beginning 
              of the third-sixth of the night, and so on.</p>
            <p>This website determines your location automatically based on your IP address, 
              and finds the appropriate times for your location. Note, this may be slightly 
              inaccurate depending on internet configuration or completely wrong if using a VPN. 
              Other options for determining location will be added later, by the Grace of God.</p>
            <p>Also, although the calculation of Maghrib time is quite clear and anywhere in 
              the world, the calculation of Fajr relies upon the chosen angle of calculation. 
              This best angle for calculation varies from place to place, and even depends on 
              the seasons in a given location. This app tries to automatically choose the best 
              calculation method for your location, but it may not be the most accurate.</p>
            <p>All these details and warnings aren’t pretty, but I think they’re part of 
              producing apps for such important purposes. May God accept our worship.</p>
          </div>
          
      </div>
      <div style={{textAlign:'center', position:'relative', top:'200%'}}>
        <p>Made with 💗 by @mrislam_</p>
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
      .then(response => { //TODO: update timeout becuase it can be slow
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
        console.log(times)
        let timeFormat = "h:mm a"
        this.setState({
          today,
          tomorrow,
          maghrib: times[0].format('h:mm a'),
          twoSixth: times[1].format('h:mm a'),
          threeSixth: times[2].format('h:mm a'),
          fourSixth: times[3].format('h:mm a'),
          fiveSixth: times[4].format('h:mm a'),
          sixSixth: times[5].format('h:mm a'),
          fajr: times[6].format('h:mm a'),
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

export default Layl