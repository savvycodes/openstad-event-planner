const get = require('lodash.get');

module.exports = {
  extend: 'openstad-widgets',
  label: 'Eventplanner',
  playerData: ['_id', 'config'],
  minify: false,

  /**
   * @todo: Add useful fields
   */
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        type: 'boolean',
        name: 'devDebug',
        label: 'Enable debug',
        def: false,
      },
    ].concat(options.addFields || []);
    options.arrangeFields = [
      {
        name: 'developer',
        label: 'Developer menu',
        fields: ['devDebug'],
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
      self.pushAsset('script', 'always', { when: 'always' });
    };

    const superLoad = self.load;
    self.load = function(req, widgets, next) {
      widgets.forEach(widget => {
        // Check for API support
        // widget.isSupported = get(req, 'data.openstadUser', {}).hasOwnProperty(
        //   'isEventProvider'
        // );

        // Create the config for the react component
        widget.config = {
          siteId: req.data.global.siteId,
          apiUrl: self.apos.settings.getOption(req, 'apiUrl'),
          imageUrl: req.data.siteUrl + '/image',
          jwt: req.session.jwt,
          user: {
            role: get(req, 'data.openstadUser.role', ''),
            isEventProvider: get(
              req,
              'data.openstadUser.isEventProvider',
              false
            ),
          },
          themes: req.data.global.themes,
          areas: req.data.global.areas,
        };

        // Check if user can view this widget
        widget.canView = get(req, 'data.openstadUser.id', false);
        // get(req, 'data.openstadUser.isEventProvider', false) ||
        // ['admin', 'moderator', 'editor'].includes(
        //   get(req, 'data.openstadUser.role', '')
        // );

        widget.loginUrl =
          req.data.siteUrl +
          '/oauth/login?returnTo=' +
          encodeURIComponent(req.url);

        widget.isDebug =
          get(req, 'data.openstadUser.role', '') === 'admin' && widget.devDebug;
      });

      return superLoad(req, widgets, next);
    };

    const superOutput = self.output;
    self.output = function(widget, options) {
      return superOutput(widget, options);
    };
  },
};
