import React, { Component } from 'react';
import { get, put, post } from './HttpService'

export default class AddMobile extends Component {


    // {name:"iPhone 7",price:28500,brand:"Apple":,ram:"3GB",rom:"32GB",os:"iOS"},


    state = {
        mobile: { name: '', price: '', brand: '', ram: '', rom: '', os: '' },
        brandsArr: ['Samsung', 'Xiaomi', 'Realme', 'Apple'],
        ramArr: ['3GB', '4GB', '6GB', '8GB'],
        romArr: ['32GB', '64GB', '128GB', '256GB'],
        osArr: ['Android', 'iOS'],
        edit: false,
    }

    async fetchData() {
        const { name } = this.props.match.params;
        if (name) {
            let { data } = await get(`/api/mobiles/${name}`)
            this.setState({ mobile: data[0], edit: true })
        } else {
            let mobile = { name: '', price: '', brand: '', ram: '', rom: '', os: '' };
            this.setState({ mobile: mobile, edit: false })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData()
        }
    }

    handleChange = ({ currentTarget: input }) => {
        let updatedmobile = { ...this.state.mobile };
        updatedmobile[input.name] = input.value;
        this.setState({ mobile: updatedmobile });
    }

    async postData(url, obj) {
        let res = await post(url, obj);
        this.props.history.push('/mobiles')
    }

    async putData(url, obj) {
        let res = await put(url, obj);
        this.props.history.push('/mobiles')
    }

    handleSubmit = (e) => {
        let { mobile, edit } = this.state;
        e.preventDefault();
        edit ? this.putData(`/api/mobiles/${mobile.name}`, mobile) : this.postData('/api/mobiles', this.state.mobile)
    }

    render() {
        let { name, price, brand, ram, rom, os } = this.state.mobile;
        let { brandsArr, ramArr, romArr, osArr, edit } = this.state;
        return (
            <div className='container my-5'>
                <div className="form-group">
                    <label htmlFor='name' className='fw-bold lead'>Mobile Name</label>
                    <input type="text" className='form-control mb-3' id='name' name="name" placeholder='Enter Mobile Name' value={name} disabled={edit} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='price' className='fw-bold lead'>Price</label>
                    <input type="text" className='form-control mb-3' id='price' name="price" placeholder='Enter Mobile Price' value={price} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='brand' className='fw-bold lead'>Choose Brand</label>
                    <select className='form-select mb-3' id="brand" name="brand" value={brand} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select Brand</option>
                        {
                            brandsArr.map(brand =>
                                <option value={brand}>{brand}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='ram' className='fw-bold lead'>Choose RAM</label>
                    <select className='form-select mb-3' id="ram" name="ram" value={ram} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select RAM</option>
                        {
                            ramArr.map(ram =>
                                <option value={ram}>{ram}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='rom' className='fw-bold lead'>Choose ROM</label>
                    <select className='form-select mb-3' id="rom" name="rom" value={rom} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select ROM</option>
                        {
                            romArr.map(rom =>
                                <option value={rom}>{rom}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='os' className='fw-bold lead'>Choose OS</label>
                    <select className='form-select mb-3' id="os" name="os" value={os} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select OS</option>
                        {
                            osArr.map(os =>
                                <option value={os}>{os}</option>
                            )
                        }
                    </select>
                </div>
                <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
        )
    }
}
