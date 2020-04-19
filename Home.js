import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MasOka from "../image/mas okazaki.jpg";
import Labas from "../image/labas.jpg";
import Labas1 from "../image/labas3.jpg";

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            home: [],
            find: "",
            filter: ""
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    //apa lagi nanti

    render(){
        return(
            <div className="container">
                <div class="jumbotron text-center" style={{marginBottom: '0'}} >
                    <h1>Rental Basket Field</h1>
                    <p>This web rent Basket Field</p>
                </div>

                <nav class="navbar navbar-expand-sm bg-info navbar-light">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">
                                <h5>Basket Field</h5>
                            </a>
                        </li>
                        {/* <li className="navbar-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/field">Field</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/howtorental">How to Rental</Link>
                        </li> */}
                        {/* <li className="navbar-item">
                            <Link className="nav-link" to="">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="">Logout</Link>
                        </li> */}
                    </ul>
                </nav>
                
                <div class="container" style={{marginTop:"30px"}}>
                    <div class="row">
                        <div class="col-sm-4">
                            <h2>About me</h2>
                            <h5>Photo of me:</h5>
                            <div class="img">
                                <img className="d-block img-fluid" src={MasOka} alt="Second slide"></img>
                            </div>
                            <p>I am Salma. I am student in <kbd>Telkom Schools Malang</kbd>. I hope this website can give you some information. Thank you and Enjoy!</p>
                            <h3>Some Links</h3>
                            <p>Some links for see other information in my website</p>
                            <ul class="nav nav-pills flex-column nav-info">
                                <li class="nav-item">
                                    <a class="nav-link active" to="/home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" to="/field">Field</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" to="/login">Login</a>
                                </li>
                            </ul>
                            <hr class="d-sm-none" />
                        </div>

                        <div class="col-sm-8">
                            <h2>Trending Top I</h2>
                            <h5>Updated on, Apr 5, 2020</h5>
                            <div class="img">
                                <img className="d-block img-fluid" src={Labas1} alt="Second slide"></img>
                            </div>
                            <p><b>Labas on Jl Danau Ranau</b></p>
                            <p>Labas is "Lapangan Basket" in Indonesian Language. Labas on Jl Danau Ranau is the most 
                                popular field in this website. Many user rental this field.
                            </p>

                            <br/>
                            
                            <h2>Trending Top II</h2>
                            <h5>Updated on, Apr 4, 2020</h5>
                            <div class="img">
                                <img className="d-block img-fluid" src={Labas} alt="Second slide"></img>
                            </div>
                            <p><b>Labas on Araya</b></p>
                            <p>This field place on Araya behind Plaza Araya. This field have best view in the afternoon.
                            </p>

                            <Link to="/field">
                                <button className="btn btn-light float-right">
                                    <span className="fa fa-check"></span> Book
                                </button>
                            </Link> 
                        </div>
                    </div>
                </div>
                <br /><br />
                <div class="jumbotron" style={{marginBottom:'0'}}>
                    <div classname="text-white text-center">
                        <p><small>
                            Copyright @ W3schools
                        </small></p>
                    </div>
                    <div classname="text-white text-left">
                        <p><small>
                            <b>Contact Me</b> <br/>
                            <span className="fa fa-map-marker"></span> Address <br/>
                            Pondok Blimbing Indah blok M3 no.8 <br/>
                            <span className="fa fa-phone"></span> Phone <br/>
                            081234567890 <br/>
                            <span className="fa fa-email"></span> Email <br/>
                            rental.field@gmail.com <br/>
                            
                        </small></p>
                    </div>
                </div> 
            </div>
        )
    }
}