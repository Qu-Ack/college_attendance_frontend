import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function QRCodeReader() {

    const [scanResult , setScanResult] = useState(null);

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox:{
                width:200,
                height:200
            },
            fps:5
        })
    
        scanner.render(success, error);
    
        function success(result) {
            scanner.clear();
            const decoded = jwtDecode(localStorage.token);
            async function request() {
                const response = await axios.post("https://collegeattendance-production.up.railway.app/api/attendance", {
                    lectureID: `${result}`,
                    studentID: decoded.id
                } , {
                    headers: myHeaders
                })

                console.log(response.data)
            }

            request();
            setScanResult(result)
        }
    
        function error(err) {
            console.log(err)
        }
    
    }, [])
    

    return(
        <div className="qrreader">
            {
                scanResult ? <div>Success: {scanResult}</div> : <div id="reader" style={{"width": "900px" , "height": "900px"}}></div>
            }
        </div>
    )
}

export default QRCodeReader