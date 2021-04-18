import React from 'react';

function Card(props) {
    return (<div className="char-card">
        <div className="char-card-name">
            <h2>
                {props.name}
            </h2>
            {/* <div className="main-or-sub">
                
            </div> */}
        </div>
        <div className="char-card-sub">
            <p>
                Species: {props.species} <br />
                Age: {props.age}<br />
                Arcanetype: {props.arcanetype}<br />
                {/* <div className="signature-color"> */}
                    Majik Color: {props.majik_color}
                {/* </div> */}
            </p>
        </div>
    </div>
    );
}

export default Card;