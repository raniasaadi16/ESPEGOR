import React, {useEffect, useState} from 'react'
import {FaWpforms} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import {RiSendPlaneLine} from 'react-icons/ri'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios'


export const Form = ({competiton}) => {

    const id = competiton ? competiton.id : undefined;
    const [organziersList, setOrganziersList] = useState([]);
    const [gamesList, setGamesList] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(1);
    const [golds, setGolds] = useState(0);
    const [diamonds, setDiamonds] = useState(0);
    const [icon, setIcon] = useState(null);
    const [date, setDate] = useState('');
    const [game, setGame] = useState(0);
    const [organizer, setOrganizer] = useState(0);
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState(0);



    const [preview, setpreview] = useState('');

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setIcon(e.target.files[0]);
        }else{
           console.log('err')
        }
    };

    const closeGame = () => {
        document.getElementById("popup-form").style.display = 'none';
    }


    const CreateCompetition = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('maxPlayers', maxPlayers);
        formData.append('golds', golds);
        formData.append('diamonds', diamonds);
        formData.append('date', date);
        formData.append('picture', icon);
        formData.append('game', game);
        formData.append('organizer', organizer);
        formData.append('location', location);
        formData.append('status', status);

        if (id) {
            await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/competition/update/${id}`, formData).then( res => {
                console.log(res.data);
            });
        } else {
            await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/competition/create`, formData).then( res => {
                console.log(res.data);
            });
        }

       window.location.reload();

    }

    useEffect(() => {      
        axios.all([
            axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/all`),
            axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/organizer/all`)
        ]).then( res => {
            res[0].data.games.forEach(element => {
                setGamesList((list) => [...list, element]);
            });
            res[1].data.organizers.forEach(element => {
                setOrganziersList((list) => [...list, element]);
            });
            setOrganizer(res[1].data.organizers[0].id)
            setGame(res[0].data.games[0].id)
        });


        setName(id?competiton.name:'');
        setDescription(id?competiton.description:'');
        setMaxPlayers(id?competiton.max_players:1);
        setGolds(id?competiton.price_gold:0);
        setDiamonds(id?competiton.price_diamond:0);
        setIcon(null);
        setDate(id?competiton.competition_date:'');
        setGame(id?competiton.game_id:0);
        setOrganizer(id?competiton.organizer_id:0);
        setLocation(id?competiton.location:'');
        setStatus(id?competiton.competition_status:0);
        setpreview(id?competiton.icon:'');

    }, [competiton]);


    return (
        <div id="popup-form">
            <div className="f-c-c">
                <div className="form-content double">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeGame} className="close" />
                    </div>
                    <div className="pop-label">
                        <p>{id?"Update Competition":"Add New Competition"}</p> 
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et similique quod laudantium dolore</span>
                    </div>
                    <div className="form double">
                        <form className="double-form f" onSubmit={CreateCompetition} encType="multipart/form-data">
                            <div className="form-left">
                                <div className="coin two-input-row-adjust">
                                    <div className="name f-cl">
                                        <label htmlFor="name">Competition Name</label>
                                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="diamond  f-cl">
                                        <label htmlFor="diamond">Competition Players</label>
                                        <input type="number" name="players" id="players" min="1" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />
                                    </div>
                                </div>

                                <div className="desc f-cl">
                                    <label htmlFor="desc">Competition Description</label>
                                    <ReactQuill theme="snow" value={description} onChange={setDescription} />
                                </div>
                                <div className="coin two-input-row">
                                    <div className="gold f-cl">
                                        <label htmlFor="gold">Golds</label>
                                        <input type="number" name="gold" id="gold" min="0" value={golds} onChange={(e) => setGolds(e.target.value)} />
                                    </div>
                                    <div className="diamond  f-cl">
                                        <label htmlFor="diamond">Diamonds</label>
                                        <input type="number" name="diamond" id="diamond" min="0" value={diamonds} onChange={(e) => setDiamonds(e.target.value)} />
                                    </div>
                                </div>
                                <div className="file-submit f-cl">
                                    <label class="uploadLabel f-b-c">
                                        <MdOutlineAddPhotoAlternate />
                                        <span className="upload-file-span">Competition Icon</span>
                                        <input type="file"
                                        class="uploadButton" 
                                        onChange={upload} 
                                        accept="image/*"
                                        name="icon"
                                        />
                                    </label>
                                    {preview && (
                                        <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                                    )}
                                </div>
                            </div>

                            <div className="form-right">
                                <div className="date f-cl">
                                    <label htmlFor="date">Competition Date</label>
                                    <input type="datetime-local" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div className="location f-cl">
                                    <label htmlFor="location">Location Date</label>
                                    <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="games f-cl">
                                    <label htmlFor="games">Game</label>
                                    <select name="games" id="gamess" value={game} onChange={(e) => {setGame(e.target.value);console.log(e.target.value)}}>
                                        {gamesList.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="organzier f-cl">
                                    <label htmlFor="organzier">Organizer</label>
                                    <select name="organzier" id="organziers" value={organizer} onChange={(e) => {setOrganizer(e.target.value)}}>
                                        <option value="0">Admin</option>
                                        {organziersList.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="status f-cl">
                                    <label htmlFor="status">Competition Status</label>
                                    <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="0">Pending</option>
                                        <option value="1">Inactive</option>
                                        <option value="2">Active</option>
                                    </select>
                                </div>
                                <div className="f-cl">
                                    <button type="submit" className="full-submit-btn f-c-c">
                                        <RiSendPlaneLine />
                                        <span>Submit</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
