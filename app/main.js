"use strict"

var React = require('react');
var ReactDOM = require('react-dom');

var abacus = {
  // meetings/week, avg meeting duration, %unproductive
  global: [ 5.6, 1.07, 36 ],
  // meetings/week, avg meeting duration, %unproductive
  department: [
    [ 5.52, 1.16, 37.73 ], // HR
    [ 7.44, 1.76, 36.78 ], // Marketing
    [ 5.80, 0.95, 28.30 ], // Events and communications
    [ 7.71, 1.30, 23.04 ], // Legal
    [ 4.17, 0.93, 32.59 ], // Sales
    [ 6.98, 1.19, 39.75 ], // Technology, Digital and innovation
    [ 5.96, 1.15, 37.29 ], // IT
    [ 4.25, 0.81, 28.06 ], // Finance
    [ 5.19, 0.91, 40.62 ] // Operational service
  ],
  // meetings/week, avg meeting duration, %unproductive, % white collars, mean salary
  sector: [
    [ 8.75, 1.72, 48.75, 46, 19.56 ], // Publishers
    [ 8.14, 0.90, 67.29, 46, 16.03 ], // Aeronautics/Defence
    [ 6.95, 1.15, 29.54, 46, 21.16 ], // B2B Technology
    [ 6.52, 1.12, 28.00, 48, 26.27 ], // Banking and Insurance
    [ 6.33, 1.20, 34.34, 46, 21.16 ], // Consumer Technology
    [ 6.09, 1.01, 37.50, 46, 16.17 ], // Professional Services
    [ 5.57, 1.03, 50.07, 48, 20.99 ], // Energy
    [ 5.35, 1.11, 31.61, 48, 26.27 ], // Finance
    [ 5.18, 1.03, 30.35, 46, 15.66 ], // Travel and Leisure
    [ 5.05, 0.73, 47.24, 46, 15.70 ], // Industrial
    [ 5.00, 1.01, 28.81, 48, 15.28 ], // Food and Beverages
    [ 4.96, 0.96, 34.51, 48, 13.29 ], // Retail / eCommerce
    [ 4.93, 1.36, 31.67, 38, 15.34 ], // Construction
    [ 4.40, 1.30, 32.93, 45, 15.08 ], // Transportation
    [ 3.44, 0.98, 52.28, 48, 21.09 ] // Pharma and Biotech
  ],
  // meetings/week, avg meeting duration, %unproductive
  size: [
    [ 3.90, 0.95, 29 ], // 1 - 9 employees
    [ 4.32, 0.88, 39 ], // 10 - 49 employees
    [ 6.40, 1.06, 31 ], // 100 - 249 employees
    [ 5.99, 1.25, 38 ], // 250 - 500 employees
    [ 5.18, 1.22, 32 ], // 50 - 99 employees
    [ 6.24, 0.86, 43 ] // More than 500, please specify
  ],
  sizes: [9, 49, 99, 249, 500]
};

var CalculatorBox = React.createClass({
  getInitialState: function () {
    return {
      team: {
        hours: 0,
        money: 0
      },
      company: {
        hours: 0,
        money: 0
      },
      inputs: {
        sector: 0,
        size: 0,
        department: 0,
        team: 0
      }
    };
  },
  onChangeHandle: function (change) {

    var inputs = Object.assign({}, this.state.inputs, { [change.type]: change.value });
    this.setState({ inputs: inputs });

    if (!inputs.sector || !inputs.size || !inputs.department || !inputs.team)
      return;

    var size = inputs.size;
    var category = abacus.sizes.length;

    for (var i = 0; i < abacus.sizes.length; i++) {
      if (size <= abacus.sizes[i]) {
        category = i;
        break;
      }
    }

    var results = {};
    var params = [ 'weeklyMeetings', 'avgDuration', 'percentUnproductive' ];
    for (i = 0; i < params.length; i++) {
      results[params[i]] = ( 1 + ( (abacus.department[inputs.department][i]-abacus.global[i])/abacus.global[i]  +
      (abacus.sector[inputs.sector][i]-abacus.global[i])/abacus.global[i] +
      (abacus.size[category][i]-abacus.global[i])/abacus.global[i] ) / 3 ) * abacus.global[i];
    }

    var team =
      results.weeklyMeetings * // weekly meeting
      results.avgDuration * // avg meeting duraction
      results.percentUnproductive / 100 * // % improductive meetings
      48 *
      inputs.team; // team members

    var company =
      results.weeklyMeetings * // weekly meeting
      results.avgDuration * // avg meeting duraction
      results.percentUnproductive / 100 * // % improductive meetings
      48 *
      inputs.size *  // entreprise size
      abacus.sector[inputs.sector][3] / 100; // % white collar

    this.setState({
      inputs: inputs,
      team: {
        hours: Math.ceil(team),
        money: Math.ceil(team * abacus.sector[inputs.sector][4])
      },
      company: {
        hours: Math.ceil(company),
        money: Math.ceil(company * abacus.sector[inputs.sector][4])
      }
    });
  },
  render: function () {
    return (
      <div className="CalculatorBox">
      <fieldset className="Fieldset">
        <legend className="Legend">Meeting cost calculator</legend>
        <div className="Grid">
          <div className="Grid-cell Grid-cell--7">
            <CompanySector onInputChange={this.onChangeHandle} />
          </div>
          <div className="Grid-cell Grid-cell--1"></div>
          <div className="Grid-cell Grid-cell--4">
            <CompanySize onInputChange={this.onChangeHandle} />
          </div>
        </div>
        <div className="Grid Grid-row--2">
          <div className="Grid-cell Grid-cell--7">
            <CompanyDepartment onInputChange={this.onChangeHandle} />
          </div>
          <div className="Grid-cell Grid-cell--1"></div>
          <div className="Grid-cell Grid-cell--4">
            <TeamMembers onInputChange={this.onChangeHandle} />
          </div>
        </div>

        <div className="Line Line--labeled">
          <div className="Line-label">Results</div>
        </div>

        <div className="Grid">
          <div className="Grid-cell Grid-cell--12">
            <div className="Result">

              <table className="Table">
                <tbody className="Table-body">
                  <tr className="Table-row">
                    <td className="Table-cell Table-cell--important u-tal">Your team is loosing per year</td>
                    <td className="Table-cell">{this.state.team.hours} hours</td>
                    <td className="Table-cell">£{this.state.team.money}</td>
                  </tr>
                  <tr className="Table-row">
                    <td className="Table-cell Table-cell--important u-tal">Your company is loosing per year</td>
                    <td className="Table-cell">{this.state.company.hours} hours</td>
                    <td className="Table-cell">£{this.state.company.money}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </fieldset>
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
        <input ref="input" type="number" value={this.state.size} onChange={this.onChange} name="CompanySize" id="CompanySize" className="Input" />
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
    this.setState({ team: this.refs.input.value });
    this.props.onInputChange({ type: 'team', value: this.refs.input.value });
  },
  render: function () {
    return (
      <div className="TeamMembers">
        <label for="TeamMembers" className="Label Label--block">Team members</label>
        <input ref="input" type="number" onChange={this.onChange} name="TeamMembers" id="TeamMembers" className="Input" />
      </div>
    );
  }
});

var Result = React.createClass({
  render: function () {
    return (
      <div className="Result">
        {(!this.props.inputs.team || !this.props.inputs.sector || !this.props.inputs.department || !this.props.inputs.size) ?
          <div>Plase select..</div> :
          <div>
            Team: <span>{this.props.team}</span> hours wasted - Company: <span>{this.props.company}</span> hours wasted
          </div>
        }
      </div>
    );
  }
});

ReactDOM.render(
 <CalculatorBox />,
 document.getElementById('content')
);
