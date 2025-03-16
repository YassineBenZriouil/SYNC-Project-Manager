import React from "react";

export default function Btn(props) {
    return (
        <button className="self-center  md:self-start bg-amber-400 text-blue-950  px-8 py-3 rounded-md font-semibold text-lg hover:scale-110 transition duration-200 cursor-pointer">
            {props.in}
        </button>
    );
}
