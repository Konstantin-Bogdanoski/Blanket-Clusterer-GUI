import React from "react";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

const ParametersForm = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                        <span className="input-group-text border-primary" id="basic-addon1">
                                            Absolute path to blanket clusterer</span>
                    </div>
                    <input type="text" name="blanketClustererPath"
                           className="form-control border-info"
                           placeholder="Absolute path to blanket clusterer (main.py in the module)"
                           aria-label="BlanketClusterer path"
                           aria-describedby="basic-addon1" required onChange={props.handleInputChange}
                           value={props.data.blanketClustererPath != null ? props.data.blanketClustererPath : ""}/>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                        <span className="input-group-text border-primary" id="basic-addon1">
                                            Absolute path to output file</span>
                    </div>
                    <input type="text" name="outputPath"
                           className="form-control border-info"
                           placeholder="Absolute path to output file" aria-label="Output path"
                           aria-describedby="basic-addon1" required onChange={props.handleInputChange}
                           value={props.data.outputPath != null ? props.data.outputPath : ""}/>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                        <span className="input-group-text border-primary"
                                              id="basic-addon1">Clustering type</span>
                    </div>
                    <select className="form-control border-info"
                            name="modelType"
                            required
                            onChange={props.handleInputChange}
                    >
                        <option value="">
                            Please select an algorithm
                        </option>
                        <option value="k-means">
                            K-Means
                        </option>
                        <option value="agglomerative">
                            Agglomerative
                        </option>
                        <option value="dbscan">
                            DBSCAN
                        </option>
                        <option value="birch">
                            BIRCH
                        </option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                            <span className="input-group-text border-primary"
                                                  id="basic-addon1">Number of clusters</span>
                    </div>
                    <input type="number" name="numClusters" min={0}
                           className="form-control border-info"
                           placeholder="How many clusters?"
                           aria-label="Number of clusters"
                           aria-describedby="basic-addon1" required onChange={props.handleInputChange}
                           value={props.data.numClusters != null ? props.data.numClusters : ""}/>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                        <span className="input-group-text border-primary"
                                              id="basic-addon1">Number of items in clusters</span>
                    </div>
                    <input type="number" name="numItems" min={0}
                           className="form-control border-info"
                           placeholder="How many kids should the clusters tend to have?"
                           aria-label="Number of items in clusters"
                           aria-describedby="basic-addon1" required onChange={props.handleInputChange}
                           value={props.data.numItems != null ? props.data.numItems : ""}/>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                        <span className="input-group-text border-primary" id="basic-addon1">
                                            Maximum depth</span>
                    </div>
                    <input type="number" name="maximumDepth" min={1} max={6}
                           className="form-control border-info"
                           placeholder="How deep do you want to go?" aria-label="Maximum depth"
                           aria-describedby="basic-addon1" required onChange={props.handleInputChange}
                           value={props.data.maximumDepth != null ? props.data.maximumDepth : ""}/>
                </div>
            </div>
        </div>
    )
}

export default ParametersForm;