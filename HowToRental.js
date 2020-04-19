import React, {Component} from "react"
import axios from "axios"

export default class HowToRental extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="container">
                <div class="jumbotron text-center" style={{marginBottom: '0'}} >
                    <h4>How To Rental Basket Field</h4>
                    <ul>
                        <li className="text-left">
                            Register account
                        </li>
                        <li className="text-left">
                            Choose your favorite basket field on tab field
                        </li>
                        <li className="text-left">
                            Do transaction
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}