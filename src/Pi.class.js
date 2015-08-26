var wpi = require('wiring-pi');

function Pi() {}

Pi.RED = 'red';
Pi.BLUE = 'blue';

Pi.PRESS_BLUE_PIN = 7;
Pi.PRESS_RED_PIN = 0;
Pi.PRESS_START_PIN = 0;

Pi.instance = undefined;

Pi.getInstance = function() {
  if (Pi.instance !== undefined) {
    Pi.instance = new Pi();
    Pi.instance.init();
  }
  return Pi.instance;
};

Pi.prototype.init = function() {
  wpi.setup('wpi');
	
  //three output pins
  wpi.pinMode(Pi.PRESS_BLUE_PIN, wpi.OUTPUT); //pin 7
  wpi.pinMode(Pi.PRESS_RED_PIN, wpi.OUTPUT); //pin 11
  wpi.pinMode(Pi.PRESS_START_PIN, wpi.OUTPUT); //pin 12
	
  //wpi.pinMode(2, wpi.INPUT); //pin 13
  //wpi.pinMode(3, wpi.INPUT); //pin 15
};

Pi.prototype.press = function(pin) {
  wpi.digitalWrite(pin, wpi.HIGH);
  setTimeout(function() {
  	  wpi.digitalWrite(pin, wpi.LOW);
  }, 50);
};

Pi.prototype.watch = function() {
};

module.exports = Pi;