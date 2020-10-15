import React from "react";
import axios from "../../axios/axios"

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

const MainService = {
    uploadModel: (model) => {
        let form = new FormData();
        form.append("file", model);
        return axios.post("/rest/embeddings", form)
    },

    uploadNames: (names) => {
        let form = new FormData();
        form.append("file", names);
        return axios.post("/rest/names", form)
    },

    uploadGroupNames: (groupNames) => {
        let form = new FormData();
        form.append("file", groupNames);
        return axios.post("/rest/group_names", form)
    },

    clusterize: (data) => {
        let form = new FormData;
        form.append("modelType", data.modelType)
        form.append("numClusters", data.numClusters)
        form.append("numItems", data.numItems)
        form.append("maximumDepth", data.maximumDepth)
        return axios.post("/rest/clusterize", form)
    }
}

export default MainService;