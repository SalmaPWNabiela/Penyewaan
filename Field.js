import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Sewa extends Component{
    constructor(){
        super();
        this.state = {
            sewa: [],
            id_sewa: "",
            // id_lapangan: "",
            nama_lapangan: "",
            // gambar: null,
            // id_user: "",
            username: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
            message: ""
        }
        //jika tidak terdapat data token pada local storage
        if(!localStorage.getItem("Token")){
            //direct ke halaman login
            window.location = "/login";
        } 
    }

    bind = (event) => {
        //fungsi untuk membuka form tambah data
        this.setState({[event.target.name] : event.target.value});
    }

    // bindImage = (e) => {
    //     this.setState({gambar: e.target.files[0]})
    // }

    Add = () => {
        //fungsi untuk membuka form edit data
        //membuka modal
        $("#modal_sewa").modal("show");
        //mengosongkan data pada form
        this.setState({
            action: "insert",
            id_sewa: "",
            // id_lapangan: "",
            nama_lapangan: "",
            // gambar: null,
            // id_user: "",
            username: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            // status: "",
        });
    }

    Edit = (item) => {
        //membuka modal
        $("#modal_sewa").modal("show");
        //mengisikan data pada form
        this.setState({
            action: "update",
            id_sewa: item.id_sewa,
            // id_lapangan: item.id_lapangan,
            nama_lapangan: item.nama_lapangan,
            // gambar: item.gambar,
            // id_user: item.id_user,
            username: item.username,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
            durasi: item.durasi,
            biaya: item.biaya,
            // status: item.status,
        });
    }

    get_sewa = () => {
        $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa";
            axios.get(url)
            .then(response => {
                this.setState({sewa: response.data.sewa});
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Drop = (id_sewa) => {
    //     if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
    //         $("#loading").toast("show");
    //         let url = "http://localhost/lapangan/public/sewa/drop/"+id_sewa;
    //         axios.delete(url)
    //         .then(response => {
    //             $("#loading").toast("hide");
    //             this.setState({message: response.data.message});
    //             $("#message").toast("show");
    //             this.get_sewa();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     }
    // }

    Save = (event) => {
        event.preventDefault();
            //menampilkan proses loading
            $("#loading").toast("show");
            //menutup form modal
            // $("#modal_user").modal("hide");
            let url = "http://localhost/lapangan/public/sewa/save";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("id_sewa", this.state.id_sewa);
            // form.append("id_lapangan", this.state.id_lapangan);
            form.append("nama_lapangan", this.state.nama_lapangan);
            // form.append("gambar", this.state.gambar);
            // form.append("id_user", this.state.id_user);
            form.append("username", this.state.username);
            form.append("tgl_book", this.state.tgl_book);
            form.append("wkt_mulai", this.state.wkt_mulai);
            form.append("wkt_selesai", this.state.wkt_selesai);
            form.append("durasi", this.state.durasi);
            form.append("biaya", this.state.biaya);
            form.append("status", this.state.status);
            
            
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_sewa();
            })
            .catch(error => {
                console.log(error);
            });
    }

    

    // Book = (id_sewa) => {
    //     if (window.confirm("Lapangan berhasil digunakan")){
    //         $("#loading").toast("show");
    //         let url = "http://localhost/lapangan/public/sewa/used/" + id_sewa;
    //         axios.post(url)
    //         .then(response => {
    //             $("#loading").toast("hide");
    //             this.setState({message: response.data.message});
    //             $("message").toast("show");
    //             this.get_sewa();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     }
    // }

    // Done = (id_sewa) => {
    //     if (window.confirm("Lapangan selesai digunakan")){
    //         $("#loading").toast("show");
    //         let url = "http://localhost/lapangan/public/sewa/done/" + id_sewa;
    //         axios.post(url)
    //         .then(response => {
    //             $("#loading").toast("hide");
    //             this.setState({message: response.data.message});
    //             $("message").toast("show");
    //             this.get_sewa();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     }
    // }

    componentDidMount = () => {
        this.get_sewa();
    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/find";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({sewa: response.data.sewa});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render(){
        console.log(this.state.sewa)
        return(
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">FIELD</h4>
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
                                    {/* <th>Id Sewa</th>
                                    <th>Id Field</th> */}
                                    <th>Name of Field</th>
                                    {/* <th>Image</th> */}
                                    {/* <th>Id User</th> */}
                                    <th>Username</th>
                                    <th>Date of Book</th>
                                    <th>Time Start</th>
                                    <th>Time End</th>
                                    <th>Duration</th>
                                    <th>Bill</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sewa.map((item) => {
                                    return(
                                        <tr key={item.id_sewa}>
                                            {/* <td>{item.id_sewa}</td>
                                            <td>{item.id_lapangan}</td> */}
                                            <td>{item.nama_lapangan}</td>
                                            {/* <td>{item.gambar}</td> */}
                                            {/* <td>{item.id_user}</td> */}
                                            <td>{item.username}</td>                                            
                                            <td>{item.tgl_book}</td>
                                            <td>{item.wkt_mulai}</td>
                                            <td>{item.wkt_selesai}</td>
                                            <td>{item.durasi}</td>
                                            <td>{item.biaya}</td>
                                            <td>{item.status}</td>
                                            <td>

                                                {/* <button className="m-1 btn btn-sm btn-info"
                                                 onClick={() => this.Save(item.id_sewa)}>
                                                    <span className="fa fa-check"></span> Book
                                                </button> */}

                                                <button className="m-1 btn btn-sm btn-info"
                                                    onClick={() => this.Save(item.id_sewa)}>
                                                    <span className="fa fa-edit"></span> Book
                                                </button>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        <button className="btn btn-info my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Add Data
                        </button>

                        <Modal id="modal_sewa" title="Form Sewa" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Id Sewa
                                <input type="number" className="form-control" name="id_sewa"
                                value={this.state.id_sewa} onChange={this.bind}
                                required />
                                Name of Field
                                <input type="text" className="form-control" name="nama_lapangan"
                                value={this.state.nama_lapangan} onChange={this.bind}
                                required />
                                {/* Image
                                <input type="file" className="form-control" name="gambar"
                                value={this.state.gambar} onChange={this.bindImage}
                                required /> */}
                                Username
                                <input type="text" className="form-control" name="username"
                                value={this.state.username} onChange={this.bind}
                                required />
                                Date of Book
                                <input type="date" className="form-control" name="tgl_book"
                                value={this.state.tgl_book} onChange={this.bind}
                                required />
                                Time Start
                                <input type="time" className="form-control" name="wkt_mulai"
                                value={this.state.wkt_mulai} onChange={this.bind}
                                required />
                                Time End
                                <input type="time" className="form-control" name="wkt_selesai"
                                value={this.state.wkt_selesai} onChange={this.bind}
                                required />
                                Duration
                                <input type="text" className="form-control" name="durasi"
                                value={this.state.durasi} onChange={this.bind}
                                required />
                                Bill
                                <input type="text" className="form-control" name="biaya"
                                value={this.state.biaya} onChange={this.bind}
                                required />
                                Status
                                <input type="text" className="form-control" name="status"
                                value={this.state.status} onChange={this.bind}
                                required />

                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Save
                                </button>
                            </form>
                        </Modal>

                        <Modal id="modal_book" title="Save" bg_header="warning"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                {/* <input type="text" className="form-control" name="status"
                                 value={this.state.status} onChange={this.bind} placeholder="Status" required /> */}
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}