import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Member extends Component{
    constructor(){
        super();
        this.state = {
            users: [],
            id: "",
            username: "",
            email: "",
            password: "",
            role: "",

            first_name: "",
            last_name: "",
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: "",
            // image: null,
            message: ""
        }
        //jika tidak terdapat data token pada local storage
        // if(!localStorage.getItem("Token")){
        //     //direct ke halaman login
        //     window.location = "/login";
        // } 
    }

    bind = (event) => {
        //fungsi untuk membuka form tambah data
        this.setState({[event.target.name] : event.target.value});
    }

    // bindImage = (e) => {
    //     this.setState({image: e.target.files[0]})
    // }

    Add = () => {
        //fungsi untuk membuka form edit data
        //membuka modal
        $("#modal_users").modal("show");
        //mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            username: "",
            email: "",
            password: "",
            role: "",

            first_name: "",
            last_name: "",
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: "",
            // image: null
        });
    }

    Edit = (item) => {
        //membuka modal
        $("#modal_users").modal("show");
        //mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            username: item.username,
            email: item.email,
            password: item.password,
            role: item.role,

            first_name: "",
            last_name: "",
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: "",
            // image: item.image
        });
    }

    get_users = () => {
        $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member";
            axios.get(url)
            .then(response => {
                this.setState({users: response.data.member});
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Drop = (id) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_users();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount = () => {
        this.get_users();
    }

    Save = (event) => {
        event.preventDefault();
            //menampilkan proses loading
            $("#loading").toast("show");
            //menutup form modal
            // $("#modal_user").modal("hide");
            let url = "http://localhost/lapangan/public/member/save";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("id", this.state.id);
            form.append("username", this.state.username);
            form.append("email", this.state.email);
            form.append("password", this.state.password);
            form.append("role", this.state.role);

            form.append("first_name", this.state.first_name);
            form.append("last_name", this.state.last_name);
            form.append("gender", this.state.gender);
            form.append("date_birth", this.state.date_birth);
            form.append("no_hp", this.state.no_hp);
            form.append("alamat", this.state.alamat);
            // form.append("image", this.state.image,this.state.image.name);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_users();
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member/find";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({member: response.data.member});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render(){
        console.log(this.state.users)
        return(
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Member</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                 onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                 placeholder="Pencarian..." />
                            </div>
                        </div>
                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Role</th>

                                    {/* <th>Role</th> */}
                                    {/* <th>Image</th> */}
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((item) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.password}</td>
                                            <td>{item.role}</td>
                                            {/* <td><img src={'http://localhost/toko_online/toko_online/public/images/' + item.image}
                                                    alt={item.image} width="200px" height="200px" />
                                            </td> */}
                                            <td>
                                                <button className="m-1 btn btn-sm btn-warning"
                                                 onClick={() => this.Edit(item)}>
                                                     <span className="fa fa-edit"></span> Edit
                                                 </button>
                                                 <button className="m-1 btn btn-sm btn-danger"
                                                  onClick={() => this.Drop(item.id)}>
                                                      <span className="fa fa-trash"></span> Hapus
                                                  </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-info my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal user */}
                        <Modal id="modal_users" title="Form User" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Id User
                                <input type="number" className="form-control" name="id"
                                value={this.state.id} onChange={this.bind}
                                required />
                                Username
                                <input type="text" className="form-control" name="username"
                                value={this.state.username} onChange={this.bind}
                                required />
                                Email
                                <input type="email" className="form-control" name="email"
                                value={this.state.email} onChange={this.bind}
                                required />
                                Password
                                <input type="password" className="form-control" name="password"
                                value={this.state.password} onChange={this.bind}
                                required />

                                <label htmlFor="role">Role</label>
                                <select className="form-control" name="role" value={this.state.role} onChange={this.bind} required >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                
                                {/* Image
                                <input type="file" className="form-control" name="image"
                                onChange={this.bindImage} /> */}
                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
                {/* Role
                                <input type="text" className="form-control" name="role"
                                value={this.state.role} onChange={this.bind}
                                required /> */}
            </div>
        );
    }
}