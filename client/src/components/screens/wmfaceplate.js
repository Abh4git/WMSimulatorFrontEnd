import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import '../../styles/login.scss';

import { Container } from 'react-bootstrap';
import Drum from '../../assets/img/drum.png';
import DrumOpen from '../../assets/img/drumopen.png';
import DrumWithWater from '../../assets/img/drumwithwater.png';
import DrumWithWaterSplash from '../../assets/img/drumwithwatersplashing.png';
import SpeedDialTooltipOpen from '../speeddialtooltipopen'
import Icon from '@material-ui/core/Icon';
import PlayIcon from '@material-ui/icons/PlayArrow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import EngineService from '../../services/engineservices';
import { w3cwebsocket as W3CWebSocket } from "websocket";




//const client = new W3CWebSocket('ws://localhost:5000/ws')
//var client= new W3CWebSocket('ws://localhost:5000/web')
class WashingMachineFacePlate extends Component {
    
    
    //client = new WebSocket('ws://localhost:5000/ws')
     //socket=null;
    constructor(props) {
        super(props);
        this.state = {
            accessCode: '',
            rememberMe: false,
            errorMessage: undefined,
            drumState: false,
            started: false,
            engineMode: 1,
            EngineState: ' '
        }

       
        
        this.changeLanguage=this.changeLanguage.bind(this);
        //this.makeTimer()
       
    }

    

    componentWillMount() 
    {

        var W3CWebSocket = require('websocket').w3cwebsocket;
        var client = new W3CWebSocket('ws://localhost:5000/', 'echo-protocol');
   
        client.onerror = function() {
            console.log('Connection Error');
        };
        
        client.onopen = function() {
            console.log('WebSocket Client Connected');
        
            /*function sendNumber() {
                if (client.readyState === client.OPEN) {
                    var number = Math.round(Math.random() * 0xFFFFFF);
                    client.send(number.toString());
                    setTimeout(sendNumber, 1000);
                }
            }
            sendNumber();*/
        };
        
        client.onclose = function() {
            console.log('echo-protocol Client Closed');
        };
        
        client.onmessage = (e)=> {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
               // this.setState({drumState:false});
               //this.handleStateChange(e.data)
               // this.setState({engineState: "Rinsing"});
            }
            this.setState({EngineState:e.data})            
        };
    }




  
    

    makeTimer(){
        setInterval(() => {
          if (!this.state.drumState) {
              this.setState({drumState:true});
          } else
          {
            this.setState({drumState:false});
          }
        }, 100)
      }

    handleVisibility = () => {
        this.state.hidden=(prevHidden => !prevHidden);
      };
    
      handleStateChange = (data) => {
        this.setState({ engineState: data })
      };
    
    changeLanguage = (lng) => {
        this.props.i18n.changeLanguage(lng);
    };
    
    handleChangeText = e => {
        const { name, value } = e.target
        if (value.length < 7) this.setState({[name]: value});
    }

    handleChangeCheckbox = e => {
        const { name, checked } = e.target
        this.setState({[name]: checked});
    }

    handleSubmit = e => {
        e.preventDefault();

      
    }

    handleChangeLanguage = language => {
        console.log(`Language changed: ${language}`);
        this.changeLanguage(language);
    }

    handleChangeImage = () => {
        console.log(`Change Image`);
        if (!this.state.drumState)
        {
            this.setState({drumState: true});
        } else
        {
            this.setState({drumState: false});
        }
    }

    handleStartStop = () => {
        console.log(`Start Stop command`);
        if (!this.state.started)
        {
            EngineService.startEngine(this.state.engineMode).then(response => {
                this.setState({started: true});
                console.log('Started Engine' );
                });
           
        } else
        {
            this.setState({started: false});
        }
    }

    render() {
        const { t } = this.props;
        var drumobject=null;
        console.log ("Drumstate",this.state.drumState)
        if (!this.state.drumState) 
        {
            drumobject=Drum;
        } else
        {
            drumobject=DrumOpen;
        }
        return (
<div className="row w-75 d-flex justify-content-center">
    <div className="card w-50">
    <div className="card-body">
     {/* Card 1*/}       
        <div className="card text-black bg-light  mb-3" >
        <div className="card-header">Washing Machine Simulator</div>
        <div className="card-body">
           {/* <h5 className="card-title">Secondary card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
            <div className="row d-flex justify-content-end">
            <div className="card w-25 bg-light">
                <div className="card-body">
                    <p> Detergent</p>
                </div>
            </div>
            <div className="card w-25 bg-light">
                <div className="card-body">
                    <p>
                    <SpeedDialTooltipOpen></SpeedDialTooltipOpen>  
                </p>
                </div>
            </div>
            <div className="card w-25 bg-light">
                <div className="card-body">
                    <p>  <IconButton aria-label="Start" color="primary"  onClick={this.handleStartStop}> 
  <PlayIcon />
</IconButton>
 
        
        
      </p>
                </div>
            </div>
            <div className="card w-25 ">
                <div className="card-body">
                    <p> <EngineState enginestate={this.state.EngineState}/>...</p>
                </div>
            </div>
            </div>
            <div className="row d-flex justify-content-center">
            <div className="card w-100 bg-light justify-content-center">
                <Button color="secondary" className="button" onClick={this.handleChangeImage} endIcon={<KeyboardArrowDownIcon/>} />
                
                <div className="card-body">
                <img align="center"src={drumobject} width="60%" alt="Drum" class="rounded-circle mx-auto d-block"/>
                </div>
            </div>
            </div>
            <div className="row d-flex ">
            <div className="card w-100 bg-light">
                <div className="card-body">
                    <p></p>
                </div>
            </div>
            </div>
            
            </div>
            </div>
            
            
   
        </div>
    </div>
   
  </div>



        
        )
    }
}

function EngineState(props) {
    return props.enginestate
  }

export default withRouter( withTranslation()(WashingMachineFacePlate));

