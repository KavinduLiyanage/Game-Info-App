import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import ImageSlider from "./sub/ImageSlider";
import SearchFeature from "./sub/SearchFeature";

const { Meta } = Card;
const { Text } = Typography;

function Home() {

    const [Games, setGames] = useState([]);
    const [SearchTerms, setSearchTerms] = useState("");

    useEffect(() => {
        const variables = {};

        getGames(variables);
    }, []);

    //Fetching all games details
    const getGames = (variables) => {
        Axios.post('http://localhost:4000/games/getgames', variables).then(
            (response) => {
                if (response.data.success) {
                    setGames(response.data.games);

                } else {
                    alert("Failed to fetch game data");
                }
            }
        );
    };

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            searchTerm: newSearchTerm,
        };

        setSearchTerms(newSearchTerm);
        getGames(variables);
    };

    const renderCards = Games.map((game, index) => {
        return (
            <Col key={game._id} lg={8} md={20} xs={24}>
                <Card hoverable={true}
                    cover={
                        <Link to={"/" + game._id}>
                            <ImageSlider images={game.images} />
                        </Link>
                    }
                >
                    <Meta title={game.gameName}/>
                    <div className="additional">
                        <Text type="warning">Category : {game.gameCategory}</Text>
                        <br />
                        <Text type="secondary">Release Date : {game.gameReleaseDate}</Text>
                    </div>
                </Card>
            </Col>
        );
    }).reverse();

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>

            {/* Search */}
            <div style={{display: "flex", justifyContent: "flex-end", margin: "1rem auto",}}>
                <SearchFeature refreshFunction={updateSearchTerms} />
            </div>

            {/* Game card view  */}
            {Games.length === 0 ? (
                <div style={{display: "flex", height: "300px", justifyContent: "center", alignItems: "center",}}>
                    <h2>No Games yet...</h2>
                </div>
            ) : (
                <div>
                    <Row gutter={[16, 16]}>{renderCards}</Row>
                </div>
            )}
            <br />
            <br />
        </div>
    );
}

export default Home;
