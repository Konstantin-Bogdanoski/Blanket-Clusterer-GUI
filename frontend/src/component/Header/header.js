import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

class Header extends Component {
    render() {
        return (
            <div className="header align-middle" style={{height: "2.3em"}}>
                <Container fluid={true}>
                    <Row>
                        <Col xs={6}>
                            <div className="text-left align-middle">
                                <span className="font-weight-bold" style={{fontSize: "1.5em"}}>
                                    <Link to={"/"} className="text-decoration-none text-white">Blanket Clusterer</Link>
                                </span>
                            </div>
                        </Col>
                        <Col>
                            <div className="text-right h-100">
                                <div style={{height: "0.3em"}}>&nbsp;</div>
                                <span style={{verticalAlign: "middle"}}>
                                    <a href={"https://konstantin-bogdanoski.github.io/Blanket-Clusterer-Docs/#/"}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="btn btn-outline-primary btn-default text-white-50"
                                       style={{verticalAlign: "middle", display: "inline"}}>
                                        Docs
                                    </a>
                                </span>
                                &nbsp;
                                <span style={{verticalAlign: "middle"}}>
                                    <Link to={"/add-data"} className="btn btn-outline-primary btn-default text-white-50"
                                          style={{verticalAlign: "middle", display: "inline"}}>
                                        Clusterize
                                    </Link>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Header;