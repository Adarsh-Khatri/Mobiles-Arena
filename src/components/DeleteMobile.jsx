import React, { Component } from 'react'
import { deleteApi } from './HttpService'

export default class DeleteMobile extends Component {

    async componentDidMount() {
        const { name } = this.props.match.params;
        await deleteApi(`/api/mobiles/${name}`)
        this.props.history.push('/mobiles');
    }

    render() { return '' }
}
