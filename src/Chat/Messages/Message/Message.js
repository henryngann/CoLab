import React from 'react';
import ReactEmoji from 'react-emoji';
// import { getAvatarUrl } from '../../../../../utils/userInfo';
import './Message.scss';

const Message = ({ message: { user, text }, currUser, users }) => {
    const getNameById = (id) => {
        console.log(currUser)
        const existingUser = users.find(x => x.sid === id);
        if (existingUser) return existingUser.identity;
        return 'fail';
    }
    return (
        user.sid === currUser.sid ? (
            <div className='messageContainer justifyEnd'>
                {/* <p className='sentText pr-10'>{trimmedCurrUser}</p> */}
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
                </div>
                <section>
                    {currUser.identity}
                    {/*
                    <img src={getAvatarUrl({
                        name: getNameById(currUser.sid),
                        background: currUser.colors.bg,
                        color: currUser.colors.txt,
                    })} alt='avatar' />
                    */}
                </section>
            </div>
        ) : (
                user.identity === 'admin' ? (
                    <div className='messageContainer justifyCenter mtb-14'>
                        <div className='messageBox fullWidth ptb-0 textCenter'>
                            <p className='messageText colorGray'>{text}</p>
                        </div>
                    </div>
                ) : (
                        <div className='messageContainer justifyStart'>
                            <section>
                                {user.name}
                                {/*  
                                <img src={getAvatarUrl({
                                    name: getNameById(user.sid),
                                    background: user.colors.bg,
                                    color: user.colors.txt,
                                })} alt='avatar' />
                                */}
                            </section>
                            <div className='messageBox backgroundLight'>
                                <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                            </div>
                            {/* <p className='sentText colorGray pl-10'>{user.identity}</p> */}
                        </div>
                    )
            )
    );
};

export default Message;