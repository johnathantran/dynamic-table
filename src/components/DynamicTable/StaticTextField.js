import React, { useState, useContext } from 'react';

export default function StaticTextField({value}) {
    //const userProfile = useContext(UserProfileContext);
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const boxStyle = {
        borderBottom: isHover ? "2px solid #3475ed" : "1.5px solid black",
        cursor: "text"
    };

    return (
    <div
        style={boxStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        {value}
    </div>
    );
}
