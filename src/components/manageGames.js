import React, {Component} from 'react';
import axios from 'axios';
import RowGame from "./sub/rowGame";

class ManageGames extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game : []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/games')
            .then(response => {
                this.setState({
                    game : response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    gameList() {
        return this.state.game.map( function (object, i) {
            return <RowGame obj={object} key={i}/>;
        });
    }

    render() {
        return (
            <div className="container" style={{ maxWidth: "900px", margin: "2rem auto"}}>
                <h3 align="center">Games List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Release Date</th>
                        <th>Price</th>
                        <th className="text-center" >Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.gameList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ManageGames;