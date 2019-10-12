import React from 'react';
import './App.css';
import {getAllMacdo} from "./service/Api";

//
// import {Map, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from "axios";



class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
            search: '',
            macDoiList: []

        }


    }

    componentDidMount() {

        getAllMacdo().then(data => {
            this.setState({ macDoiList: data.response  })
            });

    }

    onChangeText = (e) => {

        this.setState({ search: e.target.value })
       let newList = [];
        let currentList = [];
        if(e.target.value === ""){

            getAllMacdo().then(data => {
                this.setState({ macDoiList: data.response  })
            });

            newList = this.state.macDoiList;

        } else {
            currentList = this.state.macDoiList;

            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase();
                const filter = e.target.value.toLowerCase();
                const splitString = lc.split("").reverse().join("");

                const word = splitString.replace(splitString.slice(0,2) , splitString.slice(0,2).split("").reverse().join(""));


                return word.includes(filter);
            });
        }


        this.setState({
            macDoiList: newList
        });

    }


    render() {
        console.log("macDoiList", this.state.macDoiList);
    return(
        <div className="container">
            <p className="title" >
                c'est ok
            </p>

            <div className="input-group mb-3">


                <input   onChange={this.onChangeText} type="text" className="form-control" placeholder="Trouver un macDonalds ...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Recherche</span>
                    </div>
            </div>

            <div>
                { this.state.search }
            </div>

            <div>

                    { this.state.macDoiList.map((data , index) =>
                        <ul key={index} >
                             <li  >
                                 <p>
                                     {data.name} &nbsp; {data.position} &nbsp; {data.address}
                                 </p>
                             </li>
                        </ul>
                    ) }

            </div>



       <div>
           {/*<Map center={position} zoom={this.state.zoom}>*/}
           {/*    <TileLayer*/}
           {/*        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/}
           {/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
           {/*    />*/}
           {/*    <Marker position={position}>*/}
           {/*        <Popup>*/}
           {/*            A pretty CSS3 popup. <br /> Easily customizable.*/}
           {/*        </Popup>*/}
           {/*    </Marker>*/}
           {/*</Map>*/}
       </div>


        </div>

    )
  }
}





export default App;
