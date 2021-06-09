const get = require('lodash.get');

module.exports = {
  extend: 'openstad-widgets',
  label: 'Eventplanner',

  /**
   * @todo: Add useful fields
   */
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        type: 'string',
        name: 'account',
        label: 'Twitter Account',
      },
      {
        type: 'string',
        name: 'hashtag',
        label: 'Filter Tweets by Hashtag',
      },
      {
        type: 'integer',
        name: 'limit',
        label: 'Limit Number of Tweets',
        def: 3,
      },
    ].concat(options.addFields || []);

    options.arrangeFields = [
      {
        name: 'basics',
        label: 'Basics',
        fields: ['account', 'hashtag', 'limit'],
      },
    ].concat(options.arrangeFields || []);
  },

  /**
   * This creates a config object which is used to configure the react component.
   *
   * @param {*} self
   * @param {*} options
   */
  construct: function(self, options) {
    const superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      // Drawback to this approach is that event-manager is loaded when users don't have access to it
      self.pushAsset('script', 'event-manager');
    };

    const superLoad = self.load;
    self.load = function(req, widgets, next) {
      widgets.forEach(widget => {
        const containerId = self.apos.utils.generateId();
        widget.containerId = containerId;

        // Check for API support
        widget.isSupported = get(req, 'data.openstadUser', {}).hasOwnProperty(
          'isEventProvider'
        );

        // Create the config for the react component
        widget.config = JSON.stringify({
          siteId: req.data.global.siteId,
          apiUrl: self.apos.settings.getOption(req, 'apiUrl'),
          jwt: req.session.jwt,
          user: {
            role: get(req, 'data.openstadUser.role', ''),
            isEventProvider: get(
              req,
              'data.openstadUser.isEventProvider',
              false
            ),
          },
        });

        // Check if user can view this widget
        widget.canView =
          get(req, 'data.openstadUser.isEventProvider', false) ||
          ['admin', 'moderator', 'editor'].includes(
            get(req, 'data.openstadUser.role', '')
          );

        widget.loginUrl =
          req.data.siteUrl +
          '/oauth/login?returnTo=' +
          encodeURIComponent(req.url);

        widget.isDebug = process.NODE_ENV !== 'production';
      });

      return superLoad(req, widgets, next);
    };

    const superOutput = self.output;
    self.output = function(widget, options) {
      return superOutput(widget, options);
    };
  },
};
