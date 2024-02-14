import { QRCodeSVG } from "qrcode.react"
import './App.css'

function App() {
  return(
    <QRCodeSVG value="https://www.google.com/" className="Qr"/>
  )
}

export default App