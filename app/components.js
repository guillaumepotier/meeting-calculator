var React = require('react');

var CompanySector = React.createClass({
  getInitialState: function () {
    return {
        sectors: ['Publishers', 'Aeronautics/Defense', 'B2B Technology', 'Banking and Insurance', 'Consumer Technology', 'Professional Services', 'Energy', 'Finance', 'Travel and Leisure', 'Industrial', 'Food and Beverages', 'Retail / eCommerce', 'Construction', 'Transportation', 'Pharma and Biotech']
    };
  },
  // fucking jQuery hack to support Tapestry select..
  componentDidMount: function () {
    $('#CompanySector').on('change', function (e) {
      this.onChange(e);
    }.bind(this));
  },
  onChange: function (e) {
    this.setState({ sector: this.refs.select.value });
    this.props.onInputChange({ type: 'sector', value: this.refs.select.value });
  },
  render: function () {
    return (
      <div className="CompanySector">
        <label for="CompanySector" className="Label Label--block">Company sector</label>
        <select ref="select" type="select" onChange={this.onChange} name="CompanySector" id="CompanySector" className="Dropdown Dropdown--block" data-tapestry="dropdown-select">
          <option value="">Please choose</option>
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
      size: 1
    };
  },
  onChange: function (e) {
    this.setState({ size: this.refs.input.value });
    this.props.onInputChange({ type: 'size', value: this.refs.input.value });
  },
  render: function () {
    return (
      <div className="CompanySize">
        <label for="CompanySize" className="Label Label--block">Company size</label>
        <input ref="input" type="number" onChange={this.onChange} placeholder="Number of employees" name="CompanySize" id="CompanySize" className="Input" />
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
  // fucking jQuery hack to support Tapestry select..
  componentDidMount: function () {
    $('#CompanyDepartment').on('change', function (e) {
      this.onChange(e);
    }.bind(this));
  },
  onChange: function (e) {
    this.setState({ department: this.refs.select.value });
    this.props.onInputChange({ type: 'department', value: this.refs.select.value });
  },
  render: function () {
    return (
      <div className="CompanyDepartment">
        <label for="CompanyDepartment" className="Label Label--block">Company department</label>
        <select ref="select" type="select" onChange={this.onChange} name="CompanyDepartment" id="CompanyDepartment" className="Dropdown Dropdown--block" data-tapestry="dropdown-select">
          <option value="">Please choose</option>
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
    this.setState({ team: this.refs.input.value });
    this.props.onInputChange({ type: 'team', value: this.refs.input.value });
  },
  render: function () {
    return (
      <div className="TeamMembers">
        <label for="TeamMembers" className="Label Label--block">Team members</label>
        <input ref="input" type="number" onChange={this.onChange}  placeholder="People running meetings, including you" name="TeamMembers" id="TeamMembers" className="Input" />
      </div>
    );
  }
});

module.exports = {
    CompanySector: CompanySector,
    CompanySize: CompanySize,
    CompanyDepartment: CompanyDepartment,
    TeamMembers: TeamMembers
}
