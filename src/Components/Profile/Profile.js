// import randomImg from "../../Media/random.jpg";
import "./Profile.css";
export default function Profile(){

    const interests = ["competitive programming","data sructures","algorithms","web development","backend development",
    "reactjs","nodejs","javascript","cpp","html","css","express","firebase","materialui","bootstrap",
    "machine learning","artificial intelligence"]

    return (
        <div className="Profile">
            <div className="Container-1">
                <div className="profile-img">
                    {/* <img src = {randomImg} alt="User"/> */}
                </div>
                <div className="Name">
                    Ishan Pandey
                </div>
                <div className="Bio">
                    <textarea maxlength="30">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    </textarea>
                </div>
            </div>
            <div className="Container-2">
                <div className="Interests">
                    <div className="heading">Interests</div>
                    <div className="text-bg">
                    {interests.map(interest=> <div className="text"> {interest} </div>)}
                    </div>
                </div>
                <div className="College">
                    <div className="heading">College/University</div>
                        <div className="text">Birla Institute of Technology</div>
                </div>
                <div className="Top-two-languages">
                        <div className="heading">Top Two Languages </div>
                        <div className="text"> javascript </div>
                        <div className="text"> cpp </div>
                </div>
            </div>
        </div>
    );
}