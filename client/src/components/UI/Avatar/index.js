import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import './avatar.scss';

const MyAvatar = (props) => {
    const avatarInitials = props.name[0];

    return (
        <Avatar style={{ backgroundColor: props.color }} className='avatar small'>{avatarInitials}</Avatar>
    );
}

export default MyAvatar;