import React, {Component} from 'react';
import { Typography, Button, Form, message, Input, Icon, DatePicker } from 'antd';
import ImageUpload from "./sub/imageUpload";
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Category = [
    { key: 1, value: "Action" },
    { key: 2, value: "Adventure" },
    { key: 3, value: "Simulations" },
    { key: 4, value: "Role-playing" },
    { key: 5, value: "Strategy" },
    { key: 6, value: "Racing" },
    { key: 7, value: "Sports" }
]

export class AddGame extends Component {

    constructor(props) {
        super(props);

        // Setting up functions
        this.onChangeGameName = this.onChangeGameName.bind(this);
        this.onChangeGameDes = this.onChangeGameDes.bind(this);
        this.updateFiles = this.updateFiles.bind(this);
        this.onChangeGamePrice = this.onChangeGamePrice.bind(this);
        this.onChangeGameCategory = this.onChangeGameCategory.bind(this);
        this.onChangeGameReleaseDate = this.onChangeGameReleaseDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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


    onChangeGameName(e) {
        this.setState({
            gameName: e.target.value,
        });
    }

    onChangeGameDes(e) {
        this.setState({
            gameDes: e.target.value,
        });
    }

    updateFiles(newImages) {
        this.setState({
            images: newImages,
        });
    }

    onChangeGamePrice(e) {
        this.setState({
            gamePrice: e.target.value,
        });
    }

    onChangeGameCategory(e) {
        this.setState({
            gameCategory: e.target.value,
        });
    }

    onChangeGameReleaseDate(date, dateString) {
        this.setState({
            gameReleaseDate: dateString,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        /*if (!this.state.gameName || !this.state.gameDes || !this.state.images
            || !this.state.gamePrice || !this.state.gameCategory) {
            return alert('Please fill all the fields')
        }*/

        const obj = {
            gameName: this.state.gameName,
            gameDes: this.state.gameDes,
            images: this.state.images,
            gamePrice: this.state.gamePrice,
            gameCategory: this.state.gameCategory,
            gameReleaseDate: this.state.gameReleaseDate
        };
        axios
            .post('http://localhost:4000/games/add', obj)
            .then((res) => console.log(res.data));

        window.location='/'
        //this.props.history.push("/");

    }

    render() {
        return (
            <div
                className="container"
                style={{ maxWidth: "700px", margin: "2rem auto", marginTop: 70 }}
            >
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <Title level={2}>
                        {" "}
                        Add new game status
                    </Title>
                </div>

                <Form onSubmit={this.onSubmit}>
                    {/* DropZone */}
                    <ImageUpload refreshFunction={this.updateFiles} />

                    <br />
                    <br />
                    <label>Game Category</label>
                    <select
                        ref="productCategory"
                        required
                        className="form-control"
                        value={this.state.gameCategory}
                        onChange={this.onChangeGameCategory}
                    >
                        {Category.map(function (product) {
                            return (
                                <option key={product.key} value={product.value}>
                                    {product.value}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    <label>Game Name</label>
                    <Input
                        required
                        onChange={this.onChangeGameName}
                        value={this.state.gameName}
                    />
                    <br />
                    <br />
                    <label>Game Description</label>
                    <TextArea
                        required
                        onChange={this.onChangeGameDes}
                        value={this.state.gameDes}
                    />
                    <br />
                    <br />
                    <label>Game Price</label>
                    <Input
                        required
                        onChange={this.onChangeGamePrice}
                        value={this.state.gamePrice}
                        type="number"
                    />
                    <br />
                    <br />
                    <label>Game Release Date</label>

                    <DatePicker onChange={this.onChangeGameReleaseDate} />


                    <br />
                    <br />
                    <Button type="primary" size="large" block onClick={this.onSubmit}>
                        Add
                    </Button>
                </Form>
            </div>
        );
    }
}

export default AddGame;
