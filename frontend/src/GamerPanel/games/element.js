import '../../App.css';


function Element(props) {

    const status = props.data.game_status;

    return (
        <div className="card-element f">
           <div className="left">
               <div className="icon">
                    <img src={props.data.icon} alt="" />
               </div>
           </div>

           <div className="right">
                <h3 className="name">{props.data.name}</h3>
                <p>Competitions : {props.data.competitions}</p>
                <p>Status : {status === 1 && 'Comming Soon' || status === 2 && 'Active'}</p>
           </div>
        </div>
    );
}

export default Element;
