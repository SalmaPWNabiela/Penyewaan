import React, {Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from "react-router-dom";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            role: "",
            massage: "",
        } 
    }
    
    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/lapangan/public/login";
        let form = new FormData();
        // form.append("name", this.state.name);
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        // form.append("role", this.state.role);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            let role = response.data.users.role
            if(logged) {
                { role === "Admin" ? window.location = "/lapangan" : window.location = "/home" }
                this.setState({message: "Login Berhasil"});
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("role", JSON.stringify(response.data.users.role));
                localStorage.setItem("id", JSON.stringify(response.data.users.id));
            }
            else{
                this.setState({message: "Login Gagal"});
            }
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <div className="container width" 
             style={{width: 24 + "rem", paddingTop: 6 + "rem"}}>
                <div className="card my-2">
                    <div className="card-header bg-dark">
                        <h3 className="text-white text-center">Login</h3>
                    </div>
                    <div className="card-body">
                        <Toast id="message" autohide="false" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <form onSubmit={this.Login} className="mt-4">
                            <div className="form-group">
                                <input type="text" className="form-control" name="username"
                                 value={this.state.username} onChange={this.bind}
                                placeholder="Enter Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password"
                                 value={this.state.password} onChange={this.bind}
                                 required placeholder="Enter Password" />
                            </div>
                            
                            <button className="mt-2 btn btn-block btn-dark" type="submit">
                                <span className="fa fa-sign-in"></span> Login
                            </button>
                        </form>
                        <p className="text-center mt-2">Don't have an account?
                        <Link to="/register">Registration</Link></p>
                        {/* <Link to='/registrasi'>Registrasi</Link> */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;