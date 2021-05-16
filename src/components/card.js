import React from 'react';

// function simplifyEyeColor(){
//     if(props.left_eye_color.equals(props.right_eye_color)){
        
//     }
// }

function Card(props) {
    return (
    // <div className="card-container">
        <div className="char-card">
            <div className="char-card-name">
                <h2> {props.name} </h2>
            </div>
            <div className="char-card-sub">
                <p>
                    Species: {props.species} <br />
                    Age: {props.age}<br />
                    Magic: {props.arcanetype}<br />
                    {/* <div className="signature-color">           todo: fix color matching*/}
                    Magic Color: {props.majik_color}<br />
                    {/* </div> */}
                    Importance: {props.importance}<br />    {/*this is a test val, don't leave this here*/}
                    Eye Color (Left): {props.left_eye_color}<br /> 
                    Eye Color (Right): {props.right_eye_color}
                </p>
            </div>
        </div>
    // </div>
    );
}

export default Card;