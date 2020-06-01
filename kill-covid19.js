var PlayerX=0;
var ToMove=30;



var Shooted=false;
var BulletY=-10;
var BulletX=10;
var GameOver=true;
var Score=0;
var VirusMovingSpeed=1;
var ContinuouslyMove=false;
var ToMoveContinuously=1;
var HighScore=0;
var CollisionDetectorX;

var deg=0;
var Time=1;
var Comments=["Nice Try!","Goood!!","Superb!!","Impressive!!","Awesome!!","Maginificent!!","Extreme!!","Glorious!!","Outstanding!!","Mind-blowing!!"];
function MoveRight()
{
    
    ContinuouslyMove=true;
    ToMoveContinuously=1;

      

}
function MoveLeft()
{

    ContinuouslyMove=true;
    ToMoveContinuously=-1;   
}

function BodyLoaded()
{
    $("#MainMenu").fadeToggle(300);
    $("#L_Parent").hide();
    clearInterval(int1);
    
}



function Move(Amount) 
{
    var Player=document.getElementById("Player");
    var CollisionDetector=parseInt($("#CollisionDetector").css("left"));
    console.log(CollisionDetector);
    
    PlayerX+=Amount;
    Player.style.left=PlayerX;
    document.getElementById("CollisionDetector").style.left=CollisionDetector+Amount;
    BulletX+=Amount;
    if(!Shooted)
        {
            document.getElementById("Bullet").style.left=BulletX;
        }
    
}
function Shoot()
{
    if(!GameOver)
       $("#Bullet").show();
    Shooted=true;
}



function ToggleBullet()
{
    if(!Shooted)
        return;
    var Bullet=document.getElementById("Bullet");
    BulletY-=8;
    Bullet.style.top=BulletY;
    if(!Shooted)
        {
            Bullet.style.left=BulletX;
        }
    if(BulletY<=-window.innerHeight-30)
        {
            BulletY=-25;
            Bullet.style.top=BulletY;
            Bullet.style.left=BulletX;
            Shooted=false;
            $(Bullet).hide();
        }
    
    
}
function setRandomVirusPosition()
{
    var virus=document.getElementsByClassName("virus");
    for(var i=0;i<virus.length;i++)
        {
            var width=parseInt($(virus[i]).attr("width"));
            // var height=parseInt($(virus[i]).attr("height"));
            $(virus[i]).css("left",RangedRandomNumberGenerator(30,document.getElementById("PlaygroundParent").offsetWidth-width));
            do
               $(virus[i]).css("top",RangedRandomNumberGenerator(-window.innerHeight-170,-40));
            while((VirusCollidingY(i)));
        }
}

function RangedRandomNumberGenerator(Min,Max)
{
    return Math.floor(Math.random()*(Max-Min+1))+Min;
}

function MoveVirus()
{
    
    if(GameOver)
        return;
    var virus=document.getElementsByClassName("virus");
    var PosY;
    for(var i=0;i<virus.length;i++)
        {
            PosY=parseInt($(virus[i]).css("top"));
            if(PosY>=window.innerHeight+20)
                {
                    var width=parseInt($(virus[i]).attr("width"));
                    // var height=parseInt($(virus[i]).attr("height"));
                    $(virus[i]).show();
                    $(virus[i]).css("left",RangedRandomNumberGenerator(30,document.getElementById("PlaygroundParent").offsetWidth-width));
                    do
                        $(virus[i]).css("top",RangedRandomNumberGenerator(-window.innerHeight-170,-40));
                    while((VirusCollidingY(i)));
                    continue;
                }
            virus[i].style.top=PosY+VirusMovingSpeed;
        }
    }

function VirusCollidingY(index)
{
    var virus=document.getElementsByClassName("virus");
    for(var i=0;i<virus.length;i++)
        {
            if(i==index)
                continue;
            var height=parseInt($(virus[index]).attr("height"));
            console.log(height);
            
            var PosY=parseFloat($(virus[index]).css("top"));
            var _height=parseInt($(virus[i]).attr("height"));
            var _yPos=parseFloat($(virus[i]).css("top"));
            if(PosY<_yPos+_height  &&  PosY+height>_yPos)
                return true;

        }
        return false;
 }




function PlayNow()
{
    $("#PlaygroundParent").show();
    $("#MainMenu").hide();
    AddEventListeners();
    setRandomVirusPosition();

    GameOver=false;
}

function Load()
{
    if(deg==0)
        {
            Time++;
            if(Time>35)
                {
                    Time=0;
                }
            else
                {
                    return;
                }
            
        }
    var LoadingBar=document.getElementById("Load");
    LoadingBar.style.transform="rotate("+deg+"deg)";
    LoadingBar.style.webkitTransform="rotate("+deg+"deg)";
   // LoadingBar.style.mozTransform="rotate("+deg+"deg)";
    deg+=2;
    if(deg>=360)
        {
            deg=0;
            
        }
    if(deg==100)
        {
            LoadingBar.style.borderBottomColor="#74678A";
           
        }
    if(deg==50)
        {
            
            LoadingBar.style.borderRightColor="#74678A";
        }
    if(deg==200)
        {
            
        }
    if(deg==320)
        {
            LoadingBar.style.borderBottomColor="#fff";

           /// LoadingBar.style.borderRightColor="#1D1D1D";
        }
    if(deg==330)
        {
         //   LoadingBar.style.borderBottomColor="#1D1D1D";

            LoadingBar.style.borderRightColor="#fff";
        }
 

}

function DestroyVirus()
{
    if(!Shooted)
        return;
    var Virus=document.getElementsByClassName("virus");
    var BulletElement=document.getElementById("Bullet");
    for(var i=0;i<Virus.length;i++)
        {
                        
        
              var  vx=Virus[i].offsetLeft;
              var  vy=Virus[i].offsetTop;
              var  vh=Virus[i].offsetHeight;
              var  vw=Virus[i].offsetWidth;
            


            var Bullet=
            {
            
                 x:BulletElement.offsetLeft +document.getElementById("PlayerParent").offsetLeft,
                 y:BulletElement.offsetTop +document.getElementById("PlayerParent").offsetTop,
                 h:BulletElement.offsetHeight,
                 w:BulletElement.offsetWidth,
            }
            


            if(Bullet.x < vx + vw &&
               Bullet.x + Bullet.w > vx &&
               
               Bullet.y < vy + vh &&
               Bullet.y + Bullet.h > vy)
               {
                   $(Virus[i]).hide();
                   BulletY=-25;
                   document.getElementById("Bullet").style.top=BulletY;
                   document.getElementById("Bullet").style.left=BulletX;
                   Shooted=false;
                   $("#Bullet").hide();
                   AddScore(10);

                   
                   

               }



        }
}


function AddScore(ToAdd)
{
    Score+=ToAdd;
    document.getElementById("Score").innerHTML="Score: "+ Score;
    
}

function DestroyPlayer()
{
    if(GameOver)
        return;
    var CollisionDetector= document.getElementById("CollisionDetector");
    var Virus=document.getElementsByClassName("virus");
    for(var i=0;i<Virus.length;i++)
        {
            var Player=
            {
                x:CollisionDetector.offsetLeft+document.getElementById("PlayerParent").offsetLeft,
                y:CollisionDetector.offsetTop+document.getElementById("PlayerParent").offsetTop,
                w:CollisionDetector.offsetWidth,
                h:CollisionDetector.offsetHeight
            }


            var CurrentVirus=
            {
                x:Virus[i].offsetLeft,
                y:Virus[i].offsetTop,
                w:Virus[i].offsetWidth,
                h:Virus[i].offsetHeight
            }



            if(Player.x < CurrentVirus.x + CurrentVirus.w &&
               Player.x + Player.w > CurrentVirus.x &&
               
               Player.y < CurrentVirus.y + CurrentVirus.h &&
               Player.y + Player.h > CurrentVirus.y)
               {               
                   GameOver=true;
                   setTimeout(Gameover,100);
               }
        }

}






function AddEventListeners()
{
    CollisionDetectorX=parseInt($("#CollisionDetector").css("left"));
    document.getElementById("Left").addEventListener("mousedown",MoveLeft);
    document.getElementById("Right").addEventListener("mousedown",MoveRight);
    document.getElementById("Left").addEventListener("mouseup",StopMovingContinuously);
    document.getElementById("Right").addEventListener("mouseup",StopMovingContinuously);



    //For Android devices...

    document.getElementById("Left").addEventListener("touchstart",MoveLeft)
    document.getElementById("Right").addEventListener("touchstart",MoveRight)
    document.getElementById("Left").addEventListener("touchend",StopMovingContinuously);
    document.getElementById("Right").addEventListener("touchend",StopMovingContinuously);




    document.getElementById("Restart").addEventListener("click",Restart);
}
function MoveContinuously()
{
    if(!ContinuouslyMove)
        return;
    var Player=document.getElementById("Player");
    var PlayerParent=document.getElementById("PlayerParent");
    if(Player.offsetLeft+PlayerParent.offsetLeft>=window.innerWidth-Player.getAttribute("width") && ToMoveContinuously==1)
        return;
    if(Player.offsetLeft+PlayerParent.offsetLeft<=0  && ToMoveContinuously==-1)
        return;
    Move(ToMoveContinuously);

}
function StopMovingContinuously()
{
    ContinuouslyMove=false;
}



function Gameover()
{
    document.getElementById("Comment").innerHTML=Comments[Math.floor(Score/100)];
    document.getElementById("MessageParent").style.background="rgba(0,0,0,0.6)";
      var mesg= document.getElementById("Message");
      mesg.style.top="0";
      mesg.style.bottom="0";
    
    $("#Bullet").hide();
    var Virus=document.getElementsByClassName("virus");
    $("#Player").hide();

   document.getElementById("ScoreText").innerHTML="Score : "+Score;

    if(Score>HighScore)
        HighScore=Score;
    document.getElementById("HighScore").innerHTML="Personal Best : "+HighScore;
    for(var i=0;i<Virus.length;i++)
        {
            Virus[i].style.display="none";
        }

}

function Restart()
{
    
    PlayerX=0;
    ToMove=30;
    Shooted=false;
    BulletY=-25;
    BulletX=17;
    GameOver=false;
    Score=0;
    VirusMovingSpeed=2;
    ContinuouslyMove=false;
    ToMoveContinuously=1;


    document.getElementById("Player").style.left="0";
     var bull =document.getElementById("Bullet")
     bull.style.left=BulletX;
     bull.style.top=BulletY
    $("#Player").show();
    $("#Bullet").show();
    var msg=document.getElementById("Message")
    msg.style.top="-500";
    msg.style.bottom="";
    document.getElementById("MessageParent").style.background="rgba(0,0,0,0)";
    document.getElementById('CollisionDetector').style.left=CollisionDetectorX;
    document.getElementById("Score").innerHTML="Score : "+Score;

}



setInterval(MoveVirus,3);
setInterval(ToggleBullet,1);
setInterval(DestroyVirus,1);
setInterval(DestroyPlayer,1);
var int1=setInterval(Load,4);
setInterval(MoveContinuously,2);