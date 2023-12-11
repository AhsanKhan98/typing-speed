import React, {useState} from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Form } from 'react-bootstrap';
import '../Home/home.css';
import TextArea from '../../Components/TextArea';
import Score from '../../Components/Score';
import { useTimer } from 'use-timer';
import {randomText} from '../../Constant';
import logo from '../../Assets/Image/logo.jpeg';
import Sound from '../../Assets/Audio/key.mp3';
import ScoreCard from '../../Components/ScoreCard';
import { PayPalButton } from "react-paypal-button-v2";

let audio = new Audio(Sound);

function App() {
  const [modalShow, setModalShow] = useState(false);
  const { time, start, pause } = useTimer();
  const [currentScore, setCurrentScore] = useState(0);
  const [currentText] = useState(randomText());
  const [userText, setUserText] = useState('');
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState('');
  const [donation, setDonation] = useState('');

  const onChange = (e) => {
    const a = e.currentTarget.value;
     audio.play();
     audio.playbackRate = 1.1;
     start();
     setUserText(a);
     complete(a);
     setCharCount(checker(a));
     setCurrentScore(() => scoreEngine());
 };

 const checker = (e) => {
     setText(() => currentText.replace(' ', ''));
     return (() => e.replace(' ', '').split('').filter((s,i) => s === text[i]).length)
   };

   const complete = (e) => {
    if (currentText.length === e.length) {
      pause();
      setModalShow(true);
     }
  };


 const scoreEngine = () => {
   if (charCount !== 0 && time !== 0) {
     const wpm = (charCount/5) / (time/60);
     return (
        Math.round(wpm)
     )
   }
   return 0;
}

  const next = () => {
    window.location.reload(false);
  }


  return (
   <Container className="main" fluid>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          React Typespeed
          </Navbar.Brand>
          <Nav.Link eventKey={2} href="#contact">
            <a href="https://ahsanmkhan.vercel.app/">Contact US</a>
          </Nav.Link>
        </Container>
      </Navbar>
      
       <Row>
           <Col xl={7} >
            < br />
            <TextArea currentText={currentText} userText={userText}/>
            < br />
            <div>
            <textarea cols="40" rows="10" className="userInput" type="text" placeholder="Start typing here ..." onChange={onChange} autoComplete="false" onPaste={()=> {return false}} />
            </div>
            < br />
            <Button variant="dark" size="lg" className="nextBtn" onClick={next}>Next</Button>
           
          </Col>
          <Col xl={5}>
          <Score currentscore={currentScore}/>
          <ScoreCard
            show={modalShow}
            onHide={() => setModalShow(false)}
            currentscore={currentScore}
            />
          </Col>
          <Col lg = {7}>
         {/* <Form.Control className="input" size="lg" type="text" placeholder="Donation Amount?" onChange={(e) => setDonation(e.target.value)}/> */}
         </Col>
        <Col lg={5}
            style={{opacity:"0"}}
        >
          <PayPalButton
                amount = {donation}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                            orderID: 1
                        })
                    });
                }}
            />
         </Col>
         
       </Row>
       <Row>
       <Col lg = {12}>
          {/* <div className="footer">
                <a href="#" target="_blank" rel="noopener noreferrer">
                    (c)Type Speed
                </a>
          </div> */}

         </Col>
       </Row>
      
   </Container>
  );
}

export default App;