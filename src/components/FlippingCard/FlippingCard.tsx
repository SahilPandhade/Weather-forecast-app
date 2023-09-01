import React, { useState } from 'react'
import './FlippingCard.css';
interface FlippingCard {
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
}
const FlippingCard: React.FC<FlippingCard> = ({ frontContent, backContent }) => {
    const [flipped, setFlipped] = useState<boolean>(false);
    const handleFlip = () => {
        setFlipped(true);
    }
    const handleReFlip = () => {
        setFlipped(false);
    }
    return (
        <div className={`data-card ${flipped ? 'flipped' : ''}`} onMouseEnter={handleFlip} onMouseLeave={handleReFlip}>
            <div className='card'>
                <div className='card-content-front'>
                    {frontContent}
                </div>
                <div className='card-content-back'>
                    {backContent}
                </div>
            </div>
        </div>
    )
}

export default FlippingCard