import React from "react";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

const EmbeddingsForm = (props) => {
    return (
        <div className="text-center h-100 border border-primary" style={{minHeight: "20em", verticalAlign: "middle"}}>
            <div className="text-monospace">Upload your <strong>embeddings</strong></div>
            <input type="file"
                   style={{marginTop: "15%"}}
                   className="text-center text-monospace"
                   placeholder="Upload your file with embeddings"
                   onChange={props.onModelChangeHandler}
                   required/>
        </div>
    )
}

export default EmbeddingsForm;