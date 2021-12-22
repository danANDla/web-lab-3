//-----------------------------validation--------------------------------
function validation(){
    let x = document.getElementById("x-input");
    let y = document.getElementById("y-input");
    console.log('validation func');
    let r = $("input[name='r-input']:checked").val();
    if (typeof r == 'undefined') {
        r = '';
    }
    console.log(x.value);
    console.log(y.value);
    console.log(r);

    let x_flag = true;
    let y_flag = true;
    let r_flag = true;

    if (y.value === ''){
        y_flag = false;
        document.getElementById("y-invite").style.color = "#AC2205";
        document.getElementById("y-invite").style.fontWeight = "300";
    }
    else{
        document.getElementById("y-invite").style.color = "white";
        document.getElementById("y-invite").style.fontWeight = "300";
    }
    if (x.value === '' || x.value>3 || x.value<-3 || isNaN(x.value)){
        x_flag = false;
        if(x.value === ''){
            document.getElementById("x-invite").style.color = "#AC2205";
            document.getElementById("x-invite").style.fontWeight = "300";
            document.getElementById("x-err").innerHTML = "";
        }
        else{
            document.getElementById("x-invite").style.color = "white";
            document.getElementById("x-invite").style.fontWeight = "300";
            document.getElementById("x-err").innerHTML = "(value should be a number from (-3;3)";
        }
    }
    else{
        document.getElementById("x-invite").style.color = "white";
        document.getElementById("x-invite").style.fontWeight = "300";
        document.getElementById("x-err").innerHTML = "";
    }
    if (r === ''){
        r_flag = false;
        document.getElementById("r-invite").style.color = "#AC2205";
        document.getElementById("r-invite").style.fontWeight = "300";
    }
    else{
        document.getElementById("r-invite").style.color = "white";
        document.getElementById("r-invite").style.fontWeight = "300";
    }
    return(x_flag && y_flag && r_flag);
}

//-----------------------------submit--------------------------------
$( document ).ready(function() {
    if((document).getElementById('submit-btn') != null) {
        $((document).getElementById('submit-btn')).on('click', function (event) {
            event.preventDefault();
            let r = $("input[name='r-input']:checked").val();
            if (typeof r == 'undefined') {
                r = '';
            }
            let rval = r.toString();

            if (canvasflag) {
                let xval = xsend.toString();
                let yval = ysend.toString();
                //submit(xval, yval, rval, "canvas");
                console.log("Canvas");
                canvasflag = false;
            } else {
                let x = document.getElementById("x-input");
                let y = document.getElementById("y-input");
                let xval = x.value;
                let yval = y.value;
                // if (validation()) {
                //     submit(xval, yval, rval, "form");
                // }
                console.log("Not Canvas");
            }
        })
    }
})



function submit(xval,yval,rval, mode){
    $.ajax({
        url: "ControllerServlet",
        type: "GET",
        data: {
            xval: xval,
            yval: yval,
            rval: rval,
            mode: mode
        },
        async: true,
        cache: false,
        success: function (response){
            console.log('succeed in request');
            if(response === "invalid values"){
                document.getElementById("x-invite").style.color = "#AC2205";
                document.getElementById("x-invite").style.fontWeight = "normal";

                document.getElementById("y-invite").style.color = "#AC2205";
                document.getElementById("y-invite").style.fontWeight = "normal";

                document.getElementById("r-invite").style.color = "#AC2205";
                document.getElementById("r-invite").style.fontWeight = "normal";
            }
            else{
                $('html').html(response);
                let msg = "";
                $('#post').html(msg);
            }
        },
        error: function (jqXHR, exception) {
            let msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500]';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed';
            } else if (exception === 'timeout') {
                msg = 'Time out error';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#post').html(msg);
        },
    })
}

//-----------------------------clear table--------------------------------
$( document ).ready(function() {
    if((document).getElementById('clear-btn')!=null) {
        $((document).getElementById('clear-btn')).on('click', function (event) {
            event.preventDefault();
            //clear();
            console.log('cleared');
        })
    }
})

function clear(){
    init();
    $.ajax({
        url: "ControllerServlet",
        type: "GET",
        data: {
            mode: "clear"
        },
        async: true,
        cache: false,
        success: function (response){
            if(response === "table is empty"){
                document.getElementById("result-table-body").innerHTML = "";
            }
        },
        error: function (jqXHR, exception) {
            let msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500]';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed';
            } else if (exception === 'timeout') {
                msg = 'Time out error';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#post').html(msg);
        },
    })
}

// //-----------------------------restore table--------------------------------
// $(document).ready(function () {
//     restore();
//     console.log('restored');
// })
//
// function restore(){
//
// }

//-----------------------------reset--------------------------------
$( document ).ready(function() {
    if((document).getElementById('reset-btn')!=null) {
        $((document).getElementById('reset-btn')).on('click', function (event) {
            event.preventDefault();
            reset();
            console.log('resetted');
        })
    }
})

function reset(){
    $("input[name='r-input']:checked").prop('checked', false);
    let x = document.getElementById("x-input");
    let y = document.getElementById("y-input");
    x.value = '';
    y.value = '';
    document.getElementById("x-invite").style.color = "white";
    document.getElementById("x-invite").style.fontWeight = "300";
    document.getElementById("x-err").innerHTML = "";
    document.getElementById("y-invite").style.color = "white";
    document.getElementById("y-invite").style.fontWeight = "300";
    document.getElementById("r-invite").style.color = "white";
    document.getElementById("r-invite").style.fontWeight = "300";
}

