import React, {Component} from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainService from "../../service/MainService/mainService";
import EmbeddingsForm from "./EmbeddingForm/embeddingsForm";
import NamesForm from "./NamesForm/namesForm";
import GroupNamesForm from "./GroupNamesForm/groupNamesForm";
import ParametersForm from "./ParametersForm/parametersForm";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

class ClusterData extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        this.setState({
            "waitResponse": false,
            "errorMsg": null,
            "model": null,
            "names": null,
            "groupNames": null,
            "successful": null
        });
    }

    handleInputChange = (e) => {
        debugger;
        e.preventDefault();
        let key = e.target.name;
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({
            "waitResponse": true
        })

        let data = {
            "modelType": this.state.modelType,
            "numClusters": this.state.numClusters,
            "numItems": this.state.numItems,
            "maximumDepth": this.state.maximumDepth,
            "blanketClustererPath": this.state.blanketClustererPath,
            "outputPath": this.state.outputPath
        }

        let model = this.state.model;
        let names = this.state.names;
        let groupNames = this.state.groupNames;

        let sessionModel = sessionStorage.getItem("model");
        let sessionNames = sessionStorage.getItem("names");
        let sessionGroupNames = sessionStorage.getItem("groupNames");

        if (sessionModel === null && sessionNames === null && sessionGroupNames === null) {
            MainService.uploadModel(model).then(resp => {
                sessionStorage.setItem("model", model.name);
                MainService.uploadNames(names).then(resp => {
                    sessionStorage.setItem("names", names.name);
                    if (groupNames !== null && groupNames !== undefined && groupNames !== "undefined") {
                        MainService.uploadGroupNames(groupNames).then(resp => {
                            sessionStorage.setItem("groupNames", groupNames.name);
                            MainService.clusterize(data).then(resp => {
                                this.setState({
                                    "waitResponse": false,
                                    "successful": true,
                                });
                            }).catch(error => {
                                this.setError(error)
                            })
                        })
                    } else {
                        sessionStorage.setItem("groupNames", "undefined");
                        MainService.clusterize(data).then(resp => {
                            this.setState({
                                "waitResponse": false,
                                "successful": true,
                            });
                        }).catch(error => {
                            this.setError(error)
                        })
                    }
                }).catch(error => {
                    this.setError(error)
                })
            }).catch(error => {
                this.setError(error)
            })
        } else {
            MainService.clusterize(data).then(resp => {
                this.setState({
                    "waitResponse": false,
                    "successful": true,
                });
            }).catch(error => {
                this.setError(error)
            })
        }
    }

    setError = (error) => {
        console.error(error)
        this.setState({
            "waitResponse": false,
            "errorMsg": error
        })
    }

    onModelChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            "model": e.target.files[0]
        });
    };

    onNamesChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            "names": e.target.files[0]
        });
    }

    onGroupNamesChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            "groupNames": e.target.files[0]
        });
    }

    skipGroupNames = (e) => {
        e.preventDefault();
        this.setState({
            "groupNames": "undefined"
        })
    }

    dataReady = () => {
        if ((this.state.model == null && sessionStorage.getItem("model") === null) ||
            (this.state.names == null && sessionStorage.getItem("names") === null))
            return false;
        for (let entry in this.state.data) {
            if (this.state.data.entry == null)
                return false;
        }
        return true;
    }

    getData = () => {
        return {
            "modelType": this.state.modelType,
            "numClusters": this.state.numClusters,
            "numItems": this.state.numItems,
            "maximumDepth": this.state.maximumDepth,
            "blanketClustererPath": this.state.blanketClustererPath,
            "outputPath": this.state.outputPath
        }
    }

    clearStorage = (e) => {
        e.preventDefault();
        sessionStorage.clear()
        window.location.reload(false);
    }

    render() {
        return (
            <div className="h-100">
                <Container>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <h1>Define parameters</h1>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    {sessionStorage.getItem("model") !== null &&
                    sessionStorage.getItem("names") !== null ?
                        <div className="text-sm-center">
                            <div className="text-secondary">
                                You already have an uploaded model and a names file
                            </div>
                            <div className="text-info">
                                If you'd like to upload new ones, click&nbsp;
                                <span className="btn btn-sm btn-outline-secondary"
                                      onClick={this.clearStorage}>Here</span> and
                                refresh the page!
                            </div>
                        </div> : <span/>}
                    <br/>
                    {!this.state.waitResponse && this.state.successful == null ?
                        <Row>
                            <Col>

                            </Col>
                            <Col xs={8}>
                                <form onSubmit={this.onFormSubmit}>
                                    {this.state.model == null && sessionStorage.getItem("model") === null ? <div>
                                        <EmbeddingsForm onModelChangeHandler={this.onModelChangeHandler}/>
                                    </div> : this.state.names == null && sessionStorage.getItem("names") === null ?
                                        <div>
                                            <NamesForm onNamesChangeHandler={this.onNamesChangeHandler}/>
                                        </div> : this.state.groupNames == null && sessionStorage.getItem("groupNames") === null ?
                                            <div>
                                                <GroupNamesForm onGroupChangeHandler={this.onGroupNamesChangeHandler}/>
                                            </div> : <div>
                                                <ParametersForm handleInputChange={this.handleInputChange}
                                                                data={this.getData()}/>
                                            </div>}
                                    <hr/>
                                    <div className="input-group-btn text-center">
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <div className="text-left">
                                                        <Link className="btn btn-outline-warning" to={"/"}
                                                              type="button">Cancel</Link>
                                                    </div>
                                                </Col>
                                                <Col>

                                                </Col>
                                                <Col>
                                                    <div className="text-right">
                                                        {this.state.model != null && this.state.names != null && this.state.groupNames == null ?
                                                            <button className="btn btn-outline-info"
                                                                    onClick={this.skipGroupNames} type="button">Skip
                                                            </button> : <span/>}
                                                        &nbsp;
                                                        <button className="btn btn-outline-success" type="submit"
                                                                disabled={!this.dataReady()}>Submit
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </form>
                            </Col>
                            <Col>

                            </Col>
                        </Row> : this.state.successful == null && this.state.waitResponse ? <Row>
                            <Col>
                                <div className="text-center">
                                    <div>
                                        <img src="/loading.gif" style={{width: "10%"}} alt="tiny pacman"/>
                                    </div>
                                    <div>
                                        Please be amazed by this animation while we upload and cluster the
                                        data...<br/>
                                        <small className="text-secondary">This may take awhile depending on the size of
                                            the files</small><br/>
                                    </div>
                                </div>
                            </Col>
                        </Row> : this.state.successful === true ?
                            <Row>
                                <Col/>
                                <Col>
                                    <div>
                                        <h4>Good job!</h4>
                                        You appear to be all set!<br/>
                                        1. Your data appears to be in the correct format<br/>
                                        2. You successfully uploaded the files<br/>
                                        3. The clustering is successfully completed<br/>
                                        4. ??? <br/>
                                        5. Profit<br/>
                                        6. Now it's time to look at the results<br/>
                                        <Link to={"/results"} className="btn btn-success">Let's see them</Link>
                                    </div>
                                </Col>
                                <Col/>
                            </Row> : <Row>
                                <Col>Oh oh, it appears we ran into a problem <br/>
                                    Could you please reload the page and try again?
                                </Col>
                            </Row>}
                </Container>
            </div>
        );
    }
}

export default ClusterData;