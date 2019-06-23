import React from "react";
import axios from "./axios";

export class Recorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.record = this.record.bind(this);
        this.stopRecord = this.stopRecording.bind(this);
        this.fourSquare = this.fourSquare.bind(this);
    }

    record() {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                console.log("audioUrl", audioBlob, audioUrl, audio);
                fetch("audio-recorded", {
                    method: "POST",
                    body: audioBlob
                })
                    .then(rslt => {
                        console.log(rslt);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // axios
                //     .post("/audio-recorded", { audioBlob })
                //     .then(rslt => {
                //         console.log("/audio-recorded server response", rslt);
                //     })
                //     .catch(err => {
                //         console.log("/audio-recorded server error", err);
                //     });
                // audio.play();
            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000);
        });
    }

    stopRecording() {
        console.log("stopRecord fires");
    }

    fourSquare() {
        console.log("fourSquare");
        axios
            .get("/foursquare")
            .then(rslt => {
                console.log("/foursquare server response", rslt);
            })
            .catch(err => {
                console.log("/foursquare server error", err);
            });
    }

    render() {
        return (
            <div className="recorder-container">
                <h2>Recorder is here</h2>

                <div className="buttons">
                    <button onClick={this.record} id="btn-record">
                        record
                    </button>
                    <button onClick={this.stopRecording} id="btn-stop">
                        stop
                    </button>
                    <button id="btn-play">play</button>
                    <button onClick={this.fourSquare} id="btn-foursquare">
                        Foursquare
                    </button>
                </div>
            </div>
        );
    }
}
