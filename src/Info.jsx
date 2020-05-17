import React, { Component } from 'react';
import GitHubButton from 'react-github-btn'


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

export default Info