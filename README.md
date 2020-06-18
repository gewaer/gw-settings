# Gewaer Settings Component

Gewaer Settings Component comprises the settings part for the [Gewaer Frontend Kanvas](https://github.com/gewaer/frontend-canvas) application.

This includes:
* User Settings
* Company Settings
* App Settings
* Companies Manager

## Usage

```shell
npm install @gewaer/gw-settings --save
```

## Documentation

This component is not implemented directly like the others. Instead, routes leading to the components are included as part of the routes for the Frontend Kanvas.

**Note:** _If you haven't read the documentation for the Frontend Kanvas, this part will be strange to you._

```javascript
const { GwSettingsRoutes } = require(`./import.${process.env.VUE_APP_IMPORTS}`);

// At some point of the router implementation:

router.addRoutes(GwSettingsRoutes);
```

## Future

It is possible this implementation will change in a near future. For now this works.

# License

Gewaer Settings Component is open-sourced software licensed under the MIT license.
