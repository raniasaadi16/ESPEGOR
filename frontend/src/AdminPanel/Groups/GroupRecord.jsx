import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import {MdDeleteOutline, MdOutlineEdit} from 'react-icons/md'
import API from '../../Services/AuthIntercepteurs';


export const GroupRecord = (props) => {

    
    const DeleteGroup = (e) => {

        e.preventDefault();

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/delete/group/${props.data.id}`).then(res => {
            alert(res.data.msg);
            window.location.reload();
        });

    }

    
    const UpdateGroup = () => {
        props.SetGroup(props.data);
        document.getElementById("popup-form").style.display = 'block';
    }


  return (
    <div className="group-wrapper f gap10">
        <div className="left">
            <img src={props.data.icon} alt="" />
        </div>
        <div className="right">
            <h3 style={{marginBottom: "5px"}}>{props.data.name}</h3>
            <div className="f-b-c">
                <p>Posts</p>
                <span>{props.data.posts}</span>
            </div>
            <div className="f-b-c">
                <p>Members</p>
                <span>{props.data.members}</span>
            </div>
            <div className="f-b-c">
                <p>Total Likes</p>
                <span>{props.data.total_likes}</span>
            </div>
            <div className="f-b-c">
                <p>Total Dislikes</p>
                <span>{props.data.total_dislikes}</span>
            </div>
            <div className="f-b-c check-btns">
                <span></span>
                <div className="buttons f">
                    <button className="f-c-c"><AiOutlineEye /></button>
                    <button className="f-c-c"
                        onClick={UpdateGroup}
                    ><MdOutlineEdit /></button>
                    <button className="f-c-c"
                        onClick={e =>
                            window.confirm("Are you sure you wanna Delete This Group") && DeleteGroup(e)
                        }><MdDeleteOutline />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
