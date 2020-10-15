import React, {Component} from 'react';
import {Route, Router} from 'react-router-dom'
import '../../App.css';
import Header from "../Header/header";
import Home from "../Home/home";
import {createBrowserHistory} from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClusterData from "../ClusterData/clusterData";
import Visualization from "../Visualization/visualization";
import AboutUs from "../AboutUs/aboutUs";
import Footer from "../Footer/footer";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "modelType": null,
            "numClusters": null,
            "numItems": null,
            "maximumDepth": null,
        }
    }

    setupState() {
        this.setState({
            "modelType": null,
            "numClusters": null,
            "numItems": null,
            "maximumDepth": null,
        })
    }

    componentDidMount() {
        this.setupState()
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header/>
                        <main id="main" role="main" className="content container h-100" style={{minHeight: "40em"}}>
                            <Route path="/" exact render={() => <Home state={this.state}/>}/>
                            <Route path="/add-data" exact render={() => <ClusterData state={this.state}/>}/>
                            <Route path="/results" exact render={() => <Visualization state={this.state}/>}/>
                            <Route path="/about-us" exact render={() => <AboutUs/>}/>
                        </main>
                        <br/>
                        <Footer/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
