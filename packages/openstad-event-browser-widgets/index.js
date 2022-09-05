const get = require('lodash.get');

module.exports = {
  extend: 'openstad-widgets',
  label: 'Evenementen overzicht',
  playerData: ['_id', 'config'],
  minify: false,

  /**
   * @todo: Add useful fields
   */
  beforeConstruct: function (self, options) {
    options.addFields = [
      {
        type: 'string',
        name: 'mapTileUrl',
        label: 'Map tile url',
        htmlHelp:
          'This allows you to use the Mapbox Static Tiles API to customize the look of the map. Defaults to: <code>https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png</code>',
        def: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
      {
        type: 'string',
        name: 'mapAccessToken',
        label: 'Map accessToken',
        help: 'When your tile url requires an access token',
      },
      {
        type: 'string',
        name: 'mapId',
        label: 'Style id',
        htmlHelp: `<p>Required when using Mapbox, for example: <code>{username}/{styleId}</code></p>. This is your custom style id`,
      },
      {
        type: 'string',
        name: 'base',
        label: 'Base',
      },
      {
        type: 'string',
        name: 'slug',
        label: 'Slug',
      },
      {
        type: 'string',
        name: 'providerPageUrl',
        label: 'Provider page url',
        htmlHelp: `URL to the page where providers create events`,
      },
      {
        type: 'boolean',
        name: 'devDebug',
        label: 'Enable debug',
        def: false,
      },
    ].concat(options.addFields || []);
    options.arrangeFields = [
      {
        name: 'map',
        label: 'Map',
        fields: [
          'mapTileUrl',
          'mapAccessToken',
          'mapId',
          'base',
          'slug',
          'providerPageUrl',
        ],
      },
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
  construct: function (self, options) {
    const superLoad = self.load;
    self.load = function (req, widgets, next) {
      widgets.forEach((widget) => {

        const containerId = self.apos.utils.generateId();
        const prefixUrl = `${req.sitePrefix ? '/' + req.sitePrefix : ''}`;
        const baseUrl = (widget.base ? widget.base : '');
        const slug = widget.slug ? widget.slug : '';

        widget.containerId = containerId;
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
          map: {
            accessToken: widget.mapAccessToken || null,
            tileUrl: widget.mapTileUrl || null,
            id: widget.mapId || null,
          },
          themes: req.data.global.themes,
          areas: req.data.global.areas,
          base: baseUrl,
          slug: slug,
          prefixUrl: prefixUrl,
          providerPageUrl: widget.providerPageUrl,
        };

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

        widget.isDebug =
          get(req, 'data.openstadUser.role', '') === 'admin' && widget.devDebug;
      });

      return superLoad(req, widgets, next);
    };

    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('script', 'always', { when: 'always' });
    };
  },
};
