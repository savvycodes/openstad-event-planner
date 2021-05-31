exports.default = {
    extend: 'openstad-widgets',
    label: 'Events',
    beforeConstruct: function(self, options) {
      console.log('@savvycodes/openstad-events', 'beforeConstruct')
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
    construct: function(self, options) {
      console.log('@savvycodes/openstad-events', 'construct')
      const superPushAssets = self.pushAssets;
      self.pushAssets = function() {
        superPushAssets();
      };
  
      const superLoad = self.load;
      self.load = function(req, widgets, next) {
        widgets.forEach((widget) => {
          const containerId = self.apos.utils.generateId();
          widget.containerId = containerId;
          widget.cssHelperClassesString = widget.cssHelperClasses
            ? widget.cssHelperClasses.join(' ')
            : '';
        });
  
        return superLoad(req, widgets, next);
      };
  
      const superOutput = self.output;
      self.output = function(widget, options) {
        return superOutput(widget, options);
      };
    },
  };
  