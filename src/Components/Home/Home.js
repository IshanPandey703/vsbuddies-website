import Button from "@mui/material/Button";
import "./Home.css";
import about from "../../Media/about.png";
import ContactCard from "./ContactCard";
function Home(props) {
	return (
		<div className="Home">
			<div className="navbar">
				<div className="nav-item nav-first">
					<a href="#home">Home</a>
				</div>
				<div className="nav-item" href="#about">
					<a href="#about">About</a>
				</div>
				<div className="nav-item" href="#contact">
					<a href="#contact">Contact Us</a>
				</div>
			</div>
			<div id="home" className="home-container">
				<div className="home-container-main">
					<h1>VSBuddies</h1>
					<h3>
						A Simple way to meet
						<br />
						new friends. Let's scream at
						<br />
						our screens together!
					</h3>
					<Button
						id="get-started-btn"
						variant="outlined"
						onClick={props.func}>
						Get Started!
					</Button>
				</div>
			</div>
			<svg
				className="cloud"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 319">
				<path
					fill="#fff"
					fillOpacity="1"
					d="M0,160L30,181.3C60,203,120,245,180,224C240,203,300,117,360,101.3C420,85,480,139,540,165.3C600,192,660,192,720,165.3C780,139,840,85,900,53.3C960,21,1020,11,1080,10.7C1140,11,1200,21,1260,64C1320,107,1380,181,1410,218.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
					data-darkreader-inline-fill=""></path>
			</svg>
			<div id="about" className="about-container">
				<div className="about-text">
					<h1>About us</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip
					</p>
				</div>
				<div className="about-image">
					<img src={about} alt="" />
				</div>
			</div>
			<svg
				className="cloud2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 319">
				<path
					fill="fff"
					fillOpacity="1"
					d="M0,160L30,170.7C60,181,120,203,180,218.7C240,235,300,245,360,240C420,235,480,213,540,213.3C600,213,660,235,720,234.7C780,235,840,213,900,181.3C960,149,1020,107,1080,80C1140,53,1200,43,1260,64C1320,85,1380,139,1410,165.3L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
					data-darkreader-inline-fill=""></path>
			</svg>
			<div id="contact" className="contact-container">
				<h1>Contact us</h1>
				<div className="contact-grid">
					<ContactCard type="LinkedIn" to="">
						Lohitaksha Malhotra
					</ContactCard>
					<ContactCard type="LinkedIn" to="">
						Ishan Pandey
					</ContactCard>
					<ContactCard type="LinkedIn" to="">
						Ankur Pandey
					</ContactCard>
					<ContactCard type="Email" to="">
						Lohitaksha Malhotra
					</ContactCard>
					<ContactCard type="Email" to="">
						Ishan Pandey
					</ContactCard>
					<ContactCard type="Email" to="">
						Ankur Pandey
					</ContactCard>
					<ContactCard type="Github" to="">
						Lohitaksha Malhotra
					</ContactCard>
					<ContactCard type="Github" to="">
						Ishan Pandey
					</ContactCard>
					<ContactCard type="Github" to="">
						Ankur Pandey
					</ContactCard>
				</div>
				<p>© 2021 VSBuddies</p>
			</div>
		</div>
	);
}

export default Home;
