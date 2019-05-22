import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Constants from '../Constants'

export default class EditTodo extends Component {
  constructor(props) {
    super(props)

    this.onChangeNewspaperName = this.onChangeNewspaperName.bind(this)
    this.onChangeCaption = this.onChangeCaption.bind(this)
    this.onChangeAdvtCategory = this.onChangeAdvtCategory.bind(this)
    this.onChangeClientAddress = this.onChangeClientAddress.bind(this)
    this.onChangePosition = this.onChangePosition.bind(this)
    this.onChangeColor = this.onChangeColor.bind(this)
    this.onChangeEdition = this.onChangeEdition.bind(this)
    this.onChangeDateOfInsertion = this.onChangeDateOfInsertion.bind(this)

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      newspaper_name: '',
      client_adress: '',
      edition: '',
      position: '',
      color: '',
      advt_category: '',
      caption: '',
      date_of_insertion: '',
      width: 0,
      height: 0,
      rate: 0,
      number_voucher_copies: 0
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/reports/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          newspaper_name: Constants.newspaperOption.filter(function(option) {
            return option.label === response.data.newspaper_name
          }),
          client_address: Constants.clientOptions.filter(function(option) {
            return option.label === response.data.client_address
          }),
          edition: Constants.editionOptions.filter(function(option) {
            return option.label === response.data.edition
          }),
          position: Constants.positionOptions.filter(function(option) {
            return option.label === response.data.position
          }),
          color: Constants.colorOptions.filter(function(option) {
            return option.label === response.data.color
          }),
          advt_category: Constants.advtCategoryOptions.filter(function(option) {
            return option.label === response.data.advt_category
          }),
          caption: response.data.caption,
          date_of_insertion: response.data.date_of_insertion,
          width: response.data.width,
          height: response.data.height,
          rate: response.data.rate,
          number_voucher_copies: response.data.number_voucher_copies
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  onChangeNewspaperName(newspaperName) {
    this.setState({ newspaper_name: newspaperName })
    console.log(`Option selected:`, newspaperName)
  }

  onChangeClientAddress(clientAddress) {
    this.setState({ client_address: clientAddress })
    console.log(`Option selected:`, clientAddress)
  }

  onChangeEdition(edition) {
    this.setState({ edition: edition })
    console.log(`Option selected:`, edition)
  }

  onChangePosition(position) {
    this.setState({ position: position })
    console.log(`Option selected:`, position)
  }

  onChangeColor(color) {
    this.setState({ color: color })
    console.log(`Option selected:`, color)
  }

  onChangeAdvtCategory(advt_category) {
    this.setState({ advt_category: advt_category })
    console.log(`Option selected:`, advt_category)
  }

  onChangeCaption(e) {
    this.setState({
      caption: e.target.value
    })
  }
  onChangeDateOfInsertion(e) {
    this.setState({
      date_of_insertion: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    console.log(`Form submitted:`)
    console.log(`Newspaper Name: ${this.state.newspaper_name}`)
    console.log(`Client address: ${this.state.client_adress}`)
    console.log(`Edition: ${this.state.edition}`)
    console.log(`Position: ${this.state.position}`)
    console.log(`Color: ${this.state.color}`)
    console.log(`Advertisement Category: ${this.state.advt_category}`)
    console.log(`Caption: ${this.state.caption}`)
    console.log(`Date of Insertion: ${this.state.date_of_insertion}`)

    const obj = {
      newspaper_name: this.state.newspaper_name.label,
      client_adress: this.state.client_adress.label,
      edition: this.state.edition.label,
      position: this.state.position.label,
      color: this.state.color.label,
      advt_category: this.state.advt_category.label,
      caption: this.state.caption,
      date_of_insertion: this.state.date_of_insertion,
      width: this.state.width,
      height: this.state.height,
      rate: this.state.rate,
      number_voucher_copies: this.state.number_voucher_copies
    }

    axios
      .post(
        'http://localhost:4000/reports/update/' + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data))

    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h3 align="center">Update Report</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Newspaper: </label>
            <Select
              value={this.state.newspaper_name}
              onChange={this.onChangeNewspaperName}
              options={Constants.newspaperOption}
            />
          </div>
          <div className="form-group">
            <label>Client: </label>
            <Select
              value={this.state.client_adress}
              onChange={this.onChangeClientAddress}
              options={Constants.clientOptions}
            />
          </div>
          <div className="form-group">
            <label>Edition: </label>
            <Select
              value={this.state.edition}
              onChange={this.onChangeEdition}
              options={Constants.ComponenteditionOptions}
            />
          </div>
          <div className="form-group">
            <label>Position: </label>
            <Select
              value={this.state.edition}
              onChange={this.onChangePosition}
              options={Constants.positionOptions}
            />
          </div>
          <div className="form-group">
            <label>Color: </label>
            <Select
              value={this.state.edition}
              onChange={this.onChangeColor}
              options={Constants.olorOptions}
            />
          </div>
          <div className="form-group">
            <label>Advertistement Category: </label>
            <Select
              value={this.state.edition}
              onChange={this.onChangeAdvtCategory}
              options={Constants.advtCategoryOptions}
            />
          </div>
          <div className="form-group">
            <label>Caption: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.caption}
              onChange={this.onChangeCaption}
            />
          </div>
          <div className="form-group">
            <label>Date of insertion: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.date_of_insertion}
              onChange={this.onChangeDateOfInsertion}
            />
          </div>
          <div class="row">
            <div class="col">
              <label>Height: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.height}
                onChange={this.onChangeHeight}
              />
            </div>
            <div class="col">
              <label>Width: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.width}
                onChange={this.onChangeWidth}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Rate in Sq.Cms</label>
            <input
              type="text"
              className="form-control"
              value={this.state.rate}
              onChange={this.onChangeRate}
            />
          </div>
          <div className="form-group">
            <label>No. of Voucher Copies</label>
            <input
              type="text"
              className="form-control"
              value={this.state.number_voucher_copies}
              onChange={this.onChangeNumberVoucherCopies}
            />
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}
