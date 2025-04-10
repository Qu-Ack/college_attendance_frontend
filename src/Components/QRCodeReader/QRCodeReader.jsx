import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
// import {v4 as uuidv4} from 'uuid'
// import Randomstring from "randomstring";
import { Navigate, useNavigate } from "react-router";
import './qr_reader.css'
import io from 'socket.io-client'

function QRCodeReader() {

    const [scanResult, setScanResult] = useState(null);
    const [sts, setStatusCode] = useState(false)
    const [socket, setSocket] = useState(null)
    const navigate = useNavigate();
    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {

        const skt = io("http://localhost:5000/");
        setSocket(skt);
        console.log(skt)

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                height: 200,
                width: 200,
            },
            fps: 5
        })
        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            // const randomString = generateRandomString(10);
            const decoded = jwtDecode(localStorage.token);
            async function request() {
                const response = await axios.post("http://localhost:5000/api/attendance", {
                    lectureID: result,
                    studentID: decoded.id
                }, {
                    headers: myHeaders
                })

                if (response.status == 500) {
                    setStatusCode(true)
                }
                // if (response.data.error == 'undefined') {
                //     return (
                //         <>
                //             <h1>{response.data.message}</h1>
                //             <Link to={`/studdashboard/${decoded.id}`}>Dashboard</Link>
                //         </>
                //     )
                // } else {
                //     return (
                //         <>
                //         <h1>{response.data.error}</h1>
                //         <Link to={`/studdashboard/${decoded.id}`}>Dashboard</Link>
                //         </>
                //     )
                // }

                // console.log(response.data)
            }

            request();
            setScanResult(result)
            if (skt) {
                const emmitdata = result;
                console.log("Emmiting event")
                skt.emit('qrCodeScanned', emmitdata);
            }
        }

        // function generateRandomString(length) {
        //     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        //     let randomString = '';
        //     for (let i = 0; i < length; i++) {
        //         const randomIndex = Math.floor(Math.random() * charset.length);
        //         randomString += charset[randomIndex];
        //     }
        //     return randomString;
        // }

        function error(err) {
            console.log(err)
        }

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }

    }, [])


    if(sts) {
        setStatusCode(false)
        return(
            <>
            <h1>Invalid Qr</h1>
            <Link to="/reader">Scan Again</Link>
            <Link to={`/studdashboard/${decoded.id}`}></Link>
            </>
        )
    }


    return (
        <div className="qrreader">
            {
                scanResult ? <div>Success: {scanResult}</div> : <div id="reader" className="QrReader-Student"></div>
            }
        </div>
        // <input type="text" onClick={handleClick}/>
    )
}

export default QRCodeReader