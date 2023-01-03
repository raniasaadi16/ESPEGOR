import React from 'react'
import { Link } from 'react-router-dom';

export const Footer = () => {


    const goToLink = (url) => {
        window.open(url,'_blank');
    }


    return (
        <div className="footer">
            <div className="container">
                <div className="foo-wrapper">
                    <div className="foo-infos">
                        <h3>EGOR TECH</h3>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, in. Ullam harum et labore esse voluptas nemo doloremque quaerat cupiditate? Enim quod ut rem voluptatem a error libero natus sequi!</span>
                        <br /><br />
                        <div className="socials f">
                            <div className="social f-c-c" onClick={() => goToLink('https://t.me//espegor/')}>
                                <img src="./../telegram.svg" alt="" width="20" />
                            </div>
                            <div className="social f-c-c" onClick={() => goToLink('https://www.facebook.com/Espegor/')}>
                                <img src="./../facebook.svg" alt="" width="20" />
                            </div>
                            <div className="social f-c-c" onClick={() => goToLink('https://www.instagram.com/espegor.gg/')} >
                                <img src="./../instagram.svg" alt="" width="20" />
                            </div>
                            <div className="social f-c-c" onClick={() => goToLink('https://discord.gg/TAAwEudmvb')}>
                                <img src="./../discord.svg" alt="" width="20" />
                            </div>
                            <div className="social f-c-c" onClick={() => goToLink('https://twitter.com/EgorEsp')}>
                                <img src="./../twitter.svg" alt="" width="20" />
                            </div>
                        </div>
                    </div>

                    <div className="foo-links">
                        <h3>TOP MENU</h3>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/store'>Market</Link></li>
                            <li><Link to='/competitions'>Competitions</Link></li>
                            <li><Link to='/games'>Games</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                        </ul>
                    </div>

                    <div className="foo-contacts mt-1">
                        <h3>CONTACT US <span className='ml-1'>-soon you will be able to contact the team-</span></h3>
                        <form>
                            <div className="field">
                                <label htmlFor="name">FullName</label>
                                <input type="text" name="name" id="name" />
                            </div>
                            <div className="field">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" name="subject" id="subject" />
                            </div>
                            <div className="field">
                                <label htmlFor="name">Email</label>
                                <input type="email" name="email" id="email" />
                            </div>
                            <div className="field">
                                <label htmlFor="name">Message</label>
                                <textarea name="message" id="message" ></textarea>
                            </div>
                            <div className="button">
                                <button>Send Message</button>
                            </div>
                        </form>
                    </div>

                </div>
                

                <p style={{textAlign: "center"}}>copyrights &copy; all rights reserved for <span>EGORTECH</span></p>
            </div>
        </div>
    );
}

