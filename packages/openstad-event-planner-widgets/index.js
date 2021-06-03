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
      self.pushAsset('script', 'event-manager', { when: 'always' });
    };

    const superLoad = self.load;
    self.load = function(req, widgets, next) {
      widgets.forEach(widget => {
        const containerId = self.apos.utils.generateId();
        widget.containerId = containerId;

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
          req.data.openstadUser &&
          (req.data.openstadUser.isEventProvider ||
            ['admin', 'moderator', 'editor'].includes(
              req.data.openstadUser.role
            ));

        widget.loginUrl =
          req.data.siteUrl +
          '/oauth/login?returnTo=' +
          encodeURIComponent(req.url);
      });

      return superLoad(req, widgets, next);
    };

    const superOutput = self.output;
    self.output = function(widget, options) {
      return superOutput(widget, options);
    };
  },
};
