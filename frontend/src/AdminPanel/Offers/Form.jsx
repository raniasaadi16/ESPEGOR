import React, {useEffect, useState} from 'react'
import {FaWpforms} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import {RiSendPlaneLine} from 'react-icons/ri'
import axios from 'axios'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Popup from '../../Components/Popup'


export const Form = ({offer}) => {

    const id = offer ? offer.id : undefined;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [oldPrice, setOldPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [golds, setGolds] = useState(0);
    const [diamonds, setDiamonds] = useState(0);
    const [picture, setpicture] = useState('');
    const [preview, setpreview] = useState('');
    const [err, seterr] = useState('');

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setpicture(e.target.files[0]);
        }else{
           seterr('please insert a valid file')
        }
    };
    const SubmitOffer = async (e) => {
        e.preventDefault();
        seterr('')
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("oldPrice", oldPrice);
        formData.append("newPrice", newPrice);
        formData.append("golds", golds);
        formData.append("diamonds", diamonds);
        formData.append("picture", picture);
        if(!name || !description ) return seterr('missed field !')
        if (id) {
            await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/offer/update/${id}`, formData).then( res => {
                console.log('Update', res)
            });
        } else {
            await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/offer/create`, formData).then( res => {
                console.log('Create', res)
            });
        }

        window.location.reload();
    }

    const closeOffer = () => {
        document.getElementById("popup-form").style.display = 'none';
    }

    useEffect(() => {        
        setName(id?offer.name:'');
        setDescription(id?offer.description:'');
        setOldPrice(id?offer.old_price:0);
        setNewPrice(id?offer.new_price:0);
        setGolds(id?offer.gold_amount:0);
        setDiamonds(id?offer.diamonds_amount:0);    
        setpicture(id?offer.picture:'');    

    }, [offer]);

    return (
        <div id="popup-form">
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeOffer} className="close" />
                    </div>
                    <div className="pop-label">
                        <p>{ id ? "Update Offer For Gamers" : "Add New Offer For Sell" }</p> 
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et similique quod laudantium dolore porro aliquid iusto.</span>
                    </div>
                    <Popup err={err} seterr={seterr} />
                    <div className="form">
                        <form onSubmit={SubmitOffer}>
                            <div className="name f-cl">
                                <label htmlFor="name">Offer Name</label>
                                <input 
                                    type="text"
                                    name="name" 
                                    id="name" 
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            
                            <div className="description f-cl">
                                <label htmlFor="name">Offer Description</label>
                                <textarea name="description" id="description" cols="30" rows="4" 
                                    onChange={(e) => setDescription(e.target.value)}  
                                    value={description}
                                ></textarea>
                            </div>
                            
                            <div className="price two-input-row">
                                <div className="old-offer-price f-cl">
                                    <label htmlFor="oldprice">Old Price</label>
                                    <input type="number" name="oldprice" id="oldprice" 
                                        onChange={(e) => setOldPrice(e.target.value)}  
                                        value={oldPrice}
                                    />
                                </div>
                                <div className="new-offer-price  f-cl">
                                    <label htmlFor="newprice">New Offer price</label>
                                    <input type="number" name="newprice" id="newprice" 
                                        onChange={(e) => setNewPrice(e.target.value)}  
                                        value={newPrice}
                                    />
                                </div>
                            </div>
                            
                            <div className="coin two-input-row">
                                <div className="gold f-cl">
                                    <label htmlFor="gold">Golds</label>
                                    <input type="number" name="gold" id="gold" 
                                        onChange={(e) => setGolds(e.target.value)}  
                                        value={golds}
                                    />
                                </div>
                                <div className="diamond  f-cl">
                                    <label htmlFor="diamond">Diamonds</label>
                                    <input type="number" name="diamond" id="diamond" 
                                        onChange={(e) => setDiamonds(e.target.value)}  
                                        value={diamonds}
                                    />
                                </div>
                            </div>
                            <label class="uploadLabel f-b-c">
                                    <MdOutlineAddPhotoAlternate />
                                    <span className="upload-file-span">Game Icon</span>
                                    <input 
                                        type="file"
                                        class="uploadButton" 
                                        onChange={upload} 
                                        accept="image/*"
                                        name="icon"
                                    />
                            </label>
                            {preview && (
                                <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                            )}
                            <div className=" f-cl">
                                <button type="submit" className="full-submit-btn f-c-c">
                                    <RiSendPlaneLine />
                                    <span>Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
