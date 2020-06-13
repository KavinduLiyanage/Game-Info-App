import React, {Component} from 'react';
import axios from "axios";
import ImageSlider from "./sub/ImageSlider";
import {Typography} from "antd";

const { Title, Text } = Typography;

class GameInfo extends Component {

    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            gameName: "",
            gameDes: "",
            images: [],
            gamePrice: "",
            gameCategory: "",
            gameReleaseDate: ""
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/games/edit/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    gameName: response.data.gameName,
                    gameDes: response.data.gameDes,
                    images: response.data.images,
                    gamePrice: response.data.gamePrice,
                    gameCategory: response.data.gameCategory,
                    productTitle: response.data.gameName,
                    gameReleaseDate: response.data.gameReleaseDate,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="container" style={{ maxWidth: "700px", margin: "2rem auto"}}>
                    <div style={{ textAlign: "center" }}>
                        <Title level={2}>
                            <Text strong> {this.state.gameName} </Text>
                        </Title>
                    </div>
                    <ImageSlider images={this.state.images} />
                    <br/>
                    <h4><span className="badge badge-secondary">Release Date : {this.state.gameReleaseDate}</span></h4>
                    <h4><span className="badge badge-secondary">Category : {this.state.gameCategory}</span></h4>
                    <h4><span className="badge badge-secondary">Price : Rs.{this.state.gamePrice}.00</span></h4>
                    <h5><span className="badge badge-secondary">Description</span></h5>
                    <Text type="secondary">{this.state.gameDes}</Text>
                </div>
            </div>
        );
    }
}

export default GameInfo;