import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Lapangan extends Component{
    constructor(){
        super();
        this.state = {
            lapangan: [],
            id: "",
            nama: "",
            harga: "",
            gambar: null,
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

    bindImage = (e) => {
        this.setState({gambar: e.target.files[0]})
    }

    Add = () => {
        //fungsi untuk membuka form edit data
        //membuka modal
        $("#modal_lapangan").modal("show");
        //mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            nama: "",
            harga: "",
            gambar: null,
        });
    }

    Edit = (item) => {
        //membuka modal
        $("#modal_lapangan").modal("show");
        //mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            nama: item.nama,
            harga: item.harga,
            gambar: item.gambar,
        });
    }

    get_lapangan = () => {
        $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/lapangan";
            axios.get(url)
            .then(response => {
                this.setState({lapangan: response.data.lapangan});
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Drop = (id) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/lapangan/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_lapangan();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount = () => {
        this.get_lapangan();
    }

    Save = (event) => {
        event.preventDefault();
            //menampilkan proses loading
            $("#loading").toast("show");
            //menutup form modal
            // $("#modal_user").modal("hide");
            let url = "http://localhost/lapangan/public/lapangan/save";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("id", this.state.id);
            form.append("nama", this.state.nama);
            form.append("harga", this.state.harga);
            // form.append("gambar", this.state.gambar,this.state.gambar.name);
            form.append("gambar", this.state.gambar);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_lapangan();
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/lapangan/find";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({lapangan: response.data.lapangan});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render(){
        console.log(this.state.lapangan)
        return(
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Lapangan</h4>
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
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Gambar</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lapangan.map((item) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.harga}</td>
                                            {/* <td>{item.gambar}</td> */}
                                            <td><img src={'http://localhost/lapangan/public/images/' + item.gambar}
                                                 alt={item.gambar} width="200px" height="200px" />
                                            </td>
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
                        <Modal id="modal_lapangan" title="Form Lapangan" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Id Lapangan
                                <input type="number" className="form-control" name="id"
                                value={this.state.id} onChange={this.bind}
                                required />
                                Nama
                                <input type="text" className="form-control" name="nama"
                                value={this.state.nama} onChange={this.bind}
                                required />
                                Harga
                                <input type="text" className="form-control" name="harga"
                                value={this.state.harga} onChange={this.bind}
                                required />
                                {/* Password
                                <input type="password" className="form-control" name="password"
                                value={this.state.password} onChange={this.bind}
                                required />

                                <label htmlFor="role">Role</label>
                                <select className="form-control" name="role" value={this.state.role} onChange={this.bind} required >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select> */}
                                Gambar
                                <input type="file" className="form-control" name="gambar"
                                onChange={this.bindImage} />
                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}