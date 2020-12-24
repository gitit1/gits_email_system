import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './showEmail.scss';
;

const ShowEmail = props => {
    const { emailData } = props.location.state;
    return (
        <div className="show-email-page">
            <Card className="show-email-page__card">
                <CardContent>
                    <Typography
                        variant="h5"
                        component="h2"
                        className="show-email-page__card--subject"
                    >
                        {emailData.subject}
                    </Typography>
                    <Typography
                        className="show-email-page__card--from"
                        color="textSecondary"
                    >
                        From: {emailData.sender}
                    </Typography>
                    <Typography
                        className="show-email-page__card--to"
                        color="textSecondary"
                    >
                        To: {emailData.reciever}
                    </Typography>
                    <br /><br />
                    <Typography
                        variant="body2"
                        component="p"
                        className="show-email-page__card--msg"
                    >{emailData.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ShowEmail