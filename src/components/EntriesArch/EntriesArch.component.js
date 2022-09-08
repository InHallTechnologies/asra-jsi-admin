import React from "react";
import './EntriesArch.style.css';
import vac1 from '../../assets/vac_1.png';

const EntriesArch = () => {

    return (
        <div className="entries-list-arch-container">
            <img className="entries-vac-status" src={vac1} />
            <div className="entries-vac-details-container">
                <h2 className="entries-vac-name">Krati Shrivastava</h2>
                <p className="entries-vac-phone entries-vac-secondary">+91 xxxxxxxxxx</p>
                <div className="entries-vac-location-time-container">
                    <p className="entries-vac-location entries-vac-secondary">Satna Dewas</p>
                    <p className="entries-vac-time entries-vac-secondary">9:22 pm</p>
                </div>
            </div>
        </div>
    )
}

export default EntriesArch;