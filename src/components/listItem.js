import React from 'react';
import Delete from './delete';
import Edit from './edit';

class ListItem extends React.Component {
    render() {
        const {data, handleEdit} = this.props;
        return (
            <React.Fragment key={data._id} >
                <div key={data._id} id={data._id} className="item">
                    <div>
                        <Edit handleEdit={handleEdit} id={data._id} />
                    </div>
                    <div>
                        <h1>
                            {(data.discipline === 'psychiatrist') ? 'Dr ' : null} 
                            {data.name[0].toUpperCase() + data.name.slice(1)}
                        </h1>
                        <h2>{data.discipline[0].toUpperCase() + data.discipline.slice(1)}</h2>
                    </div>
                    <div>
                        <h3>{(data.gender) === 'female' ? 'F' : 'M' }</h3>
                    </div>
                    <div>
                        <Delete refreshData={this.props.refreshData} data={data} id={data._id} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ListItem;