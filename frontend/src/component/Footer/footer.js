import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

class Footer extends Component {
    render() {
        return (
            <div style={{height: "5em"}} className="border-top border-info">
                <br/>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <div className="text-left">
                                <a href={"https://finki.ukim.mk/"} className="text-decoration-none text-dark">Faculty of
                                    Computer Science and Engineering</a>
                            </div>
                        </Col>
                        <Col>

                        </Col>
                        <Col>
                            <div className="text-right">
                                <a href={"https://www.openstreetmap.org/way/35829344"}
                                   className="text-decoration-none text-dark">Skopje, North Macedonia</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;