//Component Import
import { useCallback, useEffect, useState, useRef } from "react";
import { CardGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

//CSS Import
import '../css/slider.css';

//Image Import
import ItemImage from '../images/item1.png';
import MesoImage from '../images/meso.png';
import number1 from '../images/number-1.png';
import number2 from '../images/number-2.png';

//Voice Import
import voiceAudio from '../audio/getItemVoice.mp3';
import Voice0_5 from '../audio/0_5HourVoice.mp3';
import Voice1_0 from '../audio/1HourVoice.mp3';
import Voice1_5 from '../audio/1_5HourVoice.mp3';
import Voice2_0 from '../audio/2HourVoice.mp3';
import testVoice from '../audio/TestVoice.mp3';


const useCounter = (init, ms) => {
    const [count, setCount] = useState(init);
    const intervalRef = useRef(null);
    const stop = useCallback(() => {
        if(intervalRef.current == null){
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);
    const reset = useCallback(() => {
        setCount(7200);
        stop();
    }, []);
    const start = useCallback(() => {
        if(intervalRef.current != null){
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(c => c - 1);
            if(count <= 0){
                setCount(7200);
                stop();
            }
        }, ms);
    }, []);
    return {count, start, stop, reset};
}

function Timer() {

    const { count, start, stop, reset } = useCounter(7200, 1000);
    
    const [hour, setHour] = useState('02');
    const [min, setMin] = useState('00');
    const [sec, setSec] = useState('00');
    const [mesoMin, setMesoMin] = useState('02');
    const [mesoSec, setMesoSec] = useState('00');

    const [volume, setVolume] = useState(50);

    const changeVolume = (e) => {
        setVolume(e.target.value);
    }

    const testVolume = () => {
        const myAudio = new Audio(testVoice);
        myAudio.loop = false;
        myAudio.volume = volume / 100;
        myAudio.play();
    }

    const timer = () => {
        if(count == 5400){
            const myAudio = new Audio(Voice0_5);
            myAudio.loop = false;
            myAudio.volume = volume / 100;
            myAudio.play();
        } else if(count == 3600){
            const myAudio = new Audio(Voice1_0);
            myAudio.loop = false;
            myAudio.volume = volume / 100;
            myAudio.play();
        } else if(count == 1800){
            const myAudio = new Audio(Voice1_5);
            myAudio.loop = false;
            myAudio.volume = volume / 100;
            myAudio.play();
        } else if(count == 0){
            const myAudio = new Audio(Voice2_0);
            myAudio.loop = false;
            myAudio.volume = volume / 100;
            myAudio.play();
        }
        const checkMinutes = Math.floor(count / 60);
        let hours = Math.floor(count / 3600);
        let minutes = checkMinutes % 60;
        let seconds = count % 60;
        
        let stringHours = '' + hours;
        let stringMinutes = '' + minutes;
        let stringSeconds = '' + seconds;
        if(stringHours.length <= 1) stringHours = '0' + stringHours;
        if(stringMinutes.length <= 1) stringMinutes = '0' + stringMinutes;
        if(stringSeconds.length <= 1) stringSeconds = '0' + stringSeconds;
        setHour(stringHours);
        setMin(stringMinutes);
        setSec(stringSeconds);

        let to2Min = count % 120;
        if(to2Min == 1){
            const myAudio = new Audio(voiceAudio);
            myAudio.loop = false;
            myAudio.volume = volume / 100;
            myAudio.play();
        }
        let MesoMin = '' + Math.floor(to2Min / 60);
        let MesoSec = '' + (to2Min % 60);
        if(MesoMin.length <= 1) MesoMin = '0' + MesoMin;
        if(MesoSec.length <= 1) MesoSec = '0' + MesoSec;
        setMesoSec(MesoSec);
        setMesoMin(MesoMin);
    }

    window.addEventListener("keydown", (e) => {
        if(e.key == '1'){
            start();
        } else if(e.key == '2'){
            reset();
        }
    })

    useEffect(timer, [count]);

    return (
        <Container>
            <CardGroup style={{marginBottom: '50px'}}>
            <Card bg="dark">
                <Card.Header>
                    <span><img src={ItemImage} width='50px' height='auto'></img><h3>재물획득의비약</h3></span>
                </Card.Header>
                <Card.Body>
                    <h1>{hour}시간 {min}분 {sec}초</h1>
                </Card.Body>
            </Card>
            <Card bg="dark">
                <Card.Header>
                    <span><img src={MesoImage} width='50px' height='auto'></img><h3>아이템 회수</h3></span>
                </Card.Header>
                <Card.Body>
                    <h1>{mesoMin}분 {mesoSec}초</h1>
                </Card.Body>
            </Card>
            </CardGroup>
            <Card bg='dark' style={{marginBottom: '50px'}}>
                <Card.Body>
                    <span>소리 안내 음량 : {volume}%</span><br/>
                    <input style={{marginRight: '10px'}} type='range' min='0' max='100' className='slider' onChange={changeVolume}></input>
                    <Button onClick={testVolume}>▶︎</Button>
                </Card.Body>
            </Card>
            <Container>
                <h5><img src={number1} width='30px' height='auto'></img> - 타이머 시작</h5>
                <h5><img src={number2} width='30px' height='auto'></img> - 타이머 종료</h5>
            </Container>
        </Container>
      );
}

export default Timer;