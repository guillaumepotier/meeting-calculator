"use strict"

var React = require('react');
var ReactDOM = require('react-dom');

window.locales = require('./locales');
window.lang = 'en';

if ('#fr' === window.location.hash)
  window.lang = 'fr';

window.abacus = require('./abacus')[window.lang];

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
Number.prototype.format = function (n, x) {
  if ('fr' === window.lang)
    var s = ' ', c = ',';
  else
    var s = ',', c = '.';

  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

window.i18n = window.__ = function (string) {
  if (!window.locales[window.lang])
    return string;

  return window.locales[window.lang][string];
}

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

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
    for (i = 0; i < params.length; i++)
      results[params[i]] = ( 1 + ( (abacus.department[inputs.department][i]-abacus.global[i])/abacus.global[i]  +
      (abacus.sector[inputs.sector][i]-abacus.global[i])/abacus.global[i] +
      (abacus.size[category][i]-abacus.global[i])/abacus.global[i] ) / 3 ) * abacus.global[i];

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
        hours: Math.round(team).format(0, 3),
        money: (Math.round(team * abacus.sector[inputs.department][4] * 100) / 100).format(2, 3)
      },
      company: {
        hours: Math.round(company).format(0, 3),
        money: (Math.round(company * abacus.sector[inputs.sector][4] * 100) / 100).format(2, 3)
      }
    });

    $('html, body').animate({
      scrollTop: $("#js-results").offset().top
    }, 2000);
  },
  componentDidMount: function () {
    $(".share").on('click', function () {
      var shareLink = window.location.href,
        shareTitle = __('Take 10 sec to discover how much your team and company waste in unproductive meetings!'),
        shareDescription = shareTitle;

      switch ($(this).data('value')) {
        case 'linkedin':
          window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle + ' - ' + shareLink) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          break;
        case 'twitter':
          window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          break;
        case 'facebook':
          window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareLink)+ '&display=popup&ref=plugin&src=like&app_id=113869198637480&quote=' + encodeURIComponent(shareTitle),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          break;
      }
    });

    $(".js-switch-locale").on('click', function (e) {
      e.preventDefault();
      window.location.hash = 'en' === lang ? '#fr' : '#en';
      window.location.reload(true);
    });

    $("head").append('<meta property="og:title" content="' + __('Meetings cost calculator') + '" />' +
      '<meta property="og:description" content="' + __('Estimate how much your company could spare by putting an end to unproductive meetings with this calculator.') + '" />' +
      '<meta property="og:image" content="./assets/logo.png" />');
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
                <div className="Box-content Box-header">{__('How much could you spare by putting an end to unproductive meetings?')}</div>
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
                <h4>{__('Waste in unproductive meetings per year')}</h4>

                <div className="Grid Grid--results">
                  <div className="Grid-cell Grid-cell--6 Grid-cell--title">
                    {__('For your team')}{' '}
                    <span className="has-tooltip has-tooltip--l has-tooltip--top" aria-label={__('What does this mean? eg: Based on our research, on average, Operations teams runs more unproductive meetings (41%) than any other department. A 20-people Operations team consequently looses on average in the UK 1,859 working hours and £30,347 per year during these improductive meetings.')}>
                      <div className="Icon Icon--info Icon--l"></div>
                    </span>
                  </div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--hours">{this.state.team.hours} {__('hours')}</div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--money" dangerouslySetInnerHTML={{ __html: __('&pound; %f').replace('%f', this.state.team.money) }}></div>
                </div>

                <div className="Grid Grid--results">
                  <div className="Grid-cell Grid-cell--6 Grid-cell--title">
                    {__('For your company')}{' '}
                    <span className="has-tooltip has-tooltip--l has-tooltip--bottom" aria-label={__('What does this mean? eg: Based on our research, on average, Aeronautics & Defense runs more unproductive meetings (67%) than any other industry. A 500-people Aeronautics & Defense company consequently looses on average in the UK 54,188 working hours and £868,649 per year during these improductive meetings.')}>
                      <div className="Icon Icon--info Icon--l"></div>
                    </span>
                  </div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--hours">{this.state.company.hours} {__('hours')}</div>
                  <div className="Grid-cell Grid-cell--3 Grid-cell--money" dangerouslySetInnerHTML={{ __html: __('&pound; %f').replace('%f', this.state.company.money) }}></div>
                </div>

              </div>
            </div>
          </div>

          <div className="Grid Grid--expertise">
            <div className="Grid-cell Grid-cell--9 Grid-cell--discuss">
              <p>{__('Want to discuss? Wisembly has the expertise to help you run engaging and productive meetings every time.')}</p>
            </div>

            <div className="Grid-cell Grid-cell--3 u-tac">
              <a href={__("mailto:contact@wisembly.com?subject=Let's start running productive meetings&body=I would like to be contacted by an expert from the Wisembly Team.%0D%0A Here is my phone number:%0D%0A Cheers")} className="Btn Btn--validate">{__('Contact us')}</a>
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
                <a href={__('http://wisembly.com/en/blog/2016/05/19/uk-survey-wisembly-censuswide-meeting-cost-2016')} target="_blank">{__('Wisembly 2016 UK Survey')}<br/>{__('conducted by Censuswide')}</a><br/>
                {/* <a className="js-switch-locale" href="">{lang === 'en' ? 'See French study' : 'Voir l\'étude UK'}</a> */}
              </p>
            </div>

            <div className="Grid-cell Grid-cell--4 Grid-cell--wisemblylogo">
              <a href={'http://wisembly.com/' + window.lang + '/?utm=meetingcalculator&utc=meetingcalculator'} target="_blank">
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
