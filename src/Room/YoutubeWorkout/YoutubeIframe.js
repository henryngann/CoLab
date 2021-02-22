import React  from "react";

const YoutubeIframe = (props) => {
    const {roomName} = props;
    const vidIdentifier = roomName.substring(9,roomName.length)
    console.log(vidIdentifier)

    return (
        <div
        className="video"
        style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0
        }}
        >

        <iframe
            style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
            }}
            src={`https://www.youtube.com/embed/${vidIdentifier}`}
            frameBorder="0"
        />
        </div>
    );

};

export default YoutubeIframe;
