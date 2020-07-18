navigator.requestMIDIAccess()
  .then(function(MIDIaccess) {
    console.log(MIDIaccess);
     // Get lists of available MIDI controllers
     const inputs = MIDIaccess.inputs.values();
     const outputs = MIDIaccess.outputs.values();

    console.log(inputs);
     MIDIaccess.onstatechange = function(e) {

       // Print information about the (dis)connected MIDI controller
       console.log(e);
       console.log(e.port.name, e.port.manufacturer, e.port.state);
     };
  });