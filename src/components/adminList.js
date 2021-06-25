import React from 'react';
import './hcList.css';
import ListItem from './listItem';
import EditInputSection from './editInputSection';

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
class AdminList extends React.Component {
    state = {
        validated: false,
        data: [],
        edit: false,
        editItem: []
    }
    handleEdit = (e) => {
        let id = e.target.id;
        let {data} = this.state;
        let newA = data.filter(x => x._id === id)
        this.setState((prev) => ({
            edit: !prev.edit,
            editItem: newA[0]
        }))
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        if (cookie) {
            fetch('https://hannahs-heart-2.herokuapp.com/login/provider-list', {
                method: 'POST',
                headers: {
                    'authorization': cookie[0].split('=')[1]
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    validated: true,
                    data: data.Data
                })
            })
        }
    }
    refreshData = () => {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        if (cookie) {
            fetch('https://hannahs-heart-2.herokuapp.com/login/provider-list', {
                method: 'POST',
                headers: {
                    'authorization': cookie[0].split('=')[1]
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.Data
                })
            })
        }
    }
    render() {
        const {validated, data, edit, editItem} = this.state;
        if (!validated) {
            return (
                <React.Fragment>
                    <div>LOADER</div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="topSection">
                        <div className="padding">
                            <button>
                                Add Provider 
                                <div>+</div>
                            </button>
                            <input
                            placeholder="Search by name"
                            ></input>
                        </div>
                    </div>
                    <div className="alphabet">
                        {alphabet.map(letter => {
                            return (
                                <button key={letter}>{letter.toUpperCase()}</button>
                            )
                        })
                        }
                    </div>
                    <div className="listHeader">
                        <div className="gen">Gender</div>
                    </div>
                    {edit && editItem && (
                        <EditInputSection edit={edit} editItem={editItem} />
                    )
                    }
                    <div className="list">
                        {data.map(x => {
                            return <ListItem edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                        })
                        }
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default AdminList;