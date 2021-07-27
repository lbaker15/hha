import React from 'react';
import './hcList.css';
import ListItem from './listItem';
import EditInputSectionEmployee from './editInputSectionEmployee';
import Add from './add';
import {Link} from 'react-router-dom';
import AdminIcon from './assets/Admin_Icon_White.png';
import Loader from './loader';
import Header from './header';
import {getEmployees} from './functions/listItem';
import Alphabet from './alphabet';
import ListHeader from './listHeader';




class EmployeeList extends React.Component {
    state = {
        validated: false,
        data: [],
        editItemTwo: [],
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
            getEmployees(cookie, cookieId)
            .then(data => {
                console.log(data)
                this.setState({
                    validated: true,
                    data: data.Data,
                    editItemTwo: data.Login
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
    closeFilter = () => {
        this.setState({
            filter: false,
            filteredRes: []
        })
    }
    render() {
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        const {validated, adminName, letter, filteredRes, filter, add, data, edit, editItem, editItemTwo} = this.state;
        if (!validated) {
            return (
                <React.Fragment>
                    <Loader />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Header title={'Update Employees'} />
                    <div className="topSection">
                        <div className="padding">
                            <Add employee={true} searchFilter={this.searchFilter} handleAdd={this.handleAdd} />
                        </div>
                    </div>

                    <Alphabet closeFilter={this.closeFilter} letter={letter} filterResults={this.filterResults} />
                    <ListHeader />
                    {edit && editItem && (
                        <EditInputSectionEmployee 
                        employee={true}
                        handleEdit={this.handleEditClose} 
                        handleAdd={this.handleAdd}
                        refreshData={this.refreshData} 
                        edit={edit} 
                        editItemTwo={editItemTwo}
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
                        )}
                        {filter && (
                            filteredRes.map(x => {
                                return <ListItem key={String(data.id) + Math.random()} employee={true} edit={edit} handleEdit={this.handleEdit} refreshData={this.refreshData} data={x} />
                            })
                        )}
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default EmployeeList;