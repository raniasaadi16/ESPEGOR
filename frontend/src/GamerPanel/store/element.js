import { FcOldTimeCamera } from 'react-icons/fc';
import '../../App.css';


function Element(props) {
    
    const OpenScreenShoot = () => {
        props.SetSelectedOffer(props.data);
        document.getElementById("popup-form").style.display = 'block';
    }


    return (
        <div className="card-element f">
           <div className="left">
               <div className="icon">
                {!props.data.picture ? <img src="logo.png" alt="" /> : <img src={props.data.picture} alt="" />}
               </div>
           </div>
           <div className="right">
                <h3 className="name">{props.data.name}</h3>
                <p className="desc">{props.data.description}</p>
                <p className="price">{props.data.new_price} DA or {(props.data.new_price/200).toFixed(2)} £</p>
                <div className="c-d f" >
                    <div className="golds f-c-c">
                        <img src="coin.png" alt="" width="16" /> 
                        <span>{props.data.gold_amount}</span>
                    </div>
                    <div className="diamonds f-c-c">
                        <img src="diamond.png" alt="" width="16" />
                        <span>{props.data.diamonds_amount}</span>
                    </div>
                </div>
                <button className="f-c-c" onClick={OpenScreenShoot}><FcOldTimeCamera size={20} /><span>Send Screenshoot</span></button>
           </div>
        </div>
    );
}

export default Element;
