var wpi = require('wiring-pi');

function Pi() {}

Pi.BLUE_VICTORY_PIN = 2;
Pi.RED_VICTORY_PIN = 3;

Pi.PRESS_BLUE_PIN = 7;
Pi.PRESS_RED_PIN = 0;
Pi.PRESS_START_PIN = 1;

Pi.instance = undefined;

Pi.getInstance = function() {
  if (Pi.instance === undefined) {
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
  
  wpi.pinMode(Pi.BLUE_VICTORY_PIN, wpi.INPUT); //pin 13
  wpi.pinMode(Pi.RED_VICTORY_PIN, wpi.INPUT); //pin 15
};

Pi.prototype.press = function(pin) {
  wpi.digitalWrite(pin, wpi.LOW);
  setTimeout(function() {
  	  wpi.digitalWrite(pin, wpi.HIGH);
  }, 500);
};

Pi.prototype.watch = function(pin) {
  setInterval(function() {
	var value = wpi.digitalRead(pin);
	console.info(value);
  }, 500);
};

module.exports = Pi;
