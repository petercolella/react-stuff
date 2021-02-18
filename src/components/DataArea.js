import React, { Component } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";

export default class DataArea extends Component {
  state = {
    users: [{}],
    order: "descend",
    filteredEmployees: [{}],
    sort: true,
  };

  headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" },
  ];

  handleSort = (heading) => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend",
      });
    } else {
      this.setState({
        order: "descend",
      });
    }

    const compareFnc = (a, b) => {
      if (this.state.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }
    };
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    this.setState({ filteredUsers: sortedUsers });
  };

  sortFunction = () => {
    this.setState({ sort: !this.state.sort });

    const compare = (a, b) => {
      if (this.state.sort) {
        return a.name.first.localeCompare(b.name.first);
      } else {
        return b.name.first.localeCompare(a.name.first);
      }
    };

    const sorted = this.state.users.sort(compare);
    this.setState({ filteredEmployees: sorted });
  };

  handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    const filteredEmployees = this.state.users.filter((employee) => {
      return employee.name.first
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    this.setState({ filteredEmployees: filteredEmployees });
  };

  componentDidMount() {
    API.getUsers().then((results) => {
      this.setState({
        users: results.data.results,
        filteredEmployees: results.data.results,
      });
    });
  }

  render() {
    return (
      <>
        <Nav handleSearchChange={this.handleSearchChange} />
        <div className="data-area">
          <DataTable
            headings={this.headings}
            users={this.state.filteredEmployees}
            handleSort={this.sortFunction}
          />
        </div>
      </>
    );
  }
}
