app.beginUndoGroup("Text Mods");

var fonts = app.fonts.allFonts;
main(fonts);

app.endUndoGroup();


function main(fonts) {
var layer = app.project.activeItem.layer(1);

var textProp = layer.property("ADBE Text Properties");
var textDocument = textProp.property("ADBE Text Document").value;

var textReference = textDocument.toString(); // pure string/text
var textReferenceArray = textDocument.toString().split(" "); // text in array form
var startIndicies = []; // the index of each word in the whole string
var endIndicies = []; // the index of each word in the whole string
var currentIndex = 0;

for(var t = 0; t < textReferenceArray.length; t++) {
    startIndicies.push(textReference.indexOf(textReferenceArray[t], currentIndex));
    
    currentIndex = startIndicies[startIndicies.length-1] + textReferenceArray[t].length;
    
    if(t+1) {
        endIndicies.push(textReference.indexOf(textReferenceArray[t+1], currentIndex));
        } else { // last item handler
        endIndicies.push(textReference.length);
            }
    }


$.writeln(startIndicies);
$.writeln(endIndicies);

for(var s = 0; s < startIndicies.length; s++) {
var range = textDocument.characterRange(startIndicies[s], endIndicies[s])

//$.writeln(rangeOne.text)
range.fillColor = [Math.random(), Math.random(), Math.random()];
var fontStyles = fonts[Math.floor(Math.random() * fonts.length)];
var font = fontStyles[Math.floor(Math.random() * fontStyles.length)];
try {
range.font = font;
} catch(e) {
    
    }
//range.text = "I will";
layer.property("ADBE Text Properties").property("ADBE Text Document").setValue(textDocument)
}

}