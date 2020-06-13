import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class RowGame extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios
            .get('http://localhost:4000/games/delete/' + this.props.obj._id)
            .then(console.log("Deleted"))
            .catch((err) => console.log(err));

        window.location='/manage'
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.gameName}</td>
                <td>{this.props.obj.gameReleaseDate}</td>
                <td>Rs.{this.props.obj.gamePrice}.00</td>
                <td>
                    <Link
                        to={"/edit/" + this.props.obj._id}
                        className="btn btn-outline-dark btn-sm"
                    >
                        Edit
                    </Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-outline-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default RowGame;
