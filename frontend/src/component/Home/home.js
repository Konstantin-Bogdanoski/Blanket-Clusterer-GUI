import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = props.state
    }

    render() {
        return (
            <div className="container-fluid">
                <Container>
                    <Row>
                        <Col>&nbsp;</Col>
                    </Row>
                    <Row>
                        <Col>
                            <a name={"what-is-bk"}>
                                <h3>
                                    What is Blanket Clusterer?
                                </h3>
                            </a>
                            <div style={{background: "transparent !important"}} className="jumbotron-fluid">
                                <strong>
                                    BlanketClusterer</strong> is a project dedicated to ease the process of clustering
                                data-sets
                                through
                                implementation of different clustering algorithms in the background, allowing you as
                                well as other
                                data scientists to not implement it themselves, rather quickly look at the results their
                                model provided them. The output this generates is a <code>JSON</code> file, compatible
                                with&nbsp;
                                <a href={"https://carrotsearch.com"} target="_blank">CarrotSearch</a>'s <a
                                href={"https://carrotsearch.com/foamtree/"} target="_blank">FoamTree</a> interactive
                                tree visualization tool.
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <a name={"how-it-works"}>
                                <h3>
                                    How does it work?
                                </h3>
                            </a>
                            <div>
                                This module implements a couple of clustering algorithms, namely <a target="_blank"
                                                                                                    href={"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.AgglomerativeClustering.html#sklearn-cluster-agglomerativeclustering"}>
                                Agglomerative
                            </a>
                                ,&nbsp;
                                <a target="_blank"
                                   href={"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html#sklearn-cluster-dbscan"}>
                                    DBSCAN
                                </a> and <a
                                href={"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.Birch.html#sklearn-cluster-birch"}
                                target="_blank">
                                Birch
                            </a>
                                &nbsp;algorithms from <a target="_blank"
                                                         href={"https://scikit-learn.org/"}>scikit-learn</a> and&nbsp;
                                <a target="_blank" href={"https://www.nltk.org/_modules/nltk/cluster/kmeans.html"}>
                                    KMeans
                                </a>
                                &nbsp;algorithm from <a target="_blank" href={"https://www.nltk.org/"}>NLTK</a>.
                                For this module to work, you need to have completed a couple of requirements as we
                                will see in the following text.
                            </div>
                            <div>
                                The clustering calculates the difference mainly using the <strong>Cosine
                                distance</strong> similarity calculation equation,
                                but if you need to, you can change the scripts to use other parameters if you'd want to.
                                Cosine
                                distance was chosen due to previous research where it was proven that it was better
                                contrary to&nbsp;
                                <i>Eucledian distance</i>.
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <div>
                                <a name="first_requirement"><strong>First</strong></a>, you need to have an
                                operational Word2Vec model containing
                                the embeddings from your dataset.
                                For now, we're only supporting Word2Vec, but be patient, we're working as hard as we
                                can to implement more models.
                            </div>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <h1>Word2Vec</h1>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <a name="second_requirement"><strong>Second</strong></a>, you need to have
                            a <code>.csv</code> file, containing
                            your <code>Key-Value</code> pairs regarding
                            the names of the entities. The values of the <code>keys</code> must correspond to the
                            values of the <code>keys</code> in the vectors of the Word2Vec model<br/>
                            Take a look at the example table. <br/>
                            <i className="text-secondary"><strong>Note:</strong> Notice the names of the columns, they
                                must be <code>key</code> and <code>value</code> respectively</i>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <table className="table table-bordered table-primary">
                                    <thead>
                                    <tr>
                                        <th>
                                            key
                                        </th>
                                        <th>
                                            value
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            0001
                                        </td>
                                        <td>
                                            example_name_1
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            0002
                                        </td>
                                        <td>
                                            example_name_2
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div>
                                    Example table for the Names
                                </div>
                            </div>
                            <br/>
                            <div className="text-center">
                                <table className="table table-bordered table-primary">
                                    <thead>
                                    <tr>
                                        <th>
                                            key
                                        </th>
                                        <th>
                                            value
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            0001
                                        </td>
                                        <td>
                                            [0.11, 0.22, ..., 0.99]
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            0002
                                        </td>
                                        <td>
                                            [0.12, 0.13, ..., 0.19]
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div>
                                    Example table for the Word2Vec embeddings
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <a name="third_requirement"><strong>Third</strong></a>, this is <i>optional</i>, but can
                            be used for better visualization,
                            you can have another <code>.csv</code> file
                            containing the range of values for each group name, take a look at the table as an example.
                            <br/>
                            <br/>
                            <i>Be careful!</i> The algorithm works by comparing the values as
                            type <code>String</code>&nbsp;
                            and they values of the range must be separated with a <code>-</code> symbol,
                            otherwise the algorithm will not work. Consult the&nbsp;
                            <a href="#" className="text-decoration-none text-info">Docs</a> for more information.<br/>
                            If you <u>do not</u> have a file with the group-names, don't stress, you can just visualize
                            it
                            without them.
                            They are only used for the name extraction process and the coloring of the clusters. Without
                            them the most common words will form the name of the cluster.<br/>
                            <i className="text-secondary"><strong>Note:</strong> Notice the names of the columns, they
                                must be <code>key</code> and <code>value</code> respectively</i>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <table className="table table-bordered table-primary">
                                    <thead>
                                    <tr>
                                        <th>
                                            key
                                        </th>
                                        <th>
                                            value
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            0001-0020
                                        </td>
                                        <td>
                                            group_name_1
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            0021-1000
                                        </td>
                                        <td>
                                            group_name_2
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div>
                                    Example table for the group-names
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            An important note is that the key values in your Word2Vec model, must be the same as
                            the <code>key</code> values in your
                            <code>.csv</code> names and/or group-names files.
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            And that is it. If you have met those requirements, you should be able to use this package
                            without any issues. For any further information or details visit the <a href={"#"}
                                                                                                    className="btn btn-outline-info">Docs</a> page.
                            You can now head over to <Link to={"/add-data"}
                                                           className="btn btn-outline-primary">Clusterize</Link> to
                            upload your data.<br/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;