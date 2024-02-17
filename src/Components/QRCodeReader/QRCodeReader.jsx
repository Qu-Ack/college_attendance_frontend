import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
// import {v4 as uuidv4} from 'uuid'
// import Randomstring from "randomstring";
import io from 'socket.io-client'

function QRCodeReader() {

    const [scanResult, setScanResult] = useState(null);
    const [socket, setSocket] = useState(null)

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {

        const skt = io("https://collegeattendance-production.up.railway.app/");
        setSocket(skt);
        console.log(skt)

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 200,
                height: 200
            },
            fps: 5
        })
        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            const randomString = generateRandomString(10);
            const decoded = jwtDecode(localStorage.token);
            async function request() {
                const response = await axios.post("https://collegeattendance-production.up.railway.app/api/attendance", {
                    lectureID: `${result.split("+")[0]}+${randomString}`,
                    studentID: decoded.id
                }, {
                    headers: myHeaders
                })

                // console.log(response.data)
            }

            request();
            setScanResult(`${result.split("+")[0]}+${randomString}`)
            if (skt) {
                const emmitdata = `${result.split("+")[0]}+${randomString}`;
                console.log("Emmiting event")
                skt.emit('qrCodeScanned', emmitdata);
            }
        }

        function generateRandomString(length) {
            const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                randomString += charset[randomIndex];
            }
            return randomString;
        }

        function error(err) {
            console.log(err)
        }

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }

    }, [])




    return (
        <div className="qrreader">
            {
                scanResult ? <div>Success: {scanResult}</div> : <div id="reader" style={{ "width": "900px", "height": "900px" }}></div>
            }
        </div>
        // <input type="text" onClick={handleClick}/>
    )
}

export default QRCodeReader