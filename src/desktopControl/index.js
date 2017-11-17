var robot = require("robotjs");

module.exports = {

    processKeyboardCommand: function (command){
        console.log(command);
        robot.keyTap(command);
    },

    processTextCommand: function (textCommand){
        console.log(textCommand);
        robot.typeString(textCommand);
    },

    processMouseCommand: function(){
        // Speed up the mouse.
        robot.setMouseDelay(4);
        
        var twoPI = Math.PI * 2.0;
        var screenSize = robot.getScreenSize();
        var height = (screenSize.height / 2) - 10;
        var width = screenSize.width;

        for (var x = 0; x < width; x++) {
            let y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x, y);
        }
    },

    processRunCommand: function (command){
        
        switch(command){
            case 'notepad':
                robot.keyTap('r', ['command']);
                robot.typeString('notepad');
                robot.keyTap('enter');
                break;
            case 'paint':
                robot.keyTap('r', ['command']);
                robot.typeString('mspaint');
                robot.keyTap('enter');
                break;
            case 'chrome':
                robot.keyTap('r', ['command']);
                robot.typeString('chrome');
                robot.keyTap('enter');
                break;
            case 'shell':
                robot.keyTap('r', ['command']);
                robot.typeString('cmd');
                robot.keyTap('enter');
                break;
        }
    },

}




