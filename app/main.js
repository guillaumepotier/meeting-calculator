"use strict"

var React = require('react');
var ReactDOM = require('react-dom');

var abacus = require('./abacus');

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
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
  componentDidMount: function () {
    $("#js-LaunchRightPanel").on('click', function () {
      document.getElementById("js-RightPanel").setAttribute("aria-hidden", "false");
      document.body.classList.add("u-ovh");
    });

    $(".js-CloseRightPanel").on('click', function () {
      document.getElementById("js-RightPanel").setAttribute("aria-hidden", "true");
      document.body.classList.remove("u-ovh");
    });

    $('.js-share').on('click', function () {
      console.log($(this).data('share'));
    });
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
        hours: Math.round(team),
        money: (Math.round(team * abacus.sector[inputs.sector][4] * 100) / 100).format(2, 3, ',', '.')
      },
      company: {
        hours: Math.round(company),
        money: (Math.round(company * abacus.sector[inputs.sector][4] * 100) / 100).format(2, 3, ',', '.')
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

        <div className="Line Line--labeled Line--results">
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
                    <td className="Table-cell">&pound;{this.state.team.money}</td>
                  </tr>
                  <tr className="Table-row">
                    <td className="Table-cell Table-cell--important u-tal">Your company is loosing per year</td>
                    <td className="Table-cell">{this.state.company.hours} hours</td>
                    <td className="Table-cell">&pound;{this.state.company.money}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>

        <hr className="Line" />

        <div className="Grid Grid--share">
          <div className="Grid-cell Grid-cell--3">
            <p className="t-caption u-tal">
              <button id="js-LaunchRightPanel" className="Btn Btn--outline Btn--s Btn--primary">
                <i className="Btn-icon Icon Icon--like"></i>
                &nbsp;Share
              </button>
            </p>
          </div>
          <div className="Grid-cell Grid-cell--9">
            <p className="t-caption u-tar">
              <a href="http://wisembly.com/en/?utm=meetingcalculator&utc=meetingcalculator" target="_blank">2016 - Censuswide survey made by  <i className="Icon Icon--wisemblyFull"></i></a>
            </p>
          </div>
        </div>

      </fieldset>

      <div className="Panel-wrapper" id="js-RightPanel" aria-hidden="true">
          <div className="Panel">
            <header className="Panel-header">
              <h3 className="Panel-title">Share your results</h3>
              <button className="Btn Btn--raw PanelHeader-btn u-push js-CloseRightPanel" aria-label="close">
                <i className="Icon Icon--cross"></i>
              </button>
            </header>
            <div className="Panel-content">
              <p className="u-mgt--0">
                <button data-share="twitter" className="Btn Btn--outline Btn--primary js-share">
                  <i className="Btn-icon Icon Icon--twitter"></i>
                  &nbsp;Tweet
                </button>

                <button data-share="linkedin" className="Btn Btn--outline Btn--primary js-share">
                  <i className="Btn-icon Icon Icon--linkedin"></i>
                  &nbsp;Share
                </button>

                <button data-share="facebook" className="Btn Btn--outline Btn--primary js-share">
                  <i className="Btn-icon Icon Icon--facebook"></i>
                  &nbsp;Share
                </button>
              </p>
            </div>
            <footer className="Panel-footer">
              <button className="Btn Btn--expand js-CloseRightPanel">Close</button>
            </footer>
          </div>
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
        <input ref="input" type="number" onChange={this.onChange}  placeholder="Including you" name="TeamMembers" id="TeamMembers" className="Input" />
      </div>
    );
  }
});

ReactDOM.render(
 <CalculatorBox />,
 document.getElementById('content')
);
