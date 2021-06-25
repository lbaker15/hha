import React from 'react';
import Gender from './gender';
import ListOfLanguages from './listOfLanguages';
import Treatment from './treatment';

class EditInputSection extends React.Component {
    state = {
        name: '',
        gendersOpen: false
    }
    componentDidMount() {
        const {edit, editItem} = this.props;
        this.setState({
            name: editItem.name,
            discipline: editItem.discipline, 
            gender: editItem.gender, 
            genders: editItem.genders, 
            services: editItem.services, 
            languages: editItem.languages, 
            address: editItem.businessAddress
        })
    }
    handleChange = (e) => {
        let id;
        if (e.target.id === 'gender2') {
            id = 'gender'
        } else if (e.target.id === 'address2') {
            id = 'address'
        } else {
            id = e.target.id;
        }
        this.setState({
            [id]: e.target.value
        })
    }
    handleSubmit = () => {
        let obj = {
            ...this.state,
            id: this.props.editItem._id
        };
        console.log(obj)
    }
    openList = (e) => {
        this.setState((prev) => ({
            [e.target.id]: !prev[e.target.id]
        }))
    }
    render() {
        const {edit, editItem} = this.props;
        console.log(this.state)
        const {gendersOpen, servicesOpen, languagesOpen, name, discipline, gender, genders, services, languages, address} = this.state;
        return (
            <div className="editSection">
                <div className="topRow">
                    EDIT
                </div>
                <div className="row">
                    <label>Name</label>
                    <input
                    id="name"
                    onChange={this.handleChange}
                    value={name}
                    ></input>
                </div>
                <div className="row">
                    <label>Discipline</label>
                    <input
                    id="discipline"
                    onChange={this.handleChange}
                    value={discipline}
                    ></input>
                </div>
                <div className="row">
                    <label>Gender</label>
                    <input
                    id="gender2"
                    onChange={this.handleChange}
                    value={gender}
                    ></input>
                </div>
                <div className="row">
                    <label>Business Address</label>
                    <textarea
                    id="address2"
                    onChange={this.handleChange}
                    value={address}
                    ></textarea>
                </div>
                <div id="s_1_s" className="row">
                    <label>Gender(s)</label>
                    {/* <input
                    id="genders"
                    onChange={this.handleChange}
                    value={genders}
                    ></input> */}
                    <button
                    id="gendersOpen"
                    onClick={this.openList}
                    >
                        Select <div>+</div>
                    </button>
                    
                </div>
                {gendersOpen && (
                    <div className="myrow">
                        <div className="openFlex">
                            <Gender noGenderWidth={true} />
                        </div>
                    </div>
                )}
                <div id="s_1_s" className="row">
                    <label>Language(s)</label>
                    {/* <input
                    id="languages"
                    onChange={this.handleChange}
                    value={languages}
                    ></input> */}
                    <button
                    id="languagesOpen"
                    onClick={this.openList}
                    >
                        Select <div>+</div>
                    </button>
                </div>
                {languagesOpen && (
                    <div className="myrow">
                        <div className="openFlex">
                            <ListOfLanguages noGenderWidth={true} />
                        </div>
                    </div>
                )}
                <div id="s_1_s" className="row">
                    <label>Service(s)</label>
                    {/* <input
                    id="services"
                    onChange={this.handleChange}
                    value={services}
                    ></input> */}
                    <button
                    id="servicesOpen"
                    onClick={this.openList}
                    >
                        Select <div>+</div>
                    </button>
                </div>
                {servicesOpen && (
                    <div className="myrow">
                        <div className="openFlex">
                            <Treatment noHeader={true} />
                        </div>
                    </div>
                )}
                <div className="row">
                    <button
                    className="submit"
                    onClick={this.handleSubmit}
                    >Submit</button>
                </div>
            </div>
        )
    }
}

export default EditInputSection;