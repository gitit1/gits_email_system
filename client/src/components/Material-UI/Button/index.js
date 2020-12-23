import { Button } from '@material-ui/core';
import './button.scss';

const NewButton = props => {
    return (
        <Button {...props} variant="outlined" className={`${props.className} button`}>
              {props.text}
        </Button>
    );
};

export default NewButton;