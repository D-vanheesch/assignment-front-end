import React from "react";

export default function FormErrorSignUp ( props ) {

    return (
        <>
            {props.condition && (
                <p className="form_error">{props.message}</p>
            )}
        </>
    );
}
