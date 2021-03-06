import React from 'react';
import './App.css';
import {getAllMacdo} from "./service/Api";
import { BulletList } from 'react-content-loader'



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
            macDoiList: [],
            loader: true

        }
        this.dataLenght = 0
    }

    
    componentDidMount() {
        getAllMacdo().then(data => {
            this.setState({ macDoiList: data.response , loader: false  })
            });
    }

    onChangeText = (e) => {

        this.setState({ search: e.target.value, loader: true });
       let newList = [];


        if(e.target.value === ""){

            this.setState({ loader: true });

            getAllMacdo().then(data => {
                this.setState({ macDoiList: data.response, loader: false  });
                this.dataLenght = this.state.macDoiList.length;
            });
            newList = this.state.macDoiList;


        } else {
         const  currentList = this.state.macDoiList;
         const response = [];
            
            currentList.map(data => {
                const reverseSplitName = data.name.split("").reverse().join("");
                const recupereAk = reverseSplitName.slice(0,2).split("").reverse().join("");
                const ObjectId = {
                    "indice" : recupereAk
                }
                 response.push(Object.assign(ObjectId,data));
            });


            newList = response.filter(item => {
                const lc = item.indice.toLowerCase();
                const filter = e.target.value.toLowerCase();
                console.log(lc);
                return lc.includes(filter);
            });

        }


        this.setState({
            macDoiList: newList,
            loader: false
    });

    }


    render() {
        console.log("macDoiList", this.state.macDoiList);

        if (this.state.loader ){
            return (
                <div className="container">
                    <p className="title" >
                        Bare de recherche
                    </p>
                    <div className="input-group mb-3">
                        <input   onChange={this.onChangeText} type="text" className="form-control" placeholder="Trouver un macDonalds ...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Recherche</span>
                        </div>
                    </div>
                    <div>
                        <p>
                            <BulletList
                                width={400}
                            />
                        </p>
                    </div>
                </div>
            )

        }else {

            return(

                <div className="container">
                    <p className="title" >
                        Bare de recherche
                    </p>
                    <div className="input-group mb-3">
                        <input   onChange={this.onChangeText} type="text" className="form-control" placeholder="Trouver un macDonalds ...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Recherche</span>
                        </div>
                    </div>



                    <div>

                        { this.state.macDoiList.map((data , index) =>
                            <ul key={index} >
                                <li>
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
}





export default App;
