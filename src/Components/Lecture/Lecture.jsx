import { useParams } from "react-router"
import { QRCodeSVG } from "qrcode.react"
import { useEffect } from "react";
function Lecture() {
    const {classid , lectureid} = useParams();

    useEffect(() => {
        
    }, [])

    return(
        <QRCodeSVG value={lectureid}></QRCodeSVG>
    )
}

export default Lecture