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

    $('html, body').animate({
      scrollTop: $("#js-results").offset().top
    }, 2000);
  },
  componentDidMount: function () {
    $(".share").on('click', function () {
      var shareLink = window.location.href,
        shareTitle = 'Take 10 sec to discover how much your team and company waste in unproductive meetings!',
        shareDescription = shareTitle;

      switch ($(this).data('value')) {
        case 'linkedin':
          window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle + ' - ' + shareLink) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          break;
        case 'twitter':
          window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          break;
        case 'facebook':
          window.open('//www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=' + encodeURIComponent(shareLink) + '&quote=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          break;
      }
    });
  },
  render: function () {
    return (
      <div className="CalculatorBox">
        <fieldset className="Fieldset">

          <div className="Grid">
            <div className="Grid-cell Grid-cell--12 Grid-cell--logo">
              <img src="./assets/logo.png" className="Logo" />
            </div>
            <div className="Grid-cell Grid-cell--12 Grid-cell--header">
              <div className="Box">
                <div className="Box-content Box-header">How much could you spare by putting an end to unproductive meetings?</div>
              </div>
            </div>
          </div>

          <div className="Grid">
            <div className="Grid-cell Grid-cell--6">
              <CompanySector onInputChange={this.onChangeHandle} />
            </div>
            <div className="Grid-cell Grid-cell--1"></div>
            <div className="Grid-cell Grid-cell--5">
              <CompanySize onInputChange={this.onChangeHandle} />
            </div>
          </div>
          <div className="Grid Grid-row--2">
            <div className="Grid-cell Grid-cell--6">
              <CompanyDepartment onInputChange={this.onChangeHandle} />
            </div>
            <div className="Grid-cell Grid-cell--1"></div>
            <div className="Grid-cell Grid-cell--5">
              <TeamMembers onInputChange={this.onChangeHandle} />
            </div>
          </div>

          <div className="Grid">
            <div className="Grid-cell Grid-cell--12 Grid-cell--line">
              <hr className="Line" />
            </div>
          </div>

          <div className="Grid">
            <div className="Grid-cell Grid-cell--12">
              <div className="Result" id="js-results">
                <h4>Waste in unproductive meetings per year</h4>

                <div className="Grid Grid--results">
                  <div className="Grid-cell Grid-cell--6 Grid-cell--title">For your team</div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--hours">{this.state.team.hours} hours</div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--money">&pound; {this.state.team.money}</div>
                </div>

                <div className="Grid Grid--results">
                  <div className="Grid-cell Grid-cell--6 Grid-cell--title">For your company</div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--hours">{this.state.company.hours} hours</div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--money">&pound; {this.state.company.money}</div>
                </div>

              </div>
            </div>
          </div>

          <div className="Grid Grid--expertise">
            <div className="Grid-cell Grid-cell--9 Grid-cell--discuss">
              <p>Want to discuss? Wisembly has the expertise to help you run engaging and productive meetings every time.</p>
            </div>

            <div className="Grid-cell Grid-cell--3 u-tac">
              <a href="mailto:contact@wisembly.com?subject=Let's start running productive meetings&body=I would like to be contacted by an expert from the Wisembly Team.%0D%0A Here is my phone number:%0D%0A Cheers" className="Btn Btn--s Btn--validate">Contact us</a>
            </div>
          </div>

          <div className="Grid">
            <div className="Grid-cell Grid-cell--12">
              <hr className="Line" />
            </div>
          </div>

          <div className="Grid Grid--footer u-vam">
            <div className="Grid-cell Grid-cell--4">
              <p className="t-caption t-caption--copy">
                <a href="http://wisembly.com/en/blog/2016/05/03/uk-survey-wisembly-censuswide-meeting-cost-2016?utm=meetingcalculator&utc=meetingcalculator" target="_blank">Wisembly 2016 Survey<br/>conducted by Censuswide</a>
              </p>
            </div>

            <div className="Grid-cell Grid-cell--4 Grid-cell--wisemblylogo">
              <a href="http://wisembly.com/en/?utm=meetingcalculator&utc=meetingcalculator" target="_blank">
                <img className="wisembly-logo" src="./assets/wisembly-logo.png" />
              </a>
            </div>

            <div className="Grid-cell Grid-cell--4">
              <div className="t-caption t-caption--share">

                <button className="Btn Btn--s Btn--outline Btn--circle share" data-value="linkedin">
                  <i className="Icon Icon--linkedin"></i>
                </button>

                <button className="Btn Btn--s Btn--outline Btn--circle share" data-value="twitter">
                  <i className="Icon Icon--twitter"></i>
                </button>

                <button className="Btn Btn--s Btn--outline Btn--circle share" data-value="facebook">
                  <i className="Icon Icon--facebook"></i>
                </button>

              </div>
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
