import React from 'react'
import { Card, CardHeader, CardBody, Row, Col, CardFooter } from "reactstrap"
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import axios from 'axios';

const ALMUMSPHOTOSLIST_BASEURL = "https://jsonplaceholder.typicode.com/photos?albumId=";

function Albums({ info }) {
    const [albumPhotos, setAlbumPhotos] = useState([]);

    const row = {
        alignItems: "stretch",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        overflowX: "scroll",
        overflowY: "hidden"
    }

    const imgCss = {
        width: "100%",
        padding: ".75rem",
        marginBottom: "2rem",
        border: "0",
        flexBasis: "33.333%",
        flexGrow: "0",
        flexShrink: "0"
    }

    useEffect(() => {
        console.log(info);
        const getAlbumPhotosList = async () => {
            let { data: albumPhotos } = await axios.get(ALMUMSPHOTOSLIST_BASEURL + info.id);
            setAlbumPhotos(albumPhotos);
        }
        getAlbumPhotosList();

    }, []);

    return (
        <Row>
            <Col lg={12}>
                <Card>
                    <CardHeader>{info.title}<br /><small>{`id: ${info.id} userid: ${info.userId}`}</small></CardHeader>
                    <CardBody>
                        <div style={row}>

                            {albumPhotos && albumPhotos.length > 0 &&
                                albumPhotos.map(item => {
                                    console.log(item);
                                    return <div style={imgCss}>
                                        <LazyLoadImage alt={item.title} src={item.url} width="200px" height="200px" />
                                        <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip', width: '200px'}}>{item.title}</p>
                                        <p>{`id:${item.id}`}</p>
                                    </div>
                                })}
                        </div>

                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Albums
