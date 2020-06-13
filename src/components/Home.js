import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import ImageSlider from "./sub/ImageSlider";

const { Meta } = Card;
const { Text } = Typography;

function Home() {
    const [Games, setGames] = useState([]);

    useEffect(() => {
        const variables = {};

        getGames(variables);
    }, []);

    const getGames = (variables) => {
        Axios.get('http://localhost:4000/games/getgames', variables).then(
            (response) => {
                if (response.data.success) {
                    setGames(response.data.games);

                } else {
                    alert("Failed to fectch product datas");
                }

            }
        );
    };

    const renderCards = Games.map((game, index) => {
        return (
            <Col key={game._id} lg={6} md={8} xs={24}>
                <Card
                    hoverable={true}
                    cover={
                        <Link to={"/storeManager/edit/" + game._id}>
                            <ImageSlider images={game.images} />
                        </Link>
                    }
                >
                    <Meta
                        title={game.gameName}
                        description={`Rs.${game.gamePrice}.00`}
                    />

                    <div>

                    </div>
                </Card>
            </Col>
        );
    }).reverse();

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>

            {/* Search */}

            {/* Product card view  */}
            {Games.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        height: "300px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h2>Loading...</h2>
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
