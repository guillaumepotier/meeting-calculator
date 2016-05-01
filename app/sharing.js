var React = require('react');

var TwitterButton = React.createClass({
  getInitialState: function () {
    return { initalized: false };
  },
  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.sharing)
      return;

    // do not re-render button if text is unchanged
    if (nextProps.text === this.props.text)
      return;

    if (this.state.initalized) {
      this.componentWillUnmount();
      this.renderWidget(nextProps);
      twttr.widgets.load();
      return;
    }

    var twitterbutton = this.refs.twitterbutton;
    var twitterscript = document.createElement("script");
    twitterscript.src = "//platform.twitter.com/widgets.js";
    twitterscript.id = 'twitter-wjs';
    twitterscript.onload = this.renderWidget;
    twitterbutton.parentNode.appendChild(twitterscript);

    this.setState({ initalized: true });
  },
  componentWillUnmount: function () {
    let elem = $('.twitter-share-button');
    if (elem.length)
      elem.remove();
  },
  renderWidget: function (nextProps) {
    let props = nextProps ? nextProps : this.props;

    twttr.widgets.createShareButton(
      props.url,
      this.refs.twitterbutton,
      { text: props.text }
    );
  },
  render: function () {
    return (
      <div ref="twitterbutton" />
    );
  }
});

module.exports = {
  TwitterButton: TwitterButton
}

