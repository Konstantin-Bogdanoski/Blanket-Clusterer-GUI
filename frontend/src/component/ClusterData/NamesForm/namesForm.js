import React from "react";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

const NamesForm = (props) => {
    return (
        <div className="text-center h-100 border border-primary" style={{minHeight: "20em", verticalAlign: "middle"}}>
            <div>Now upload your <code>.csv</code> file with names</div>
            <input type="file"
                   style={{marginTop: "15%"}}
                   className="text-center text-monospace"
                   placeholder="Upload your names file"
                   onChange={props.onNamesChangeHandler}
                   required/>
        </div>
    )
}

export default NamesForm;