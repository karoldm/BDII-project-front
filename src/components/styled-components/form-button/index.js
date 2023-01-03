import React from "react";
import { Button } from './styles';

const FormButton = (props) => {
    return (
        <Button onClick={props.onClick} type={props.type}>
            <h3>{props.text}</h3>
        </Button>
    )
}

export default FormButton;