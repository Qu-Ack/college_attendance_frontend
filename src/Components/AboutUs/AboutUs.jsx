import './Aboutus.css'
import daksh from './daksh.jpeg'
import devanshu from './devanshu.jpeg'
import het from './het.jpeg'
import sarthak from './sarthak.jpeg'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router'

function AboutUs() {

    const handleAboutUs = useOutletContext()

    useEffect(() => {
        handleAboutUs()
    }, [])
    return (
        <div className="aboutUs_">
            <div className="aboutUs_title">Our Team</div>
                <div className="aboutUs_about">
                    <TeamMember
                        name="Daksh Sangal"
                        collegeId="2023KUCP1010"
                        imgSrc={daksh}
                        instagramUrl="https://www.instagram.com/daksh_sangal/"
                        linkedinUrl="https://www.linkedin.com/in/daksh-sangal-529b10243/"
                    />
                    <TeamMember
                        name="Het Dhorajiya"
                        collegeId="2023KUCP1022"
                        imgSrc={het}
                        instagramUrl="https://www.instagram.com/__het0305__/"
                        linkedinUrl="https://www.linkedin.com/in/het-dhorajiya-679aa2292/"
                    />
                    <TeamMember
                        name="Sarthak Singh Tariyal"
                        collegeId="2023KUEC2016"
                        imgSrc={sarthak}
                        instagramUrl="https://www.instagram.com/skjustsk/"
                        linkedinUrl="https://www.linkedin.com/in/sarthak-singh-tariyal-b1aa62292/"
                    />
                    <TeamMember
                        name="Devanshu Tayal"
                        collegeId="2023KUEC2002"
                        imgSrc={devanshu}
                        instagramUrl="https://www.instagram.com/daksh_sangal/"
                        linkedinUrl="https://www.linkedin.com/in/devanshu-tayal-3456492b4/"
                        />
                </div>
                {/* Add similar content for other team members */}
            </div>
    )
    
    
    
}
const TeamMember = ({ name, collegeId, imgSrc, instagramUrl, linkedinUrl }) => {
    return (
        <div className="aboutUs_aboutContent">
            <img src={imgSrc} alt="not found" className="aboutUs_photo" />
            <div className="aboutUs_detail">
                <div className="aboutUs_name">{name}</div>
                <div className="aboutUs_id">College Id : {collegeId}</div>
                <div className="aboutUs_insta">
                    <a href={instagramUrl} className="aboutUs_icon" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-square-instagram"></i>
                    </a>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default AboutUs

