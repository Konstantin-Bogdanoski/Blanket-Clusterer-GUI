import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

class Visualization extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col/>
                    <Col xs={10}>
                        <p className="text-sm-center text-info">
                            <small className="text-sm-center text-info">
                                Tip: You can head out to <code>Clusterize</code> to change your parameters!
                            </small>
                        </p>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col>
                        <div className="container-fluid">
                            <iframe
                                src={"http://localhost:5000/rest/output"}
                                style={{minHeight: "40em", minWidth: "100%"}}
                                className="h-100 w-100"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Visualization;