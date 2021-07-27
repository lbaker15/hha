import React from "react";

class ListHeader extends React.Component {
    render() {
        const {className, value} = this.props;
        return (
            <div className="listHeader">
                <div className={className}>{value}</div>
            </div>
        )
    }
}

export default ListHeader;