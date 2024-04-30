import React from 'react';
import '../style/styles.css';

const ParticleOrb = () => {
    return (
        <div className="wrap">
            {Array.from({ length: 300 }, (_, i) => (
                <div key={i} className={`c c${i + 1}`} />
            ))}
        </div>
    );
};

export default ParticleOrb;