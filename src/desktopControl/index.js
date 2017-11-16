var robot = require("robotjs");

module.exports = {

    processKeyboardCommand: function (command){
        console.log(command);
        robot.keyTap(command);
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
            case 'Notepad':
                robot.keyTap(command);
                break;
            case 'Code':
                robot.keyTap(command);
                break;
            case 'Chrome':
                robot.keyTap(command);
            break;
        }
    },

}




