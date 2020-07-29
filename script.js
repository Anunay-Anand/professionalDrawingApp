$(function () {
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });

    //Declare variables

    //Paint erasing or Not
    var paint = false;

    //Painting or Erasing
    var paint_erase = "paint";

    //Get the canvas and its context i.e the mov over canvas by user
    var canvas = document.getElementById('paint');
    var ctx = canvas.getContext('2d');

    //Get the canvas container 
    var container = $("#container");

    //Mouse position or coordinates of Mouse default (Associative Array)
    var mouse = {
        x: 0,
        y: 0
    };

    //Onload any saved work from local storage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);   
        };
        img.src = localStorage.getItem("imgCanvas");
    }

    //Set drawing paramters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //click inside container
    container.mousedown(function (e) {
        //To start painting
        paint = true;
        //To start the path
        ctx.beginPath();

        //Mouse pointer location
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });

    //Move the mouse while holding mousekey
    container.mousemove(function (e) {
        //Mouse pointer location
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            if (paint_erase == "paint") {
                //Get colour input 
                ctx.strokeStyle = "red";
            } else {
                //White colour
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });


    //mouse up->we are not paintingerasing anymore
    container.mouseup(function () {
        paint = false;
    });

    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function () {
        paint = false;
    });

    //click on the reset button
    $("#reset").click(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button
    $("#save").click(function () {
        if (typeof (localStorage) != null) {
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        } else {
            window.alert("Your browser does not support local storage!");
        }
    });
    //click on the erase button
    $("#erase").click(function () {
        if (paint_erase == "paint") {
            paint_erase = "erase";
        } else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //change color input
    $("#paintColor").change(function () {
        $("#circle").css("background-color", $(this).val());
    });



});