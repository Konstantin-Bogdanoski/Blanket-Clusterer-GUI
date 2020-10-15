import React from "react";

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */

const GroupNamesForm = (props) => {
    return (
        <div className="text-center h-100 border border-primary" style={{minHeight: "20em", verticalAlign: "middle"}}>
            <div>You could now upload your <code>.csv</code> file with group-names</div>
            <small className="text-info">It is optional</small><br/>
            <input type="file"
                   style={{marginTop: "15%"}}
                   className="text-center text-monospace"
                   placeholder="Upload your group-names file"
                   onChange={props.onGroupChangeHandler}
                   required/>
        </div>
    )
}

export default GroupNamesForm;