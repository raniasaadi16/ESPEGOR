import '../../App.css';
import { Link } from "react-router-dom";

export const CompetitionCard = (props) => {
    return (
        <div className="tourn f">
            <div className="left">
                <img src={props.data.icon} alt="" />
            </div>
            <div className="right f-cl">
                <h2>{props.data.name}</h2>
                <p className="f-n-c">
                    {/* <img src="./../game-icon.svg" alt="" width="13" /> */}
                    <span className="f">Game : 
                        <span className="colorful f-n-c">
                            {props.data.game_name}
                            <img src="./../game-icon.svg" alt="" width="13" className="ml-1" />
                        </span>
                    </span>
                </p>
                <p className="f-n-c">
                    {/* <img src="./../calendar.svg" alt="" width="13" /> */}
                    <span className="f">Registration Ends : 
                        <span className="colorful f-n-c">
                            {props.data.competition_date}
                            <img src="./../calendar.svg" alt="" width="10" className="ml-1" /> 
                        </span>
                    </span>
                </p>
                <p className="f-n-c">
                    {/* <img src="./../location.svg" alt="" width="13" /> */}
                    <span className="f">Location : 
                        <span className="colorful f-n-c">
                            {props.data.location}
                            <img src="./../location.svg" alt="" width="13" className="ml-1" />
                        </span>
                    </span>
                </p>
                <p className="f-n-c">
                    {/* <img src="./../coin.png" alt="" width="13" /> */}
                    <span className="f">Coins Required : 
                        <span className="colorful f-n-c">
                            {props.data.price_gold}
                            <img src="./../coin.png" alt="" width="10"  className="ml-1" />
                        </span>
                    </span>
                </p>
                <p className="f-n-c">
                    {/* <img src="./../diamond.png" alt="" width="13" /> */}
                    <span className="f">Diammonds Required : 
                        <span className="colorful f-n-c">
                            {props.data.price_diamond}
                            <img src="./../diamond.png" alt="" width="10" className="ml-1" />
                        </span>
                    </span>
                </p>
                <div className="buttons">
                    <button className="join-button">
                        <Link to={"/champion/" + props.data.id} className="f-c-c">
                            <img src="./../competition.svg" alt="" width="16" />
                            <span className="ml-1">Check the Competition</span>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}