"use strict"

var React = require('react');
var ReactDOM = require('react-dom');

var abacus = {
  // meetings/week, avg meeting duration, %unproductive
  department: [
    [ 5.52, 1.16, 37.73 ],
    [ 7.44, 1.76, 36.78 ],
    [ 5.80, 0.95, 28.30 ],
    [ 7.71, 1.30, 23.04 ],
    [ 4.17, 0.93, 32.59 ],
    [ 6.98, 1.19, 39.75 ],
    [ 5.96, 1.15, 37.29 ],
    [ 4.25, 0.81, 28.06 ],
    [ 5.19, 0.91, 40.62 ]
  ],
  // meetings/week, avg meeting duration, %unproductive
  sector: [
    [ 8.75, 1.72, 48.75 ],
    [ 8.14, 0.90, 67.29 ],
    [ 6.95, 1.15, 29.54 ],
    [ 6.52, 1.12, 28.00 ],
    [ 6.33, 1.20, 34.34 ],
    [ 6.09, 1.01, 37.50 ],
    [ 5.57, 1.03, 50.07 ],
    [ 5.35, 1.11, 31.61 ],
    [ 5.18, 1.03, 30.35 ],
    [ 5.05, 0.73, 47.24 ],
    [ 5.00, 1.01, 28.81 ],
    [ 4.96, 0.96, 34.51 ],
    [ 4.93, 1.36, 31.67 ],
    [ 4.40, 1.30, 32.93 ],
    [ 3.44, 0.98, 52.28 ]
  ]
};

var CalculatorBox = React.createClass({
  getInitialState: function () {
    return {
      team: 0,
      company: 0,
      inputs: {
        sector: 0,
        size: 0,
        department: 0,
        team: 0
      }
    };
  },
  onChangeHandle: function (change) {
      debugger;
    var inputs = Object.assign({}, this.state.inputs, { [change.type]: change.value });
    var team = abacus.department[this.state.inputs.department][0] * abacus.sector[this.state.inputs.sector][1] * abacus.department[this.state.inputs.department][2] * 48 * this.state.inputs.team;
    this.setState({ inputs: inputs, team: team });
  },
  render: function () {
    return (
      <div className="CalculatorBox">
        <CompanySector onInputChange={this.onChangeHandle} />
        <CompanySize onInputChange={this.onChangeHandle} />
        <CompanyDepartment onInputChange={this.onChangeHandle} />
        <TeamMembers onInputChange={this.onChangeHandle} />
        <div className="Result" >
          <Result team={this.state.team} company={this.state.company} />
        </div>
      </div>
    );
  }
});

var CompanySector = React.createClass({
  getInitialState: function () {
    return {
        sectors: ['Publishers', 'Aeronautics/Defense', 'B2B Technology', 'Banking and Insurance', 'Consumer Technology', 'Professional Services', 'Energy', 'Finance', 'Travel and Leisure', 'Industrial', 'Food and Beverages', 'Retail / eCommerce', 'Construction', 'Transportation', 'Pharma and Biotech']
    };
  },
  onChange: function (e) {
    this.setState({ sector: this.refs.select.value });
    this.props.onInputChange({ type: 'sector', value: this.refs.select.value });
  },
  render: function () {
    return (
      <div className="CompanySector">
        <select ref="select" type="select" onChange={this.onChange} value={this.state.sector} name="CompanySector" id="CompanySector">
          <option value="">Please choose..</option>
          {this.state.sectors.map(function (sector, index) {
            return <option key={index} value={index}>{sector}</option>;
          })}
        </select>
      </div>
    );
  }
});

var CompanySize = React.createClass({
  getInitialState: function () {
    return {
      sizes: ['Self employed', '1 - 9 employees', '10 - 49 employees', '50 - 99 employees', '100 - 249 employees', '250 - 500 employees', 'More than 500']
    };
  },
  onChange: function (e) {
    this.setState({ size: this.refs.select.value });
    this.props.onInputChange({ type: 'size', value: this.refs.select.value });
  },
  render: function () {
    return (
      <div className="CompanySize">
        <select ref="select" type="select" onChange={this.onChange} value={this.state.size} name="CompanySize" id="CompanySize">
          <option value="">Please choose..</option>
          {this.state.sizes.map(function (size, index) {
            return <option key={index} value={index}>{size}</option>;
          })}
        </select>
      </div>
    );
  }
});

var CompanyDepartment = React.createClass({
  getInitialState: function () {
    return {
      departments: ['HR', 'Marketing', 'Events and communications', 'Legal', 'Sales', 'Technology, Digital and innovation', 'IT', 'Finance', 'Operational service']
    };
  },
  onChange: function (e) {
    this.setState({ department: this.refs.select.value });
    this.props.onInputChange({ type: 'department', value: this.refs.select.value });
  },
  render: function () {
    return (
      <div className="CompanyDepartment">
        <select ref="select" type="select" onChange={this.onChange} value={this.state.department} name="CompanyDepartment" id="CompanyDepartment">
          <option value="">Please choose..</option>
          {this.state.departments.map(function (department, index) {
            return <option key={index} value={index}>{department}</option>;
          })}
        </select>
      </div>
    );
  }
});

var TeamMembers = React.createClass({
  getInitialState: function () {
    return { members: '' };
  },
  onChange: function (e) {
    // this.setState({ team: this.refs.input.value });
    // this.props.onInputChange({ type: 'team', value: this.refs.input.value });
  },
  render: function () {
    return (
      <div className="TeamMembers">
        <input ref="input" type="number" onChange={this.onChange} name="TeamMembers" id="TeamMembers"></input>
      </div>
    );
  }
});

var Result = React.createClass({
  render: function () {
    return (
      <div className="Result">
        {(!this.props.team && !this.props.company && !this.props.department && !this.props.team) ?
          <div>Plase select..</div> :
          <div>Team: <span>{this.props.team}</span> - Company: <span>{this.props.company}</span></div>
        }
      </div>
    );
  }
});

ReactDOM.render(
 <CalculatorBox />,
 document.getElementById('content')
);
