

// request MIDI access
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(midiSuccess, midiFailure);
} else {
  alert("Sorry, your browser does not support the MIDI Web API, try with Chrome.");
}


// MIDI initialization Failed
function midiFailure(e) {
  console.log("Your browser lacks access to MIDI devices or does not support the MIDI Web API.");
}


// MIDI initialization Success
// "midiAccess" here contains all our MIDI inputs and outputs
function midiSuccess(midiAccess) {
  let inputs = midiAccess.inputs.values();
  // Loop over all available inputs and listen for any MIDI input.
  // Every time we call "inputs.next()" it will switch to the next available MIDI device.
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      // on every incoming midi message, call the handleMessage function passing that message.
      input.value.onmidimessage = handleMessage;
  }
}


// Handle incoming midi messages
function handleMessage(message) {
  let data = message.data; // Actual MIDI message data.
  if (data[0] !== 254) { // Ignore the "254" message, it's like a repeating "keep alive" message.

    let channel = data[0]; // Channel/Type of message
    let value = data.hasOwnProperty('1') ? data[1] : null; // Incoming value (note id or controller value)
    let velocity = data.hasOwnProperty('2') ? data[2] : null; // Velocity 0-127 (speed of the pressed key)
    
    // Let's just append a new string to the HTML body
    let logItem = document.createElement('li');
    logItem.innerHTML = `[${channel}, ${value}, ${velocity}]`;
    document.getElementById('midi-event-log').appendChild(logItem);
  }
}