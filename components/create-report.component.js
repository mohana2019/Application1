import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { saveAs } from 'file-saver'
import Constants from '../Constants'

export default class CreateReport extends Component {
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
      client_address: '',
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
    console.log(`Client address: ${this.state.client_address}`)
    console.log(`Edition: ${this.state.edition}`)
    console.log(`Position: ${this.state.position}`)
    console.log(`Color: ${this.state.color}`)
    console.log(`Advertisement Category: ${this.state.advt_category}`)
    console.log(`Caption: ${this.state.caption}`)
    console.log(`Date of Insertion: ${this.state.date_of_insertion}`)

    const newTodo = {
      newspaper_name: this.state.newspaper_name.label,
      client_address: this.state.client_address.label,
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

    axios.post('http://localhost:4000/reports/add', newTodo)

    this.setState({
      newspaper_name: '',
      client_address: '',
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
    })
  }

  createAndDownloadPdf = () => {
    const newTodo = {
      newspaper_name: this.state.newspaper_name.label,
      client_address: this.state.client_address.label,
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
    console.log(newTodo)
    axios
      .post('http://localhost:4000/reports/create-pdf', newTodo, {
        responseType: 'blob'
      })
      .then(res => {
        const pdfBlob = new Blob([res.data], {
          type: 'application/pdf'
        })
        saveAs(pdfBlob, 'generatedDocument.pdf')
      })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Release Order</h3>
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
              value={this.state.client_address}
              onChange={this.onChangeClientAddress}
              options={Constants.clientOptions}
            />
          </div>
          <div className="form-group">
            <label>Edition: </label>
            <Select
              value={this.state.edition}
              onChange={this.onChangeEdition}
              options={Constants.editionOptions}
            />
          </div>
          <div class="row">
            <div class="col">
              <div className="form-group">
                <label>Position: </label>
                <Select
                  value={this.state.position}
                  onChange={this.onChangePosition}
                  options={Constants.positionOptions}
              
                />
              </div> 
            </div>
            <div class="col">
              <div className="form-group">
                <label>Color: </label>
                <Select
                  value={this.state.color}
                  onChange={this.onChangeColor}
                  options={Constants.colorOptions}
                />
              </div>
            </div>
            <div class="col">
              <div className="form-group">
                <label>Advertistement Category: </label>
                <Select
                  value={this.state.advt_category}
                  onChange={this.onChangeAdvtCategory}
                  options={Constants.advtCategoryOptions}
                />
              </div>
            </div>
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
              <label>Height (cms): </label>
              <input
                type="text"
                className="form-control"
                value={this.state.height}
                onChange={this.onChangeHeight}
              />
            </div>
            <div class="col">
              <label>Width (cms): </label>
              <input
                type="text"
                className="form-control"
                value={this.state.width}
                onChange={this.onChangeWidth}
              />
            </div>
          
            <div class="col">
              <div className="form-group">
                <label>Rate (Per Sq.Cm)</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.rate}
                  onChange={this.onChangeRate}
                />
              </div>
            </div>
            <div class="col">
              <div className="form-group">
                <label>No. of Voucher Copies</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.number_voucher_copies}
                 onChange={this.onChangeNumberVoucherCopies}
                />
              </div>
            </div>          
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Save Report"
              className="btn btn-primary"
            />
          </div>
          <div className="form-group">
            <label>Special Instructions</label>
            <input
              type="text"
              className="form-control"
              value={this.state.specialInstructions}
              onChange={this.onChangeSpecialInstructions}
            />
          </div>
        </form>
        <button onClick={this.createAndDownloadPdf}>Download Report</button>
      </div>
    )
  }
}
