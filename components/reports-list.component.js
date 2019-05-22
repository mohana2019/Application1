import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Report = props => (
  <tr>
    <td>{props.report.newspaper_name}</td>
    <td>{props.report.client_address}</td>
    <td>{props.report.edition}</td>
    <td>{props.report.position}</td>
    <td>{props.report.color}</td>
    <td>{props.report.advt_category}</td>
    <td>{props.report.caption}</td>
    <td>{props.report.date_of_insertion}</td>
    <td>{props.report.width}</td>
    <td>{props.report.height}</td>
    <td>{props.report.rate}</td>
    <td>{props.report.number_voucher_copies}</td>
    <td>
      <Link to={'/edit/' + props.report._id}>Edit</Link>
    </td>
  </tr>
)

export default class ReportsList extends Component {
  constructor(props) {
    super(props)
    this.state = { reports: [] }
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/reports/')
      .then(response => {
        this.setState({ reports: response.data })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  reportList() {
    return this.state.reports.map(function(currentReport, i) {
      return <Report report={currentReport} key={i} />
    })
  }

  render() {
    return (
      <div>
        <h3>Reports List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Newspaper Name</th>
              <th>Client</th>
              <th>Edition</th>
              <th>Position</th>
              <th>Color</th>
              <th>Advertisment Category</th>
              <th>Caption</th>
              <th>Date of insertion</th>
              <th>Height</th>
              <th>Width</th>
              <th>Rate in Sq Cm</th>
              <th> No of Voucher Copies</th>
            </tr>
          </thead>
          <tbody>{this.reportList()}</tbody>
        </table>
      </div>
    )
  }
}
