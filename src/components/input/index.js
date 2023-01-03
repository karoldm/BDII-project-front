import React from "react";
import { Container, InputField, InputTitle, } from "./styles";

const Input = (props) => {
    return (
        <Container>
            <InputTitle>{props.title}</InputTitle>
            <InputField
                value={props.value}
                type={props.type}
                style={{ width: `${props.width}` }}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </Container>
    )
}

export default Input; 