import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import './Profil.css';

class Profil extends Component {
    constructor() {
        super();
        this.state = {
            profil: [],
            id_user: "",
            first_name: "",
            last_name: "",
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: "",
            image: "",
            action: "",
            find: "",
            message: "",
        }
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login
            window.location = "/login";
        }
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    bindImage = (event) => {
        this.setState({ image: event.target.files[0] })
    }

    Edit = (item) => {
        // membuka modal
        $("#modal_profil").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_user: item.id_user,
            first_name: "",
            last_name: "",
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: "",
            message: ""
            // img_user: item.img_user,
        });
    }

    get_profil = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id_user'))
        let url = "http://localhost/lapangan/public/myprofil/" + id;
        axios.get(url)
            .then(response => {
                this.setState({users:[response.data.users]})
                console.log(response.data.users)
                // console.log(response.data)({
                //     profil: response.data.profil
                // })
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Drop = (id) => {
    //     if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
    //         // $("#loading").toast("show");
    //         let url = "http://localhost/lapangan/public/myprofil/drop/" + id.profil;
    //         axios.delete(url)
    //             .then(response => {
    //                 $("#loading").toast("hide");
    //                 this.setState({ message: response.data.message });
    //                 $("#message").toast("show");
    //                 this.get_profil();
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }

    componentDidMount = () => {
        this.get_profil();
    }

    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_profil").modal("hide");
        let url = "http://localhost/toko_online/toko_online/public/profil/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("gender", this.state.gender);
        form.append("date_birth", this.state.date_birth);
        form.append("no_hp", this.state.no_hp);
        form.append("alamat", this.state.alamat);
        //   form.append("img_user", this.state.img_user, this.state.img_user.name);
        axios.post(url, form)

            .then(response => {
                // $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_profil();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.users)
        return (
            <div className="container">
                <div>
                    <div style={{ paddingTop: "4%" }}>
                        <div className="#" style={{ maxwidth: "200px" }}>
                            <div className="row no-gutters shadow">
                                {/* <div className="col-sm-3 ">
                                    { this.state.profil.map((item) => {
                                        return(
                                            <img src={"http://localhost/toko_online/toko_online/public/image/profil/" + item.image} className="rounded mx-auto d-block" style={{marginTop: "80px",  width: "200px"}} />
                                        );
                                    })}
                                </div> */}

                                <div className="col-md-8 ">
                                    <div className="card-body">
                                        <center><h4 className="card-title" style={{ fontWeight: "500px" }}>Data Profil</h4></center>
                                        <table className="table table-borderless">
                                            {this.state.profil.map((item) => {
                                                return (
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">First Name : {item.first_name}</li>
                                                        <li className="list-group-item">Last Name : {item.last_name}</li>
                                                        <li className="list-group-item">Gender : {item.gender}</li>
                                                        <li className="list-group-item">Tanggal Lahir : {item.date_birth}</li>
                                                        <li className="list-group-item">No Hp : {item.no_hp}</li>
                                                        <li className="list-group-item">Alamat : {item.alamat}</li>
                                                        <li className="list-group-item">
                                                            <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit(item)}>
                                                                <span className="fa fa-edit">Edit</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                );
                                            })}
                                        </table>
                                        {/* <button type="#" className="btn btn-outline-info pull-left m-2">
                                         <span className="fa fa-edit"></span> Edit
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="card-body"> <br/><br/><br/>
                            <h4 className="card-title" style={{ fontWeight: "500" }}>Data Pengiriman
                                <button className="m-1 btn btn-sm btn-outline-success" onClick={this.Add_alamat}>
                                    <span className="fa fa-edit">Tambah Alamat</span>
                                </button>
                            </h4>
                            
                            <div class="row">
                                {this.state.alamat.map((item) => {
                                    return (
                                        <div class="col-sm-5" style={{ marginTop: "2%", marginLeft: "0%" }}>
                                            <div class="card shadow" style={{ marginBottom: "20px" }}>
                                                <div class="card-header card-0 text-white bg-dark " style={{ textAlign: "center" }}>
                                                    {item.judul}
                                                </div>
                                                <div class="card-body">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                                                        <li className="list-group-item">No. HP : {item.no_hp}</li>
                                                        <li className="list-group-item">Provinsi : {item.provinsi}</li>
                                                        <li className="list-group-item">Kota : {item.kota}</li>
                                                        <li className="list-group-item">Kecamatan : {item.kecamatan}</li>
                                                        <li className="list-group-item">Detail Alamat : {item.detail_alamat}</li>
                                                        <li className="list-group-item">
                                                            <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit_alamat(item)}>
                                                                <span className="fa fa-edit">Edit</span>
                                                            </button>
                                                            <button className="m-1 btn btn-sm btn-outline-danger"
                                                                onClick={() => this.Drop_alamat(item.id_alamat)}>
                                                                <span className="fa fa-trash">Delete</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div> */}
                            <br />
                        </div>
                    </div>

                    <Modal id="modal_profil" title="Form User" bg_header="primary" text_header="white">
                        <form onSubmit={this.Save}>
                            Id User
                            <input type="text" className="form-control" name="id_user"
                                value={this.state.id_user} onChange={this.bind} required />
                            First Name
                            <input type="text" className="form-control" name="first_name"
                                value={this.state.first_name} onChange={this.bind} required />
                            Last Name
                            <input type="date" className="form-control" name="last_name"
                                value={this.state.last_name} onChange={this.bind} required />

                            <div className="form-group">
                                <label htmlFor="role">Gender</label>
                                <select className="form-control" name="jenis_kelamin" value={this.state.value} onChange={this.bind} required>
                                    <option value="laki-laki">Laki laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                            </div>

                            Date of Birth
                            <input type="date" className="form-control" name="date_birth"
                                value={this.state.date_birth} onChange={this.bind} required />
                            {/* Foto
                            <input type="file" className="form-control" name="img_user"
                                onChange={this.bindImage} /> */}
                            No.HP
                            <input type="text" className="form-control" name="no_hp"
                                value={this.state.no_hp} onChange={this.bind} required />
                            Alamat
                            <input type="text" className="form-control" name="alamat_ktp"
                                value={this.state.alamat_ktp} onChange={this.bind} required />

                            <button type="submit" className="btn btn-info pull-right m-2">
                                <span className="fa fa-check"></span> Simpan
                            </button>
                        </form>
                    </Modal>

                    {/* <Modal id="modal_alamat" title="Form Alamat" bg_header="success" text_header="white">
                        <form onSubmit={this.Save_alamat}>
                            Nama Penerima
                            <input type="text" className="form-control" name="nama_penerima"
                                value={this.state.nama_penerima} onChange={this.bind} required />
                            No. HP
                            <input type="text" className="form-control" name="no_hp"
                                value={this.state.no_hp} onChange={this.bind} required />
                            Provinsi
                            <input type="text" className="form-control" name="provinsi"
                                value={this.state.provinsi} onChange={this.bind} required />
                            Kota
                            <input type="text" className="form-control" name="kota"
                                value={this.state.kota} onChange={this.bind} required />
                            Kecamatan
                            <input type="text" className="form-control" name="kecamatan"
                                value={this.state.kecamatan} onChange={this.bind} required />
                            Detail Alamat
                            <input type="text" className="form-control" name="detail_alamat"
                                value={this.state.detail_alamat} onChange={this.bind} required />

                            <button type="submit" className="btn btn-info pull-right m-2">
                                <span className="fa fa-check"></span> Save
                            </button>
                        </form>
                    </Modal> */}
                </div>
            // </div>
        );
    }
}
export default Profil;