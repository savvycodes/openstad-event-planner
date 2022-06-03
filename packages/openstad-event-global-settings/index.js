module.exports = {
  improve: 'apostrophe-global',
  construct: function (self, options, callback) {
    options.addFields = [].concat(options.addFields || []);

    const themesIndex = options.addFields.findIndex(function (field) {
      return field.name === 'themes';
    });

    if (themesIndex !== -1) {
      const themes = options.addFields[themesIndex];

      themes.schema.unshift(
        {
          type: 'string',
          name: 'label',
          label: 'Events: Label (used as filter title)',
        },
        {
          type: 'string',
          name: 'formLabel',
          label: 'Events: Form label (used as label in forms)',
        }
      );
    }

    callback(null);
  },
};
