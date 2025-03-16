import { Typewriter } from "react-simple-typewriter";
import React from "react";

const TypingEffect = ({ texts }) => {
    return (
        <h1 className="text-2xl font-bold">
            <Typewriter
                words={texts}
                loop={0}
                cursor
                cursorStyle="/"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
            />
        </h1>
    );
};

export default TypingEffect;
