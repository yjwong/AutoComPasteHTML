/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/2/13
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */

console.log("Success default.js")

// put instruction here
var txt = "This is my Instruction... hear me... hear me"
InstructionArea.append(txt)

// detects mouseenter on all windowContent
$('.windowContent').mouseenter(mouseEnter);

// detects mouseleave on all windowContent
$('.windowContent').mouseleave(mouseLeave);

// detects mouseclick on all windowContent
$('.windowContent').click(mouseLeave);