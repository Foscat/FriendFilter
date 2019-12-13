import React from 'react';
const avitarList = require("../../../utils/avatarList");

let avitars = Object.entries(avitarList);

const AvatarSelector = props => {
    return(
        <div className="row">
            {avitars.length ? avitars.map((avatar, index) => {
                return(
                    <div key={index} className="col-3">
                        <div className="card">
                            <img className="card-img" src={avatar[1]} alt={`avatar${index}`} />

                            <button className="btn btn-primary m-2" onClick={() => props.selectAvatar(avatar[1])}>
                                <span aria-label="hand" role="img">&#9757;</span>
                            </button>
                        </div>
                    </div>
                )
                }) : <p></p>}

        </div>
    );
}

export default AvatarSelector;