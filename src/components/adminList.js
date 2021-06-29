import React from 'react';
import './hcList.css';
import ListItem from './listItem';
import EditInputSection from './editInputSection';
import Add from './add';
import AdminIcon from './assets/Admin_Icon_White.png';


let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
class AdminList extends React.Component {
    state = {
        validated: false,
        data: [],
        edit: false,
        editItem: [],
        add: false,
        filter: false,
        filteredRes: []
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
    handleEditClose = (e) => {
        this.setState((prev) => ({
            edit: !prev.edit,
        }))
    }
    handleAdd = () => {
        this.setState((prev) => ({
            add: !prev.add
        }))
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                adminName: this.props.location.state.prop
            })
        }
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        if (cookie && adminCookie) {
            if (adminCookie[2] === 'true') {
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
    filterResults = (e) => {
        let {data, filter, letter} = this.state;
        if (!filter) {
            this.setState({
                filter: true
            })
        }
        this.setState({
            letter: e.target.value
        })
        if (e.target.value !== letter) {
            this.setState({
                filteredRes: []
            })
            data.map(x => {
                if (x.name[0] === e.target.value) {
                    console.log(x.name)
                    this.setState((prev) => ({
                        filteredRes: prev.filteredRes.concat(x)
                    }))
                }
            })
        }
    }
    searchFilter = (name) => {
        let {data, filter, letter, filteredRes} = this.state;
        if (!filter) {
            this.setState({
                filter: true,
            })
        }
        let nameStr = String(name).split("")
        let arr = data;
        if (nameStr.length === 0) {
            this.setState({
                filteredRes: arr,
                letter: ''
            })
        }
        nameStr.forEach((l,i) => {
            arr = arr.filter(x => {
                return l === x.name[i];
            })
            this.setState({
                filteredRes: arr,
                letter: ''
            })
        })
    }
    render() {
        const {validated, adminName, letter, filteredRes, filter, add, data, edit, editItem} = this.state;
        if (!validated) {
            return (
                <React.Fragment>
                    <div>
                        LOADER
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="navbar">
                        <div className="left">
                            <h2>Update HC Providers</h2>
                        </div>
                        <div className="right">
                            <img src={AdminIcon} />
                            <h3>{adminName}</h3>
                        </div>
                    </div>
                    <div className="topSection">
                        <div className="padding">
                            <Add searchFilter={this.searchFilter} handleAdd={this.handleAdd} />
                        </div>
                    </div>
                    <div className="alphabet">
                        <div className="aInner">
                            {alphabet.map(l => {
                                return (
                                    <button 
                                    style={letter === l ? {color: '#727273'} : null}
                                    value={l}
                                    onClick={this.filterResults}
                                    key={l}>{l.toUpperCase()}</button>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className="listHeader">
                        <div className="gen">Gender</div>
                    </div>
                    {edit && editItem && (
                        <EditInputSection handleEdit={this.handleEditClose} handleAdd={this.handleAdd}
                         refreshData={this.refreshData} edit={edit} editItem={editItem} />
                    )
                    }
                    {add && (
                        <EditInputSection 
                        handleEdit={this.handleEditClose} handleAdd={this.handleAdd}
                        refreshData={this.refreshData} />
                    )}
                    <div className="list">
                        {!filter && (
                            data.map(x => {
                                return <ListItem edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            })
                        )
                        }
                        {filter && (
                            filteredRes.map(x => {
                                return <ListItem edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            })
                        )
                        }
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default AdminList;