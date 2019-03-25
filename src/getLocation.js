import axios from 'axios';
export async function getLocation() {
  axios.get(`http://ip-api.com/json?fields=city`)
      .then((data) => {
        console.log(data.city)
        this.setState({
          city: data.city
        })
      })
}
