# Arduino Voice Controller

## Arduino Setup
1. Follow the instructions for your setup the firmware of your board at [johnny-five].
2. Connect the Arduino to the PC using a usb cable.

## Server Install

```
npm i
node index.js
```

Now you can open the page at http://localhost:3000/

## rooms
* mi cuarto
* cocina
* baño

## Actions
* enciende
* apaga

## Devices
* luz

## Syntaxis
```
<action> <device> <room>
```

## Examples
* enciende la luz de mi cuarto
* enciende la luz del baño
* apaga la luz de la cocina


## License
[MIT]

[Web Speech Api]: <https://github.com/mdn/web-speech-api/>
[johnny-five]: <http://johnny-five.io/>
[MIT]: License
