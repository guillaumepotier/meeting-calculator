"use strict"

var React = require('react');
var ReactDOM = require('react-dom');

var abacus = require('./abacus');

var sharing = require('./sharing');
var components = require('./components');

var CompanySector = components.CompanySector,
    CompanySize =  components.CompanySize,
    CompanyDepartment= components.CompanyDepartment,
    TeamMembers = components.TeamMembers;

var TwitterButton = sharing.TwitterButton;

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
      sharing: false,
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
  },
  onChangeHandle: function (change) {
    var inputs = Object.assign({}, this.state.inputs);
    inputs[change.type] = change.value;

    var sharing = !!inputs.sector && !!inputs.size && !!inputs.department && !!inputs.team;

    this.setState(function () {
      return { inputs: inputs, sharing: sharing };
    });

    if (!sharing)
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

        <div className="Grid Grid--share f">
          <div className="Grid-cell Grid-cell--3">
            <div ref="sharebuttons" className="t-caption u-tal">
              <TwitterButton sharing={this.state.sharing} url={window.location.href} text={'My team and I just lost £ ' + this.state.team.money + ' worth in unproductive meetings this year, and you?'} />
            </div>
          </div>
          <div className="Grid-cell Grid-cell--9">
            <p className="t-caption u-tar">
              <a href="http://wisembly.com/en/?utm=meetingcalculator&utc=meetingcalculator" target="_blank">2016 - Censuswide survey made by  <i className="Icon Icon--wisemblyFull"></i></a>
            </p>
          </div>
        </div>

      </fieldset>
      </div>
    );
  }
});

ReactDOM.render(
 <CalculatorBox />,
 document.getElementById('content')
);
