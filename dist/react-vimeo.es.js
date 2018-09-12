import React from 'react';
import PropTypes from 'prop-types';
import Player from '@vimeo/player';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var eventNames = {
  ready: 'onReady',
  play: 'onPlay',
  pause: 'onPause',
  ended: 'onEnd',
  timeupdate: 'onTimeUpdate',
  progress: 'onProgress',
  seeked: 'onSeeked',
  texttrackchange: 'onTextTrackChange',
  cuechange: 'onCueChange',
  cuepoint: 'onCuePoint',
  volumechange: 'onVolumeChange',
  error: 'onError',
  loaded: 'onLoaded'
};

var Vimeo =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Vimeo, _React$Component);

  function Vimeo(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.refContainer = _this.refContainer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Vimeo.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.createPlayer();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    // eslint-disable-next-line react/destructuring-assignment
    var changes = Object.keys(this.props).filter(function (name) {
      return _this2.props[name] !== prevProps[name];
    });
    this.updateProps(changes);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.player.destroy();
  };
  /**
   * @private
   */


  _proto.getInitialOptions = function getInitialOptions() {
    /* eslint-disable react/destructuring-assignment */
    return {
      id: this.props.video,
      width: this.props.width,
      height: this.props.height,
      autopause: this.props.autopause,
      autoplay: this.props.autoplay,
      byline: this.props.showByline,
      color: this.props.color,
      loop: this.props.loop,
      portrait: this.props.showPortrait,
      title: this.props.showTitle,
      muted: this.props.muted,
      background: this.props.background
    };
    /* eslint-enable react/destructuring-assignment */
  };
  /**
   * @private
   */


  _proto.updateProps = function updateProps(propNames) {
    var _this3 = this;

    var player = this.player;
    propNames.forEach(function (name) {
      // eslint-disable-next-line react/destructuring-assignment
      var value = _this3.props[name];

      switch (name) {
        case 'autopause':
          player.setAutopause(value);
          break;

        case 'color':
          player.setColor(value);
          break;

        case 'loop':
          player.setLoop(value);
          break;

        case 'volume':
          player.setVolume(value);
          break;

        case 'paused':
          player.getPaused().then(function (paused) {
            if (value && !paused) {
              return player.pause();
            }

            if (!value && paused) {
              return player.play();
            }

            return null;
          });
          break;

        case 'width':
        case 'height':
          player.element[name] = value;
          break;

        case 'video':
          if (value) {
            var start = _this3.props.start;
            player.loadVideo(value); // Set the start time only when loading a new video.

            if (typeof start === 'number') {
              player.setCurrentTime(start);
            }
          } else {
            player.unload();
          }

          break;

        default: // Nothing

      }
    });
  };
  /**
   * @private
   */


  _proto.createPlayer = function createPlayer() {
    var _this4 = this;

    var _this$props = this.props,
        start = _this$props.start,
        volume = _this$props.volume;
    this.player = new Player(this.container, this.getInitialOptions());
    Object.keys(eventNames).forEach(function (dmName) {
      var reactName = eventNames[dmName];

      _this4.player.on(dmName, function (event) {
        // eslint-disable-next-line react/destructuring-assignment
        var handler = _this4.props[reactName];

        if (handler) {
          handler(event);
        }
      });
    });

    if (typeof start === 'number') {
      this.player.setCurrentTime(start);
    }

    if (typeof volume === 'number') {
      this.updateProps(['volume']);
    }
  };
  /**
   * @private
   */


  _proto.refContainer = function refContainer(container) {
    this.container = container;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        className = _this$props2.className;
    return React.createElement("div", {
      id: id,
      className: className,
      ref: this.refContainer
    });
  };

  return Vimeo;
}(React.Component);

if (process.env.NODE_ENV !== 'production') {
  Vimeo.propTypes = {
    /**
     * A Vimeo video ID or URL.
     */
    video: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * DOM ID for the player element.
     */
    id: PropTypes.string,

    /**
     * CSS className for the player element.
     */
    className: PropTypes.string,

    /**
     * Width of the player element.
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Height of the player element.
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Pause the video.
     */
    paused: PropTypes.bool,
    // eslint-disable-line react/no-unused-prop-types

    /**
     * The playback volume as a number between 0 and 1.
     */
    volume: PropTypes.number,

    /**
     * The time in seconds at which to start playing the video.
     */
    start: PropTypes.number,
    // Player parameters

    /**
     * Pause this video automatically when another one plays.
     */
    autopause: PropTypes.bool,

    /**
     * Automatically start playback of the video. Note that this won’t work on
     * some devices.
     */
    autoplay: PropTypes.bool,

    /**
     * Show the byline on the video.
     */
    showByline: PropTypes.bool,

    /**
     * Specify the color of the video controls. Colors may be overridden by the
     * embed settings of the video.
     */
    color: PropTypes.string,

    /**
     * Play the video again when it reaches the end.
     */
    loop: PropTypes.bool,

    /**
     * Show the portrait on the video.
     */
    showPortrait: PropTypes.bool,

    /**
     * Show the title on the video.
     */
    showTitle: PropTypes.bool,

    /**
     * Starts in a muted state to help with autoplay
     */
    muted: PropTypes.bool,

    /**
     * Starts in a background state with no controls to help with autoplay
     */
    background: PropTypes.bool,
    // Events

    /* eslint-disable react/no-unused-prop-types */

    /**
     * Sent when the Vimeo player API has loaded.
     */
    onReady: PropTypes.func,

    /**
     * Sent when the player triggers an error.
     */
    onError: PropTypes.func,

    /**
     * Triggered when the video plays.
     */
    onPlay: PropTypes.func,

    /**
     * Triggered when the video pauses.
     */
    onPause: PropTypes.func,

    /**
     * Triggered any time the video playback reaches the end.
     * Note: when `loop` is turned on, the ended event will not fire.
     */
    onEnd: PropTypes.func,

    /**
     * Triggered as the `currentTime` of the video updates. It generally fires
     * every 250ms, but it may vary depending on the browser.
     */
    onTimeUpdate: PropTypes.func,

    /**
     * Triggered as the video is loaded. Reports back the amount of the video
     * that has been buffered.
     */
    onProgress: PropTypes.func,

    /**
     * Triggered when the player seeks to a specific time. An `onTimeUpdate`
     * event will also be fired at the same time.
     */
    onSeeked: PropTypes.func,

    /**
     * Triggered when the active text track (captions/subtitles) changes. The
     * values will be `null` if text tracks are turned off.
     */
    onTextTrackChange: PropTypes.func,

    /**
     * Triggered when the active cue for the current text track changes. It also
     * fires when the active text track changes. There may be multiple cues
     * active.
     */
    onCueChange: PropTypes.func,

    /**
     * Triggered when the current time hits a registered cue point.
     */
    onCuePoint: PropTypes.func,

    /**
     * Triggered when the volume in the player changes. Some devices do not
     * support setting the volume of the video independently from the system
     * volume, so this event will never fire on those devices.
     */
    onVolumeChange: PropTypes.func,

    /**
     * Triggered when a new video is loaded in the player.
     */
    onLoaded: PropTypes.func
    /* eslint-enable react/no-unused-prop-types */

  };
}

Vimeo.defaultProps = {
  autopause: true,
  autoplay: false,
  showByline: true,
  loop: false,
  showPortrait: true,
  showTitle: true,
  muted: false,
  background: false
};

export default Vimeo;