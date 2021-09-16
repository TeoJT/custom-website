var starbits = Number(getCookie("starbits"));
var difficulty = 1;
var dailySubAmount = 0;
var changesMade = false;
var previousReward = 20;

window.onload = function() {
    difficulty = Number(getCookie("difficulty"));
    previousReward = Number(getCookie("prevReward"));
    setDifficulty();
    applyDailySub();
    updateStarbits();
}

//Just a test function, when I got started with Javascript, Imma leave it here.
function hai(){  
    alert("Haiiiiiiiiii!");  
}




function updateStarbits() {
    document.getElementById("starbits").innerHTML = starbits+" ";
    if (starbits < 0) {
        document.querySelector("img.pixelated").setAttribute("src", "../assets/unfilledstarbit.png");
        document.getElementById("starbitPanel").setAttribute("style", "align-content:center; animation-name: panelWarning; animation-duration: 4s; animation-iteration-count: infinite; animation-timing-function: linear;");


        var a = document.querySelectorAll(".redAlert");
        for (i = 0; i < a.length; i++) {
            a[i].style.display = "inline-block";
        }


    }
    else {
        document.querySelector("img.pixelated").setAttribute("src", "../assets/starbit.png");
        document.getElementById("starbitPanel").setAttribute("style", "");


        var a = document.querySelectorAll(".redAlert");
        for (i = 0; i < a.length; i++) {
            a[i].style.display = "none";
        }
    }

    //Part where we update the bonus info, showing how much more starbits we need for the weekend.
    //dailySubAmount

    var e = document.querySelectorAll(".bonusInfoText");

    for (i = 0; i < e.length; i++) {
    
        var today = new Date().getDay();
        if (today == 0)
            today = 7;

        var weekDeduction = (7-today)*dailySubAmount;
        var remaining = weekDeduction-starbits;



        if (today == 6 || today == 7) {
            if (remaining < 1) {
                e[i].innerHTML = ("Have fun :P");
            }
            else {
                e[i].innerHTML = ("Oof. Weekend work. Just "+remaining+"✦ to go...");
            }
        }
        else {
            if (remaining < 1) {
                e[i].innerHTML = ("✦ Congrats! You're all set for the weekend ;) ✦");
            }
            else {
                e[i].innerHTML = ("Need "+remaining+"✦ for a weekend off!");
            }
        }

    }
    

    updatePrevReward();
}



function showBonus() {
    if (difficulty != 1) {
        document.querySelector("section>div.bonusInfo").style.display = "inline";
    }
}


function dailySub() {
    starbits -= 50;
    if (starbits >= 0) {
        alert("BOOM! You've now got "+starbits+" starbits.\nKeep working hard!");
    }
    else {
        alert("BOOM!\n\nYou're negative now!\nYou're in trouble!\n\nGet studying quickly!");
    }
    setCookie("starbits", starbits, 365);
}



function addStarbits() {
    var amount = Number(prompt("How much starbits you want to add?", ""));
    
    if (amount != null) {
        if (Number.isInteger(amount)) {
            if (confirm("You sure?")) {
                starbits += Number(amount);
                previousReward = Number(amount);
                setCookie("starbits", String(starbits), 365);
                setCookie("prevReward", String(previousReward), 1);
                alert("Nice!\n\nYou've now got "+starbits+" starbits.\n\nKeep working hard!");
                
                updateStarbits();
                showBonus();
            }
            else {
                alert("Yikes.");
            }
        }
        else {
            alert("Yikes try that again...");
        }
    }
}




var overlayMenu = document.querySelector("div.overlay.menu");
var overlayBackground = document.querySelector("div.overlay.background");

overlayMenu.addEventListener("webkitAnimationEnd", displayNoneOptions);
overlayMenu.addEventListener("animationend", displayNoneOptions);



document.querySelector("div.overlay.background").onclick = function() {hideOptions();}

function showOptions() {
    document.querySelector("div.overlay.background").setAttribute("style", "display:initial; animation-name: backgroundAppear;");
    document.querySelector("div.overlay.menu").setAttribute("style", "display:initial; animation-name: menuAppear;");
}

function hideOptions() {
    document.querySelector("div.overlay.background").setAttribute("style", "display:initial; animation-name: backgroundDisappear;");
    document.querySelector("div.overlay.menu").setAttribute("style", "display:initial; animation-name: menuDisappear;");

    if (changesMade) {
        setCookie("difficulty", difficulty, 365);
        changesMade = false;
    }
}

function displayNoneOptions() {
    if (overlayMenu.getAttribute("style") == "display:initial; animation-name: menuDisappear;") {
        document.querySelector("div.overlay.background").setAttribute("style", "display:none;");
        document.querySelector("div.overlay.menu").setAttribute("style", "display:none;");
    }

}


    


function applyDailySub() {
    const deduction = checkLastSub()*dailySubAmount;
    if (deduction > 0) {
        starbits -= deduction;

        if (starbits >= 0) {
            alert("DAILY SUB!\nBOOM! You've now got "+starbits+" starbits.\nKeep working hard!");
        }
        else {
            alert("DAILY SUB!\nBOOM!\n\nYou're negative now!\nYou're in trouble!\n\nGet studying quickly!");
        }
        setCookie("starbits", starbits, 365);
        updateStarbits();
        showBonus();

    }
    var day = new Date();
    setCookie("lastDate", day.getDate(), 365);
}



function checkLastSub() {
    var day = new Date();

    var day = new Date();
    var today = day.getDate();
    var lastDate = Number(getCookie("lastDate"));

    if (lastDate == 0) {
        console.log("NOTE: Local files cannot store cookies, therefore days since last sub is 0 for now.");
        return 0;
    }

    var daysInMonth = new Array(1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1);

    var daysSince = 0;
    if (today > lastDate) {
        daysSince = today-lastDate;
    }
    else if (today < lastDate) {
        
        //Get the days since the last month
        lastMonth = day.getMonth()+1;

        if (lastMonth == 0) { //If the last month is 0, it means today is January
            lastMonth = 12;   //and last month was December.
        }

        daysSince = today-lastDate+Number(daysInMonth[lastMonth-1]);

        //Month is March, following Febuary.
        if (lastMonth == 2) {
            daysSince += 28;
            //Leap year.
            if (day.getFullYear()%4 == 0) {
                daysSince++;
            }
        }
        else {
            daysSince += 30;
        }
    }

    return daysSince;

}



function setDifficulty() {
    
    document.getElementById("intensity1").style.backgroundColor = "black";
    document.getElementById("intensity2").style.backgroundColor = "black";
    document.getElementById("intensity3").style.backgroundColor = "black";

    changesMade = true;

    var e = document.querySelectorAll("div.bonusInfo");
    for (i = 0; i < e.length; i++) {
        e[i].style.display = "initial";
    }


    var selectedColor = "rgb(0,0,80)";
    switch (difficulty) {
        case 1:
            document.getElementById("intensity1").style.backgroundColor = selectedColor;
            document.getElementById("workDescription").innerHTML = "15✦/per day.<br>For when you don't have any work to do, though that doesn't mean you should do nothing! Continue to learn new things during the holidays to earn starbits!";
            dailySubAmount = 15;


            var e = document.querySelectorAll("div.bonusInfo");
            for (i = 0; i < e.length; i++) {
                e[i].style.display = "none";
            }

            break;
        case 2:
            document.getElementById("intensity2").style.backgroundColor = selectedColor;
            document.getElementById("workDescription").innerHTML = "35✦/per day.<br>For when university is still on but you've got no upcoming deadlines or you're on good track. You may chill for some time uwu.";
            dailySubAmount = 35;
            break;
        case 3:
            document.getElementById("intensity3").style.backgroundColor = selectedColor;
            document.getElementById("workDescription").innerHTML = "50✦/per day.<br>The good ol' default for when you need to do stuff or have upcoming tests and deadlines! You can still have chill time but make sure not to fall behind!";
            dailySubAmount = 50;
            break;
    }
    
    updateStarbits();
}





function undoReward() {
    if (confirm("You sure?")) {
        starbits -= Number(previousReward);
        previousReward = 0;
        setCookie("prevReward", "0", 1);
        setCookie("starbits", String(starbits), 365);
        updateStarbits();
        hideOptions();
    }
}


function updatePrevReward() {
    if (previousReward == 0) {
        document.querySelector("div#undoReward").style.display = "none";
    }
    else {
        document.querySelector("div#undoReward").style.display = "inline";
        document.getElementById("previousReward").innerHTML = String(previousReward);
    }
    
}








function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var t = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = t;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }




