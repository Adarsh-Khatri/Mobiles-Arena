import React, { Component } from 'react'

export default class LeftPanelOptionsCB extends Component {

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let options = { ...this.props.options };
        if (input.type === 'checkbox') {
            options[input.name] = this.updateCBs(options[input.name], input.checked, input.value);
        } else {
            options[input.name] = input.value;
        }
        this.props.onOptionChange(options);
    }

    updateCBs = (inpValue, checked, value) => {
        let inpArr = inpValue ? inpValue.split(',') : [];
        if (checked) inpArr.push(value);
        else {
            let index = inpArr.findIndex(ele => ele === value);
            if (index >= 0) inpArr.splice(index, 1);
        }
        return inpArr.join(',');
    }

    makeCheckboxes = (arr, values, name, label) => (
        <div className='form-check'>
            <label className='form-check-label w-100 lead fw-bold text-center'>{label}</label>
            {arr.map((opt, index) => (
                <div className="form-check" key={index}>
                    <input type="checkbox" id={`${name}${index}`} className='form-check-input' value={opt} name={name} checked={values.find(val => val === opt)} onChange={this.handleChange} />
                    <label className='form-check-label' htmlFor={`${name}${index}`}>{opt}</label>
                </div>
            ))}
        </div>
    );

    showRadios = (label, arr, name, selVal) => {
        return (
            <>
                <label className='form-check-label fw-bold'>{label} </label>
                {
                    arr.map((opt, index) =>
                        <div className="form-check" key={index}>
                            <input className='form-check-input' id={`rd${index}`} type="radio" name={name} value={opt} checked={selVal === opt} onChange={this.handleChange} />
                            <label className='form-check-label' htmlFor={`rd${index}`}>{opt}</label>
                        </div>
                    )
                }
            </>
        )
    }

    render() {
        let { brand = '', ram = '', rom = '' } = this.props.options;
        let { brandsArr, ramArr, romArr } = this.props;
        return (
            <div className="row border border-dark bg-light rounded my-2 me-2 py-4">
                <div className="col-sm-12">
                    {this.makeCheckboxes(brandsArr, brand.split(','), 'brand', 'Choose Brand')}
                </div>
                <div className="col-sm-12">
                    {this.makeCheckboxes(ramArr, ram.split(','), 'ram', 'Choose RAM')}
                </div>
                <div className="col-sm-12">
                    {this.makeCheckboxes(romArr, rom.split(','), 'rom', 'Choose ROM')}
                </div>
            </div>
        )
    }
}



