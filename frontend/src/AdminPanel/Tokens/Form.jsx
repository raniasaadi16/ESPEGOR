import React, { useEffect, useState } from 'react'
import {FaWpforms} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import {AiOutlineGift} from 'react-icons/ai'
import axios from 'axios'
import { Input, Select } from 'antd'
import Popup from '../../Components/Popup'
import Success from '../../Components/Success'
const {Option} = Select

export const Form = () => {
    const [players, setplayers] = useState([]);
    const [data, setdata] = useState({golds: 0, diamonds: 0});
    const [selectedPlayer, setselectedPlayer] = useState({});
    const [err, seterr] = useState('');
    const [msg, setmsg] = useState('');
    const closeForm = () => {
        document.getElementById("popup-form").style.display = 'none';
    }
    const handleSelect = (value, option) => {
        setselectedPlayer(option.player)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const new_golds = (data.golds)*1 + (selectedPlayer.golds)*1
        const new_diamonds = (data.diamonds)*1 + (selectedPlayer.diamonds)*1
        await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/admin/givetokens/${selectedPlayer.user_id}`,{golds: new_golds, diamonds: new_diamonds} ).then( res => {
            if(!res.data.success){
                seterr('something went very wrong please try again')
            }
            else{
                closeForm()
                setmsg(res.data.msg)
                setdata({golds: 0, diamonds: 0})
                setselectedPlayer({})
            }
        });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/all`).then(res => {
            const result = res.data.players;
            setplayers(result);
     
        });
    }, [msg]);

    return (
        <div id="popup-form">
            <Popup err={err} seterr={seterr} />
            <Success msg={msg} setmsg={setmsg} />
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeForm} className="close" />
                    </div>
                    <div className="pop-label">
                        <p>Give Away Token To Players</p> 
                    </div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Enter The Gamer ID</label>
                            <div className="only-one">
                                {/* <div className="input-prefix f">
                                    <div className="prefix"><span> U - </span></div>
                                    <input type="number" name="player_id" id="player_id" />
                                </div> */}
                                <Select
                                    style={{
                                    width: '100%',
                                    }}
                                    placeholder="select one player"
                                    onChange={handleSelect}
                                    value={selectedPlayer?.user_id}
                                >
                                    {players.length > 0 && players.map(player => (
                                      <Option value={player.user_id} label={player.user_id} player={player} key={player.id}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3 text-gray-900">
                                                <img src={player.profile_image} className='w-[30px] h-[30px] rounded-full' alt="" />
                                                <p className='mb-0'>{player.email}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1">{player.golds}</span></div></td>
                                                <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1">{player.diamonds}</span></div></td>
                                            </div>
                                        </div>
                                      </Option>
                                    )
                                    )}
                                </Select>
                              
                                <div className="one-gift three-input-row">
                                    <div className="old-offer-price">
                                        <label htmlFor="oldprice">Given Golds</label>
                                        <input type="number" name="oldprice" id="oldprice" value={data.golds} onChange={e => setdata({...data, golds: e.target.value})} />
                                    </div>
                                    <div className="new-offer-price">
                                        <label htmlFor="newprice">Given Diamonds</label>
                                        <input type="number" name="newprice" id="newprice" value={data.diamonds} onChange={e => setdata({...data, diamonds: e.target.value})} />
                                    </div>
                                    <div className="one">
                                        <label htmlFor="">Send Gift</label>
                                        <button type='submit' className="submit-btn f-c-c flex justify-center">
                                            <AiOutlineGift />
                                        </button>
                                    </div>
                                </div>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
