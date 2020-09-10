// This is the same code from the inputs-log folder, just arranged to highlight
// keys on a CSS piano.


var keyMapping = {
    // 0
    21: 'key_A0',
    22: 'key_AB0',
    23: 'key_B0',
    // 1
    24: 'key_C1',
    25: 'key_CD1',
    26: 'key_D1',
    27: 'key_DE1',
    28: 'key_E1',
    29: 'key_F1',
    30: 'key_FG1',
    31: 'key_G1',
    32: 'key_GA1',
    33: 'key_A1',
    34: 'key_AB1',
    35: 'key_B1',
    // 2
    36: 'key_C2',
    37: 'key_CD2',
    38: 'key_D2',
    39: 'key_DE2',
    40: 'key_E2',
    41: 'key_F2',
    42: 'key_FG2',
    43: 'key_G2',
    44: 'key_GA2',
    45: 'key_A2',
    46: 'key_AB2',
    47: 'key_B2',
    // 3
    48: 'key_C3',
    49: 'key_CD3',
    50: 'key_D3',
    51: 'key_DE3',
    52: 'key_E3',
    53: 'key_F3',
    54: 'key_FG3',
    55: 'key_G3',
    56: 'key_GA3',
    57: 'key_A3',
    58: 'key_AB3',
    59: 'key_B3',
    // 4
    60: 'key_C4',
    61: 'key_CD4',
    62: 'key_D4',
    63: 'key_DE4',
    64: 'key_E4',
    65: 'key_F4',
    66: 'key_FG4',
    67: 'key_G4',
    68: 'key_GA4',
    69: 'key_A4',
    70: 'key_AB4',
    71: 'key_B4',
    // 5
    72: 'key_C5',
    73: 'key_CD5',
    74: 'key_D5',
    75: 'key_DE5',
    76: 'key_E5',
    77: 'key_F5',
    78: 'key_FG5',
    79: 'key_G5',
    80: 'key_GA5',
    81: 'key_A5',
    82: 'key_AB5',
    83: 'key_B5',
    // 6
    84: 'key_C6',
    85: 'key_CD6',
    86: 'key_D6',
    87: 'key_DE6',
    88: 'key_E6',
    89: 'key_F6',
    90: 'key_FG6',
    91: 'key_G6',
    92: 'key_GA6',
    93: 'key_A6',
    94: 'key_AB6',
    95: 'key_B6',
    // 7
    96: 'key_C7',
    97: 'key_CD7',
    98: 'key_D7',
    99: 'key_DE7',
    100: 'key_E7',
    101: 'key_F7',
    102: 'key_FG7',
    103: 'key_G7',
    104: 'key_GA7',
    105: 'key_A7',
    106: 'key_AB7',
    107: 'key_B7',
    // 8
    108: 'key_C8'
}

var pedalMapping = {
    64: 'pedal_right'
}


function initPianoInput(app) {

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
    console.log(data)
      let channel = data[0]; // Channel/Type of message
      let value = data.hasOwnProperty('1') ? data[1] : null; // Incoming value (note id or controller value)
      let velocity = data.hasOwnProperty('2') ? data[2] : null; // Velocity 0-127 (speed of the pressed key)
    
      
        console.log(value);
        console.log(channel);
      // Let's highlight piano notes
      switch (channel){
  
        // If message channel is 144 it's a "note on" message
        case 144:
            var key = app.root.findByName(`bone.${keyMapping[value]}`);
          // Some MIDI devices instead of sending a "note off", send a note on but
          // with velocity 0, so let's check it first.
          if (velocity === 0) {
            key.rotateLocal(-5, 0, 0);
        } else {
            key.rotateLocal(5, 0, 0);
          }
          break;
  
        // If message channel is 128 it's a "note off" message
        case 128:
            var key = app.root.findByName(`bone.${keyMapping[value]}`);

          key.rotateLocal(-5, 0, 0);
          break;
          
        // Sustain pedal
        case 176:
            var pedal = app.root.findByName(`bone.${pedalMapping[value]}`);
            if (velocity === 0) {
                pedal.rotateLocal(-5, 0, 0);
            } else {
                pedal.rotateLocal(5, 0, 0);    
            }
          break;

      }
      
    }
  }

};