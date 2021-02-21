import React from "react";

export default function FormErrorSignIn (props) {

    return (
        <>
            {props.condition && (
                <p className="form_error">{props.message}</p>
            )}
        </>
    );
}
