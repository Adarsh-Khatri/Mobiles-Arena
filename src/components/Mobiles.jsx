import React, { Component } from 'react';
import { get } from './HttpService';
import queryString from 'query-string'
import { Link } from 'react-router-dom';
import LeftPanelOptionsCB from './LeftPanelOptionCB';

export default class Mobiles extends Component {

    state = {
        mobilesData: [],
        brandsArr: ['Samsung', 'Xiaomi', 'Realme', 'Apple'],
        ramArr: ['3GB', '4GB', '6GB', '8GB'],
        romArr: ['32GB', '64GB', '128GB', '256GB'],
        osArr: ['Android', 'ios'],
        optionscb: {
            brand: '',
            ram: '',
            rom: ''
        },
    }

    async fetchData() {
        let { brand, ram, rom, os } = this.props.match.params;
        let queryParams = this.props.location.search;
        let res;
        if (brand) {
            res = await get(`/api/mobiles/brand/${brand}`)
            this.setState({
                optionscb: { brand: '', ram: '', rom: '' }
            });
        } else if (ram) {
            res = await get(`/api/mobiles/ram/${ram}`)
            this.setState({
                optionscb: { brand: '', ram: '', rom: '' }
            });
        } else if (rom) {
            res = await get(`/api/mobiles/rom/${rom}`)
            this.setState({
                optionscb: { brand: '', ram: '', rom: '' }
            });
        } else if (os) {
            res = await get(`/api/mobiles/os/${os}`)
            this.setState({
                optionscb: { brand: '', ram: '', rom: '' }
            });
        } else if (queryParams) {
            res = await get(`/api/mobiles${queryParams}`)
        } else {
            res = await get(`/api/mobiles`)
            this.setState({
                optionscb: { brand: '', ram: '', rom: '' }
            });
        }
        this.setState({
            mobilesData: res.data
        });
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log('COMPONENT UPDATING');
            this.fetchData()
        }
    }

    sortColFor = (field) => {
        let s1 = this.state;
        if (field == 'price') {
            s1.mobilesData.sort((a, b) => a[field] - b[field])
        } else if (field == 'ram' || field == 'rom') {
            s1.mobilesData.sort((a, b) => {
                let indexA = a[field].indexOf('GB');
                let indexB = b[field].indexOf('GB');
                return a[field].substring(0, indexA) - b[field].substring(0, indexB);
            })
        } else {
            s1.mobilesData.sort((a, b) => a[field].localeCompare(b[field]))
        }
        this.setState(s1)
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({ pathname: url, search: searchStr })
    }

    makeSearchString = (options) => {
        let { brand, ram, rom } = options;
        let searchStr = '';
        searchStr = this.addToQueryString(searchStr, 'brand', brand);
        searchStr = this.addToQueryString(searchStr, 'ram', ram);
        searchStr = this.addToQueryString(searchStr, 'rom', rom);
        console.log(searchStr);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => {
        return ((paramValue ? str ? `${str}&${paramName}=${paramValue}` :
            `${paramName}=${paramValue}` : str))
    }

    handleOptionChange = (options) => {
        console.log(options);
        this.setState({ optionscb: options })
        this.callURL(`/mobiles`, options)
    }

    render() {
        let { mobilesData = [], brandsArr, ramArr, romArr, optionscb } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 my-5">
                        <LeftPanelOptionsCB options={optionscb} brandsArr={brandsArr} ramArr={ramArr} romArr={romArr} onOptionChange={this.handleOptionChange} />
                    </div>
                    <div className="col-sm-9 text-center">
                        <h1 className='fw-bold'>ALL MOBILES</h1>
                        <div className="row bg-dark text-light">
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('name')}>Name</div>
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('price')}>Price</div>
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('brand')}>Brand</div>
                            <div className="col-sm-1 border" onClick={() => this.sortColFor('ram')}>RAM</div>
                            <div className="col-sm-1 border" onClick={() => this.sortColFor('rom')}>ROM</div>
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('os')}>OS</div>
                            <div className="col-sm-1 border"></div>
                            <div className="col-sm-1 border"></div>
                        </div>
                        {
                            mobilesData.length === 0 ? <h1 className='fw-bold text-danger my-5'>NO DATA</h1> : (
                                mobilesData.map((mobile, index) =>
                                    <div className="row" key={mobile.name + index}>
                                        <div className="col-sm-2 border">{mobile.name}</div>
                                        <div className="col-sm-2 border">{mobile.price}</div>
                                        <div className="col-sm-2 border">{mobile.brand}</div>
                                        <div className="col-sm-1 border">{mobile.ram}</div>
                                        <div className="col-sm-1 border">{mobile.rom}</div>
                                        <div className="col-sm-2 border">{mobile.os}</div>
                                        <div className="col-sm-1 border"><Link className="btn btn-warning btn-sm" to={`/mobiles/${mobile.name}/edit`}>Edit</Link></div>
                                        <div className="col-sm-1 border"><Link className="btn btn-danger btn-sm me-4" to={`/mobiles/${mobile.name}/delete`}>Delete</Link></div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
