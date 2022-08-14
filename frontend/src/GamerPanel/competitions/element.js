import { Link } from 'react-router-dom';
import '../../App.css';


function Element(props) {

    const status = props.data.competition_status;

    return (
        <div className="card-element f">
           <div className="left">
               <div className="icon">
                    <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/`+ props.data.icon} alt="" />
               </div>
           </div>
           
           <div className="right f-cl">
                <h3 className="name">{props.data.name}</h3>
                <p>Players Joined : {props.data.players}</p>
                <p>Gold required : {props.data.price_gold}</p>
                <p>Diamonds required: {props.data.price_diamond}</p>
                <p>location : {props.data.location}</p>
                <p>Date : {props.data.competition_date}</p>
                <p>Status : {status === 1 && 'Comming Soon' || status === 2 && 'Active'}</p>
                <div className="w-b f">
                    <button><Link to={`/champion/${props.data.id}`}>Check Out</Link></button>
                </div>
           </div>
        </div>
    );
}

export default Element;
