import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import ImageSlider from "./sub/ImageSlider";

const { Meta } = Card;
const { Text } = Typography;

function Home() {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        const variables = {};

        getProducts(variables);
    }, []);

    const getProducts = (variables) => {
        Axios.get('http://localhost:4000/games/', variables).then(
            (response) => {
                if (response.data.success) {
                    setProducts(response.data.games);

                } else {
                    alert("Failed to fectch product datas");
                }

            }
        );
    };

    const renderCards = Products.map((product, index) => {
        return (
            <Col key={product._id} lg={6} md={8} xs={24}>
                <Card
                    hoverable={true}
                    cover={
                        <Link to={"/storeManager/edit/" + product._id}>
                            <ImageSlider images={product.images} />
                        </Link>
                    }
                >
                    <Meta
                        title={product.gameName}
                        description={`Rs.${product.gamePrice}.00`}
                    />

                    <div>
                        
                    </div>
                </Card>
            </Col>
        );
    }).reverse();

    return (
        <div style={{ width: "75%", margin: "3rem auto", marginTop: 70 }}>
            <div style={{ textAlign: "center" }}>
                <h2> Available Products </h2>
            </div>



            {/* Search */}


            {/* Product card view  */}
            {Products.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        height: "300px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h2>No product yet...</h2>
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
