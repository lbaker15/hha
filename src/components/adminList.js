import React from 'react';
import './hcList.css';
import ListItem from './listItem';
import EditInputSection from './editInputSection';
import Add from './add';
import AdminIcon from './assets/Admin_Icon_White.png';
import Loader from './loader';
import {Link} from 'react-router-dom';
import Header from './header';
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
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        if (cookie && adminCookie) {
                if (cookieName) {
                    this.setState({
                        adminName: cookieName[2]
                    })
                }
                this.refreshData()
        }
    }
    refreshData = () => {
        let cookieId = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        if (cookie) {
            fetch('https://hannahs-heart-2.herokuapp.com/provider/provider-list', {
                method: 'POST',
                headers: {
                    'authorization': cookie[0].split('=')[1],
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: cookieId[2]})
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
        const {validated, adminName, letter, filteredRes, filter, add, data, edit, editItem} = this.state;
        if (!validated) {
            return (
                <React.Fragment>
                    <div>
                        <Loader />
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Header title={'Update HC Providers'} />
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
                        <EditInputSection 
                        handleEdit={this.handleEditClose} 
                        handleAdd={this.handleAdd}
                        refreshData={this.refreshData} edit={edit} 
                        editItem={editItem} />
                    )
                    }
                    {add && (
                        <EditInputSection 
                        handleEdit={this.handleEditClose} 
                        handleAdd={this.handleAdd}
                        refreshData={this.refreshData} />
                    )}
                    <div className="list">
                        {!filter && data && (
                            data.map(x => {
                                return <ListItem key={String(data.id) + Math.random()} edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            }))
                        }
                        {filter && (
                            filteredRes.map(x => {
                                return <ListItem key={String(data.id) + Math.random()} edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            }))
                        }
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default AdminList;