import React from 'react';
import Delete from './delete';
import Edit from './edit';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.refe = React.createRef();
    }
    getElem = () => {
        return this.refe;
    }
    render() {
        const {data, handleEdit, employee} = this.props;
        console.log(data._id)
        return (
            <React.Fragment key={data._id} >
                <div ref={this.refe} key={data._id} id={data._id} className="item">
                    <div>
                        <Edit handleEdit={handleEdit} id={data._id} />
                    </div>
                    <div style={employee ? {width: '60%'} : null}>
                        {!employee && (
                            <React.Fragment>
                            <h1>
                                {(data.discipline === 'psychiatrist') ? 'Dr ' : null} 
                                <span>{String(data.lastname)[0].toUpperCase() + String(data.lastname).slice(1) + " "}</span>
                                {String(data.firstname)[0].toUpperCase() + String(data.firstname).slice(1)}
                            </h1>
                            <h2>{data.discipline[0].toUpperCase() + data.discipline.slice(1)}</h2>
                            </React.Fragment>
                        )}
                        {employee && (
                            <h1 
                            style={{marginTop: 45}}
                            className="employeeName"><span> {String(data.lastname)[0].toUpperCase() + String(data.lastname).slice(1)} </span> 
                            {String(data.firstname)[0].toUpperCase() + String(data.firstname).slice(1)} 
                            </h1>
                        )}
                    </div>
                    <div style={employee ? {width: '20%'} : null}>
                        {!employee && (
                            <h3 style={{color: 'white'}}>{(data.gender) === 'female' ? 'F' : 'M' }</h3>
                        )}
                        {employee && (
                            <h3 style={{color: 'white', fontSize: 22, marginTop: 13, fontWeight: 400, opacity: 0.8}}>{data.discipline}</h3>
                        )}
                    </div>
                    <div>
                        <Delete refe={this.getElem} refreshData={this.props.refreshData} data={data} id={data._id} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ListItem;