
// This piano.js file will only generate the div
// structure of the piano, creating every white and black
// note with a "note-XX" class where "XX" is the MIDI note number
// so we can use that class in the script.js file to highlight each note.

// Since i'm lazy, to create the black keys i counted from the left side of
// a piano when a black key is present in an octave (an octave have 12 keys),
// and i created that "blackKeysIndex" array with those "indexes".
// A full lenght piano has 88 keys, starting from the MIDI note 21 to the 
// MIDI note 108.
// Then, every 2, 5, 7, 10 and 12 keys inside that loop, i apply the "black" class.

var piano = document.getElementById('piano');
let blackKeysIndex = [2, 5, 7, 10, 12]
var index = 1;

for (let note = 21; note <= 108; note++) {
  let keyDiv = document.createElement('div');
  keyDiv.classList.add('note-' + note);
  keyDiv.classList.add("key");

  if (blackKeysIndex.includes(index)) {
    keyDiv.classList.add("black");
  } else {
    keyDiv.classList.add("white");
  }
  piano.appendChild(keyDiv);

  if (index === 12) {
    index = 1;
  } else {
    index = index + 1;
  }
}