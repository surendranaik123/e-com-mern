import Navbar from "../components/Navbar";
import  '../css/about.css';
import Team1 from "../assets/team1.jpg";
import Team2 from "../assets/team2.jpg";
import Team3 from "../assets/team3.jpg";

const About = () => {
  return (
    <>
    <Navbar/>
      <div className="about-section">
        <h1>About Us Page</h1>
        <h2>Some text about who we are and what we do.</h2>
        <h2>Resize the browser window to see that this page is responsive by the way.</h2>
      </div>
      <div className="row">
        <div className="column">
          <div className="card">
            <img src={Team1} alt="Jane" className="images" />
            <div className="container">
              <h2>Jane Doe</h2>
              <p className="title">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>jane@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={Team2} alt="Mike" className="images" />
            <div className="container">
              <h2>Mike Ross</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={Team3} alt="John" className="images" />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>john@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;  