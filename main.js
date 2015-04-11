var express = require('express');
var math = require("math");
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;


app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/rover.html'); 
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});    

/* dashboard */ 

io.on('connection', function(socket){
	socket.on('forward', function(){
        forward(1);
		console.log("Going Forward");
	});
	socket.on('reverse', function(){
        reverse(1);
		console.log("Going in Reverse");
	});
	socket.on('stop', function(){
        stop(1);
		console.log("Stopping");
	});
    socket.on('strafe-left', function(){
        strafeLeft(1);
        console.log("strafe-left");
    });
    socket.on('strafe-right', function(){
        strafeRight(1);
        console.log("strafe-right");
    });
    socket.on('intel-bong', function(){
        exec('mplayer -volume 50 /home/root/intel.wav', function (error, stdout, stderr) {
        // output is in stdout
        }); 
    });
});

//Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin

//front right wheel - motor number 2
var FR_PWM = new mraa.Pwm(3); 
FR_PWM.enable(true);
FR_PWM.period_us(2000);

var IN3_top = new mraa.Gpio(2); 
IN3_top.dir(mraa.DIR_OUT); 

var IN4_top = new mraa.Gpio(4); 
IN4_top.dir(mraa.DIR_OUT);

//back right wheel - motor number1
var BR_PWM = new mraa.Pwm(5); 
BR_PWM.enable(true);
BR_PWM.period_us(2000);

var IN1_top = new mraa.Gpio(7); 
IN1_top.dir(mraa.DIR_OUT); 

var IN2_top = new mraa.Gpio(8); 
IN2_top.dir(mraa.DIR_OUT);

//back left wheel - motor number 4

var BL_PWM = new mraa.Pwm(6); 
BL_PWM.enable(true);
BL_PWM.period_us(2000);

var IN1_bot = new mraa.Gpio(10); 
IN1_bot.dir(mraa.DIR_OUT); 

var IN2_bot = new mraa.Gpio(11); 
IN2_bot.dir(mraa.DIR_OUT);

//front left wheel - motor number 3

var FL_PWM = new mraa.Pwm(9); 
FL_PWM.enable(true);
FL_PWM.period_us(2000);

var IN4_bot = new mraa.Gpio(13); 
IN4_bot.dir(mraa.DIR_OUT); 

var IN3_bot = new mraa.Gpio(12); 
IN3_bot.dir(mraa.DIR_OUT);




//functions

function FR(dir,spd)
{
    var pwmvalue = spd;
     if (dir == "F")
     {

    FR_PWM.write(pwmvalue); 
    IN3_top.write(0);
    IN4_top.write(1); 
     }
    else if (dir == "B")
    {
    FR_PWM.write(pwmvalue); 
    IN3_top.write(1);
    IN4_top.write(0); 
    }
}

function forward(spd)
{
    FR("F", spd);
    FL("F", spd);
    BL("F", spd);
    BR("F", spd);
}

function reverse(spd)
{
    FR("B", spd);
    FL("B", spd);
    BL("B", spd);
    BR("B", spd);
}
function stop()
{
    FR("F", 0);
    FL("F", 0);
    BL("F", 0);
    BR("F", 0);
}

function strafeLeft(spd)
{
    
}
function strafeRight(spd)
{
    
}
//FR("F", 0.5);
//FL("F", 0.5);
//BL("F", 0.5);
//BR("F", 0.5);

//FR("F", 0);
//FL("F", 0);
//BL("F", 0);
//BR("F", 0);

//

function BR(dir,spd)
{
var pwmvalue = spd;
 if (dir == "B")
 {

BR_PWM.write(pwmvalue); 
IN1_top.write(0);
IN2_top.write(1); 
 }
else if (dir == "F")
{
BR_PWM.write(pwmvalue); 
IN1_top.write(1);
IN2_top.write(0); 
}
}

//

function FL(dir,spd)
{
var pwmvalue = spd;
 if (dir == "B")
 {

FL_PWM.write(pwmvalue); 
IN1_bot.write(0);
IN2_bot.write(1); 
 }
else if (dir == "F")
{
FL_PWM.write(pwmvalue); 
IN1_bot.write(1);
IN2_bot.write(0); 
}
}

//

function BL(dir,spd)
{
var pwmvalue = spd;
 if (dir == "F")
 {

BL_PWM.write(pwmvalue); 
IN3_bot.write(0);
IN4_bot.write(1); 
 }
else if (dir == "B")
{
BL_PWM.write(pwmvalue); 
IN3_bot.write(1);
IN4_bot.write(0); 
}
}

//FR("F",0.5), front right "forward" at 0.5 duty cycle
//FR("B",0.5), front right "backward" at 0.5 duty cycle

//actual run code...

/*function run_bot()
{
  
  
    
var ch3 = array[1] * -1.0;
var ch4 = array[0];
var ch1 = array[4];    

var br_pwm_val = ch3 - ch1 + ch4;
var fl_pwm_val = ch3 + ch1 - ch4;
var fr_pwm_val = ch3 - ch1 - ch4;
var bl_pwm_val = ch3 + ch1 + ch4;
 
var bl_dir="F";
if (bl_pwm_val >= 0)
{bl_dir = "F";}
else if (bl_pwm_val < 0)
{bl_dir = "B";}
    
var fl_dir="F";
if (fl_pwm_val >= 0)
{fl_dir = "F";}
else if (fl_pwm_val < 0)
{fl_dir = "B";}    
    
var fr_dir="F";    
if (fr_pwm_val >= 0)
{fr_dir = "F";}
else if (fr_pwm_val < 0)
{fr_dir = "B";}   
    
var br_dir="F";   
if (br_pwm_val >= 0)
{br_dir = "F";}
else if (br_pwm_val < 0)
{br_dir = "B";}
    

var fr_pwm_norm = math.abs(fr_pwm_val)/510;   
var br_pwm_norm = math.abs(br_pwm_val)/510;  
var fl_pwm_norm = math.abs(fl_pwm_val)/510;
var bl_pwm_norm = math.abs(bl_pwm_val)/510;
FR(fr_dir,fr_pwm_norm);
BR(br_dir,br_pwm_norm);
FL(fl_dir,fl_pwm_norm);
BL(bl_dir,bl_pwm_norm);  
    
//console.log(fr_dir,fr_pwm_norm, br_dir, br_pwm_norm, fl_dir, fl_pwm_norm, bl_dir,bl_pwm_norm);
    
//shoot control
    
// reload on left button

if (array[5] == 1)
{
    
    
slide.write(1); 
trigger.write(0);
mag.write(0);
co2.write(1);

}

//fire 1 on middle button
else if (array[6] == 1)
{
slide.write(1); 
trigger.write(1);
mag.write(1);
co2.write(0);
setTimeout(function()
            {
    slide.write(0); 
    trigger.write(1);
    mag.write(1);
    co2.write(0);
},500);
}

//fire 2 on right button
else if (array[7] == 1)
{
slide.write(0); 
trigger.write(1);
mag.write(1);
co2.write(0);
}
    
//active state
else if ( array[5] === 0 && array[6] === 0)
{
slide.write(1); 
trigger.write(0);
mag.write(1);
co2.write(0);
}
    
    
}
*/