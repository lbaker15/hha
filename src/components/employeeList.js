import React from 'react';
import './hcList.css';
import ListItem from './listItem';
import EditInputSectionEmployee from './editInputSectionEmployee';
import Add from './add';
import {Link} from 'react-router-dom';
import AdminIcon from './assets/Admin_Icon_White.png';
let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");


class EmployeeList extends React.Component {
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
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        if (cookie && adminCookie) {
            // if (adminCookie[2] === 'true') {
                if (cookieName) {
                    this.setState({
                        adminName: cookieName[2]
                    })
                }
                this.refreshData()
            // }
        }
    }
    refreshData = () => {
        let cookieId = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        if (cookie) {
            fetch('https://hannahs-heart-2.herokuapp.com/login/employee-list', {
                method: 'POST',
                headers: {
                    'authorization': cookie[0].split('=')[1],
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: cookieId[2]})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    validated: true,
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
                let lastName = String(x.lastname);
                if (lastName[0] === e.target.value) {
                    console.log(this.state.filteredRes)
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
                return String(l).toLowerCase() === x.lastname[i];
            })
            this.setState({
                filteredRes: arr,
                letter: ''
            })
        })
    }
    render() {
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
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
                            <h2>Update Employees</h2>
                        </div>
                        <button 
                        className="right">
                            <Link to="/my-profile">
                            <img src={AdminIcon} />
                            <h3>{adminName}</h3>
                            </Link>
                        </button>
                    </div>
                    <div className="topSection">
                        <div className="padding">
                            <Add employee={true} searchFilter={this.searchFilter} handleAdd={this.handleAdd} />
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
                    </div>
                    {edit && editItem && (
                        <EditInputSectionEmployee 
                        employee={true}
                        handleEdit={this.handleEditClose} 
                        handleAdd={this.handleAdd}
                        refreshData={this.refreshData} 
                        edit={edit} 
                        editItem={editItem} />
                    )
                    }
                    {add && (
                        <EditInputSectionEmployee
                        employee={true}
                        handleEdit={this.handleEditClose} 
                        handleAdd={this.handleAdd}
                        refreshData={this.refreshData} />
                    )}
                    <div className="list">
                        {!filter && data && (
                            data.map(x => {
                                return <ListItem key={String(data.id) + Math.random()} employee={true} edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            })
                        )
                        }
                        {filter && (
                            filteredRes.map(x => {
                                return <ListItem key={String(data.id) + Math.random()} employee={true} edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            })
                        )
                        }
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default EmployeeList;