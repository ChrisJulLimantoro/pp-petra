import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";

class Testing extends React.Component {
    constructor() {
      super()
      this.renderPengajar = this.renderPengajar.bind(this);
  
      this.state = {
        filter: '',
        matkul: []
      }
    }
  
    componentDidMount() {
      // ajax call
      this.getMatkul();
    }
    
    getMatkul = async() => {
        let res = await axios.get('http://127.0.0.1:8000/getKelas');
        this.setState({matkul: res.data});
        console.log(this.state.matkul);
    }
  
    renderMatkul(item, index) {
        return (
            <li key={index}>
                Mata kuliah: {item.nama}
                <br />
                Hari : {item.hari}
                <br />
                Hari : {item.jam_mulai} - {item.jam_selesai}
                <br />
                Ruangan : {item.ruang}
                <br />
                Pengajar : { item.pengajar.nama }
            </li>
        )
    }

    renderPengajar(item) {
        return <>{item.nama}</>
    }
  
    render() {
        if (this.state.matkul.length === 0) {
            
            return <p>Loading...</p>
        }
        
        else {
            return (
              <div className="App">
                  <p>Daftar Kelas</p>
                <div>
                  <ol>
                    { this.state.matkul?.map(this.renderMatkul) }
                  </ol>
                </div>
              </div>
            );
        }
    }

}
export default Testing;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <>
            <Testing />
            </>
        </React.StrictMode>
    )
}