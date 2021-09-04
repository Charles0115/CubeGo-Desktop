/*

 * GazeCloudAPI.js v1.1.0 | JavaScript WebCam Eye-Tracking

 *

 * Copyright 2009-2019 GazeRecorder <contact@gazerecorder.com> www.gazerecorder.com- All rights reserved.

 *

 */
var GazeCloudAPI = new function GazeCloudAPIInit() {
    //////Callback//////
    this.OnResult = null;
    this.OnCalibrationComplete = null;
    this.OnCamDenied = null;
    this.OnError = null;
    this.OnGazeEvent = null;
    this.StartEyeTracking = function() {
        StartGazeFlow();
        /////////Version 1.0.0///////////
        InitOldAPI();
        /////////end Version 1.0.0///////////
    }
    //----------------------------------------------
    this.StopEyeTracking = function() {
        StopGazeFlow();
    }
    //----------------------------------------------
    this.RestartEyeTracking = function() {
        GetCloudAdress();
        StopGazeFlow();
        StartGazeFlow();
        if (Logg) Logg("RestartEyeTracking", 2);
    }
    //----------------------------------------------
//////Callback//////
    var dict;
    var code = 256;
    var codeInit = 256;
    var bUseUnicode = true; // false;
    //var out = [];
    var WebEventStringStream = null;
    var WebEventStringStreamIx = 0;
    var WebEventStringPending = "";

    function RestlzwStream() {
        WebEventStringPending = "";
        WebEventStringStreamIx = 0;
        WebEventStringStream = "";
        dict = new Map();
        code = codeInit;
        // out = [];
    }
    RestlzwStream();
//////////////////
    function SendBinary(s) {
        var uint8array = new TextEncoder("utf-8").encode(s);
        ws.send(uint8array);
    }
//-----------------
    let eventsWebRec = [];
    var WebRecIx = 0;
//--------------------
//----------------------
    function ProcessWebRecStream(bend = false) {

        if(bend)
        {
            var a = 1;
            a++;
        }

        if(!ConnectionOk)
            return;

//    var MaxBufforSize = 2000;
        var MaxBufforSize = 1000;

        var IterCount = 1;


        if(bend)
        {
            MaxBufforSize = 10000;
            IterCount = 99999;
        }



        if (bend) // bo exit zle nadpisuje
        {
            if (WebEventStringStreamIx < 3) return;
        }



        for ( i = 0 ; i  < IterCount ;i++)
        {



            try {
                if (eventsWebRec.length > WebRecIx) {
                    var s = 0;
                    var SendTxt = "";
                    var ll = eventsWebRec.length;
                    if (!bend) ll--;
                    while (WebRecIx < ll) {
                        var json_data = JSON.stringify(eventsWebRec[WebRecIx]) + " , ";
                        var compres = json_data;
                        SendTxt += compres;
                        WebEventStringStream += compres;
                        WebRecIx++;

                        //if (!bend)
                        //if (!bend)

                        if (SendTxt.length > MaxBufforSize) break;
                    }
                }

                /////////////////////////////
                var size = WebEventStringStream.length - WebEventStringStreamIx;
                {
                    if (size > MaxBufforSize) size = MaxBufforSize;
                }
                if (size > 0) {
                    SendTxt = WebEventStringStream.substr(WebEventStringStreamIx, size);
                    WebEventStringStreamIx += size;
                    if (SendTxt.length > 0) {
                        SendTxt = "we:" + SendTxt;
                        ws.send(SendTxt);
                    } else {
                        var a = 1;
                        a++;
                    }
                }
                /////////////////////////////


            } catch (e) {
                var a = 1;
                a++;
            }
        }//iter
    }
    //-------------------------------------




    /////////////////endwebrc/////////////////
    ////////////////////////HtmlGUI/////////////////////////
    ////////////////////////endHTMLGUI////////////////////////////////
    var video = null; // document.querySelector('video');showvideoid
    var videoOrginal = null;
    var _GazeData = {
        state: -1
    };
    var _LastGazeData = null;

    //==============================

    /////////////////end GetFPS/////////////////
    var CurCalPoint = null;
    var bIsRunCalibration = false;
    var bIsProcesingCalibration = false;
    var bIsCalibrated = false;
    //===========================================
//===========================================
    var _LoopCalibration;

    function AbortCalibration() {
        bIsCalibrated = false;
        CurCalPoint = null;
        bIsProcesingCalibration = false;
        bIsRunCalibration = false;
        clearInterval(_LoopCalibration);
        document.getElementById("CalCanvasId").style.backgroundColor = 'white';
        document.getElementById("CalDivId").style.display = "none";
        closeFullscreen();

        GUIState = 'InvalidCalibration';
        UpdateGUI(_GazeData);
    }
    //===========================================
//////////////////////Calibration///////////////////////
    var CalDeviceRation = window.devicePixelRatio;


    //////////////////////end Calibration///////////////////////
    /////////////////////BeginCam///////////////////////
    //====================================
    var _canvas = null;
    var canvasContext = null;
    var bLastUseLowQuality = false;

    function getGrayFrameROIResize(_video, GazeD, bOnlyEyes = false, quality = .9) {
        try {
            if (_canvas == null) {
                _canvas = document.createElement('canvas');
                canvasContext = _canvas.getContext('2d');

                if(true)
                    canvasContext.filter = 'blur(1px)';


            }
            var rx = 0;
            var ry = 0;
            var rw = _video.videoWidth;
            var rh = _video.videoHeight;
            if (typeof GazeD === 'undefined' || GazeD.state == -1) {
                ;
            } else {
                // if(GazeD.rw >= 0 && GazeD.rh >= 0)
                {
                    rx = GazeD.rx;
                    ry = GazeD.ry;
                    rw = GazeD.rw;
                    rh = GazeD.rh;
                }
            }
            _canvas.width = 80; //120;//120;//150;
            // _canvas.width =40;//tmp
            //  _canvas.width =180;//tmp
            var fff = .5;
            if (bLastUseLowQuality) fff *= .7;

            //   _canvas.width =180;//tmp
            if (GazeD.state == -1) _canvas.width = 160; //200;// 160;
            _canvas.height = _canvas.width;
            LastVideoTime = video.currentTime;
            canvasContext.drawImage(_video, rx, ry, rw, rh, 0, 0, _canvas.width, _canvas.height);
            ///////////
            quality = .9;
            // quality = .97;
            if (GazeD.state == -1) quality = .8;
            //   quality = .92;
            const datagray = _canvas.toDataURL('image/jpeg', quality);
            var r;
            r = {
                'imgdata': datagray,
                'w': _video.videoWidth,
                'h': _video.videoHeight,
                'rx': rx,
                'ry': ry,
                'rw': rw,
                'rh': rh,
                's': _canvas.width
            };
            return r;
        } catch (ee) {
            if (Logg) Logg("getFrame exeption : " + ee.message, -2);
        }
    }
    //--------------------------------------
/////////////////GetFPS/////////////////

    //------------------------------
    ////////stat////////
    var minNetworkDelay = 999999;
    var maxNetworkDelay = 0;
    var avrNetworkDelay = 0;
    var networkDelay = 0;
    var processkDelay = 0;
    var skipProcessCount = 0;
    var CamFPS = 0;

    function SendStat() {
        try {
            var stat = "CamFPS:" + CamFPS + " minNetworkDelay: " + minNetworkDelay + " maxNetworkDelay: " + maxNetworkDelay + " avrNetworkDelay: " + avrNetworkDelay + " skipProcessCount: " + skipProcessCount + " kipF: " + skipProcessCount / CurFrameNr;
            if (Logg) Logg("stat : " + stat, 5);
            ws.send(stat);
        } catch (e) {}
    }
    //////end stat/////////
    ///////fps///////
    var fpsstartTime = -1;
    var fpst = 0
    var fpscout = 0

    function UpdateCamFPS() {
        if (fpsstartTime == -1) fpsstartTime = Date.now();
        var t = video.currentTime;
        if (t > fpst) {
            fpscout++;
        }
        var tt = Date.now();
        if (tt - fpsstartTime > 1000 * 2) {
            CamFPS = 1000.0 * fpscout / (tt - fpsstartTime);
            //console.log(" CamFPS" + CamFPS);
            if (true) {
                clearInterval(_LoopCamSend);
                var interval = 1000 / CamFPS;
                _CamLoopInterval = interval;
                interval += 3;
                if (interval < 33) // max 30 fps
                    interval = 33;
                //if(interval < 17)// max 60 fps
                //interval = 17;

            }
        } else {
            fpst = t;
            setTimeout(UpdateCamFPS, 2);
        }
    }
    //////end fps//////
    var _delaySendC = 0;
    var ConnectionAuthorizationStatus;
    var bCamOk = false;
    var ws = null;
    var _delaySendC = 0;
    var curTimeStap = 0;
    var CurFrameNr = 0;
    var CurFrameReciveNr = 0;
    var CurFrameReciveTime = 0;
    var CurFrameAckNr = 0;
    var CurFrameAckTime = 0;
    /////////////////Init Cam Send/////////////////
    var _fps = -1;
    var _LoopCamSend = null;
    //-------------------------------------
    var bGazeCloundLowFpsSend = false;
    this.SetLowFps = function(bval = false) {
        bGazeCloundLowFpsSend = bval;
    }
    //-------------------------------------
    var SendFrameCountDelay = 0;
    var SkipCount = 0;
    var SkipFactor = 1;
    var CheckFpsDelayIter = 0;
    var LastCamFrameNr = 0;
    var SkipCamFrameCount = 0;
    var LastVideoTime = 0;
    var LastVideoGrabTime = 0;
    var LastSendVidoTime = 0;
    var LastSendVideoTime = 0;

    //-----------------------------------------
    var LastSendTime = 0;
    var FrameTime = 0; // Date.now();
    var LastWaitT = 30;
    var bExitCamSendLoop = false;

    var _CurVideoTime = 0;

    function CamSendLoop() {
        if (bExitCamSendLoop) return;
        var videoTime = video.currentTime;
        var bNewVideoGrap = true;
        if (true) {
            var tt = Date.now();
            if (videoTime <= LastVideoTime) {
                bNewVideoGrap = false;
                if (false) video.play();
                SkipCamFrameCount++;
                var dd = tt - LastVideoGrabTime;
                //if (SkipCamFrameCount > 10 * 33.0 / _CamLoopInterval) // frozen min
                if (dd > 500) // frozen min
                {
                    video.play();
                    if (Logg) Logg("frozen video : " + SkipCamFrameCount + " dt " + dd, 2);
                    //console.log(" frozen replay " + SkipCamFrameCount +  " dt " +dd );
                    LastVideoGrabTime = tt;
                    LastVideoTime = videoTime;
                    SkipCamFrameCount = 0;
                }


            } else {
                LastVideoGrabTime = tt;
                LastVideoTime = videoTime;// tmp
                //_CurVideoTime  = videoTime;
                SkipCamFrameCount = 0;
            }
        }
        if (ws == null) return;
        if (ws.readyState != WebSocket.OPEN) return;
        var bSend = true;
        var BuforMaxC = 6; //6; // 10;
        if (true) {
            BuforMaxC = 5 + minNetworkDelay / 33;
            if (BuforMaxC > 15) BuforMaxC = 15;
            if (BuforMaxC < 5) BuforMaxC = 5;
        }
        var FrameCountDelay = CurFrameNr - CurFrameReciveNr;
        var FrameCountDelayAck = CurFrameNr - CurFrameAckNr;


        if( bIsProcesingCalibration)//tmp
        {
            FrameCountDelay = FrameCountDelayAck;
        }


        if (true) {

            if (_GazeData.state == -1) // tracking lose
            {
                if (FrameCountDelay > 2) bSend = false;
            } else {
                if (FrameCountDelay > BuforMaxC) bSend = false;
            }
            if (bGazeCloundLowFpsSend) {
                if (FrameCountDelay > 1) bSend = false;
            }
            var waitT = 33; //20;//_CamLoopInterval;

            if (FrameCountDelay >= BuforMaxC) waitT = 66;

            if (waitT < .8 * LastWaitT) waitT = .8 * LastWaitT;

            waitT = 30;
            var t = Date.now();
            var dif = t - LastSendTime;

            if (bSend)
                if (dif < waitT) {
                    bSend = false;
                    // console.log("  wait send to hight cpu "  +dif  );
                }
            // console.log(" waitT " + waitT);
            waitT = LastWaitT * .9 + .1 * waitT;
            LastWaitT = waitT;
            SendFrameCountDelay = FrameCountDelay;
        }
        if (bNewVideoGrap) SkipCount++;
        if (bSend && !bNewVideoGrap) {
            //console.log("  no video change try resend prev " + LastSendVideoTime + "  ; " + LastVideoTime);
        }



        if(LastSendVideoTime   > 0)
            if( LastSendVideoTime  >=LastVideoTime )
                bSend = false;

        if (bSend) {


            //LastVideoTime = _CurVideoTime ; // tmp

            SkipCount = 0;
            var OnlyEyes = false;
            if (CurCalPoint != null) ////// cal point///////
            {
                var cp = Object.assign({}, CurCalPoint);
                var json_data = JSON.stringify(cp);
                ws.send(json_data);
                if (CurCalPoint.type == 10) // reset cur click point
                    CurCalPoint = null;
            } //////end cal point///////
            FrameTime = Date.now();
            LastSendTime = FrameTime;
            var dd = getGrayFrameROIResize(video, _GazeData, OnlyEyes);
            LastSendVideoTime = LastVideoTime;
            curTimeStap = Date.now();
            dd.time = curTimeStap;
            dd.FrameNr = CurFrameNr;
            CurFrameNr++;
            var myJSON = JSON.stringify(dd);
            ws.send(myJSON);
            ProcessWebRecStream();
        } // end send

        if (bNewVideoGrap) {
            CheckFpsDelayIter++;
            if (_GazeData.state != -1) // tracking lose
                if (!bGazeCloundLowFpsSend) {
                    if (CurFrameNr > 100) {
                        var s = 1;
                        if (!bSend) s = 0;
                        SkipFactor = .95 * SkipFactor + s * .05;
                    }
                }
            var FrameCountDelay = CurFrameNr - CurFrameReciveNr;
            //   var FrameCountDelay = CurFrameNr - CurFrameAckNr;
            var waitT = 33;
            var processDelay = Date.now() - LastSendTime;
            waitT = _CamLoopInterval;
            waitT -= processDelay;

            if (waitT < 5) waitT = 5;

        }

        var tt = 10;
        if( bIsProcesingCalibration)
            tt = 300;

        setTimeout(function() {
            requestAnimationFrame(CamSendLoop);
        }, tt);
    }

//-------------------------------------
    var curFps = 100;

    var _CamLoopInterval = 36; //15;//10;//36;//15;
    function InitCamSend() {
        var FPS = 30;
        try {
            if (_fps < 0) {
                _fps = video.srcObject.getVideoTracks()[0].getSettings().frameRate;
                //alert("sframeRate " +_fps );
                FPS = _fps;
                FPS = 28; // tmp test
            }
        } catch (err) {
            ;
        }
        bExitCamSendLoop = false;
        CamSendLoop();
        InitDevicemotion();
    }
    //--------------------------------------
    function InitDevicemotion() {
        window.addEventListener('devicemotion', function(event) {
            try {
                var motion = {
                    ax: event.acceleration.x,
                    ay: event.acceleration.y,
                    az: event.acceleration.z,
                    alpha: event.rotationRate.alpha,
                    beta: event.rotationRate.beta,
                    gamma: event.rotationRate.gamma,
                    interval: event.interval
                };
                var myJSON = JSON.stringify(motion);
                ws.send(myJSON); // Send appKey
            } catch (ee) {}
        });
    }
    //--------------------------------------
    var MediaStrem = null;

    function HideGUI() {
        try {
            var GazeFlowContainer = document.getElementById("GazeFlowContainer");
            GazeFlowContainer.style.display = 'none';
            showinit.style.display = 'none';
            loadid.style.display = 'none';
            CalDivId.style.display = 'none';
            errid.style.display = 'none';
            camid.style.display = 'none';
            disableStyle('GazeCloudAPI.css', true);
        } catch (ee) {}
    }
    //--------------------------------------
    function CloseWebCam() {
        try {
            bExitCamSendLoop = true;
            if (true) {
                LastVideoTime = 0;
                LastSendVideoTime   = 0;
                LastCamFrameNr = 0;
                SkipCamFrameCount = 0;
                curFps = 30;
                SkipFactor = 1;
                _delaySendC = 0;
                bCamOk = false;
                //ws = null;
                _delaySendC = 0;
                curTimeStap = 0;
                CurFrameNr = 0;
                _CurVideoTime =0;
                CurFrameReciveNr = 0;
                CurFrameReciveTime = 0;
                CurFrameAckNr = 0;
                CurFrameAckTime = 0;
                _GazeData.FrameNr = 0;
                _GazeData.state = -1;
            }
            RetrayCountNoSlot = 0;
            ConnectCount = 0;
            GoodFrameCount = 0;
            BadFrameCount = 0;
            bCamOk = false;
            _delaySendC = 0;
            curTimeStap = 0;
            CurFrameNr = 0;
            CurFrameReciveNr = 0;
            CurFrameAckNr = 0;
            CurFrameAckTime = 0;
            RedirectCount = 0;
            if (_LoopCamSend != null) clearInterval(_LoopCamSend);
            _LoopCamSend = null;
            if (MediaStrem != null) MediaStrem.getTracks()[0].stop();
            Disconect();
            UpdateGUI(_GazeData);
        } catch (a) {
            ;
        }
        try {
            if (OnStopGazeFlow != null) OnStopGazeFlow();
        } catch (e) {}
    }
    //======================
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    function CheckgetUserMedia() {
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
                // First get ahold of the legacy getUserMedia, if present
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    ///
                    if (Logg) Logg("getUserMedia is not implemented in this browser! ", -2);
                    alert("Camera access is not supported by this browser! Try: Chrome 53+ | Edge 12+ | Firefox 42+ | Opera 40+ | Safari 11+  ");
                    //  if( GazeCloudAPI.OnCamDenied != null)
                    //      GazeCloudAPI.OnCamDenied();
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }
    }
    ///////////////
    var DeneidCount = 0;

    function deniedStream(err) {
        DeneidCount++;
        // ShowErr("Please, Allow Camera Access to start Eye-Tracking!");
        //setTimeout(function () {
        alert("Camera access denied! Please, Allow Camera Access to start Eye-Tracking");
        if (Logg) Logg("Camera access denied! " + err.message, 2);
        //if(DeneidCount == 1)
        if (DeneidCount == 0) StartCamera();
        else {
            StopGazeFlow();
            if (GazeCloudAPI.OnCamDenied != null) GazeCloudAPI.OnCamDenied();
        }
        //}, 3000);
    }

    function errorStream(e) {
        if (e) {
            console.error(e);
            if (Logg) Logg("errorStream " + e.name + ": " + e.message, -2);
        }
        StopGazeFlow();
        if (GazeCloudAPI.OnCamDenied != null) GazeCloudAPI.OnCamDenied();
    }
    var backgroundCanvas = null; //document.getElementById('bgcanvas');
    var bgCanCon = null; //backgroundCanvas.getContext('2d');

    //------------------------
    function startStream(stream) {
        DeneidCount = 0;
        backgroundCanvas = document.getElementById('bgcanvas');
        bgCanCon = backgroundCanvas.getContext('2d');
        MediaStrem = stream;
        //added hidden canvas due to problems with the drawImage() function on Safari browser
        bgCanCon.drawImage(video, 0, 0);
        video.addEventListener('canplay', function DoStuff() {
            bgCanCon.drawImage(video, 0, 0);
            video.removeEventListener('canplay', DoStuff, true);
            setTimeout(function() {
                video.play();
                UpdateCamFPS();
            }, 1000);
        }, true);
        video.srcObject = stream;
        video.play();

        InitVideo(stream);
    }
    var __w = 640;
    var __h = 480;

    try
    {
//( navigator.platform = "MacIntel")
        if( navigator.userAgent.includes("Macintosh"))


        {
            _w = 1920;
            _h = 1080;
        }
    }
    catch(e){}


    var constraintsMedia = {
        audio: false,
        video: {

            width: {  ideal: __w },
            height: { ideal:  __h},

            /*
             width: {  ideal: 1920},
                height: { ideal:  1080},

            */

            frameRate: { ideal: 30}
        }
    }




    function StartCamera() {
        if (true) {
            try {
                CheckgetUserMedia();
            } catch (ee) {
                if (Logg) Logg("CheckgetUserMedia exeption" + ee.mesage, -2);
            }
        }
        //Here is where the stream is fetched
        try {
            navigator.mediaDevices.getUserMedia(
                constraintsMedia

                /*
                    {
                    video: true,
                    audio: false,
                    width: 480,
                    height: 640
                    }

                */


            ).then(startStream).catch(deniedStream);
        } catch (e) {
            try {
                navigator.mediaDevices.getUserMedia('video', startStream, deniedStream);
            } catch (e) {
                errorStream(e);
            }
        }
        video.loop = video.muted = true;
        video.autoplay = true;
        video.load();
        videoOrginal.loop = video.muted = true;
        videoOrginal.autoplay = true;
        videoOrginal.load();
    }
    //////////////////////
    function OpenWebCam() {
        bExitCamSendLoop = false;
        //video = document.querySelector('video');
        video = document.getElementById("showvideoid");
        videoOrginal = document.createElement('video');
        videoOrginal.width = 640;
        videoOrginal.height = 480;
        if (true) {
            video.onended = function() {
                // alert("video has ended");
                if (Logg) Logg("video has ended", -2);
            }
            video.onpause = function() {
                // alert("video has onpause");
                if (Logg) Logg("video has onpause", -2);
            }
        }
        try {
            if (true) //nn
            {
                video.setAttribute("playsinline", true);
                videoOrginal.setAttribute("playsinline", true);
            }
        } catch (ee) {}
        GUIState = 'WaitWebCam';

        StartCamera();

    }
    //-------------------------------------
    var MediaInfo = "";

    function InitVideo(s) {
        try {

             //////////end zoom////////
            bCamOk = true;
            Connect();

            if (true) //nn
                UpdateGUI(_GazeData);

        } catch (error) {
            console.log("InitVideo err " + error);
        }
    }
/////////////////////EndCam///////////////////////
    ////////////////connection//////////////////////
    var GazeFlowSesionID = null;
    var GazeCloudServerAdress = "wss://cloud.gazerecorder.com:";
    var GazeCloudServerPort = 43334;
    var isWaitForAutoryzation = null;
    var RedirectCount = 0;
    var ConnectionOk = false;
    var ConnectCount = 0;
    var GoodFrameCount = 0;
    var BadFrameCount = 0;
    var RedirectPort = 43335;
    //------------------------------
    var GetCloudAdressReady = false;
    var _WaitForGetCloudAdress = null;
    var GetCloudAdresInfo = null;

    function GetCloudAdress() {
        GetCloudAdressReady = false;
        //info
        //RedirectCount
        //RedirectPort
        //GazeCloudServerAdress
        // ConnectCount
        //RedirectCount
        //GazeCloudServerAdress= "wss://cloud.gazerecorder.com:";
        //GazeCloudServerPort = 43334;
        var url = 'https://api.gazerecorder.com/GetCloudAdress/';
        let req = new XMLHttpRequest();
        let formData = new FormData();
        req.open("GET", url);
        req.onload = function() {
            try {
                var info = JSON.parse(req.response);
                GetCloudAdresInfo = info;
                if (typeof info.err !== 'undefined')
                    if (info.err != "") {
                        ShowErr("info.err");
                        return;
                    }
                GazeCloudServerAdress = info.adress;
                GazeCloudServerPort = info.port;
                GetCloudAdressReady = true;
            } catch (e) {}
        }
        //end onload
        req.onerror = function(e) {
            if (Logg) Logg("GetCloudAdress err ");
        }
        req.send(null);
    }
    GetCloudAdress();
    //------------------------------
    function WaitForAutoryzation() {
        RedirectPort = GazeCloudServerPort + 1;
        // if(Logg)
        //    Logg("start WaitForAutoryzation + b:"+isWaitForAutoryzation ,2);
        if (isWaitForAutoryzation != null) {
            clearTimeout(isWaitForAutoryzation);
            isWaitForAutoryzation = null;
        }
        isWaitForAutoryzation = setTimeout(function() {
            if (true) //tmp
                if (isWaitForAutoryzation == null) return;
            if (!ConnectionOk) {
                // alert("WaitForAutoryzation fail: reconect")
                console.log("WaitForAutoryzation fail: reconect");
                if (false) {
                    ws.onopen = null;
                    ws.onerror = null;
                    ws.onmessage = null;
                    ws.onclose = null;
                    delete ws;
                }
                //  if(RedirectCount > 2)
                if (true) {
                    if (RedirectCount > 4) RedirectPort = GazeCloudServerPort + 2;
                    RedirectPort = GazeCloudServerPort + ConnectCount;
                    if (RedirectPort > GazeCloudServerPort + 8) RedirectPort = GazeCloudServerPort + 1;
                    var _url = GazeCloudServerAdress + RedirectPort;
                    console.log("RedirectCount: " + RedirectCount + " url " + _url);
                    if (Logg) Logg("RedirectCount: " + RedirectCount + " url " + _url, 2);
                    Connect(_url);
                } else Connect();
            }
            if (isWaitForAutoryzation != null) {
                clearTimeout(isWaitForAutoryzation);
                isWaitForAutoryzation = null;
            }
        }, 5000); // 10000);
    }
    //======================================
    function OnMessageGaze(evt) {
        if (!ConnectionOk) {
            if (evt.data.substring(0, 2) == "ws") {
                //console.log("redirect: " + evt.data);
                if (Logg) Logg("redirect: " + evt.data, 2);
                Connect(evt.data);
                return;
            }
            if (evt.data == "no free slots") {
                console.log("no free slots");
                WaitForSlot();
                //alert( evt.data   );
                ws.onclose = null;
                ws.close();
                return;
            }
            if (evt.data.substring(0, 2) == "ok")
                //if (evt.data == "ok")
            {
                GazeFlowSesionID = evt.data.substring(2);
                ConnectionOk = true;
                if (isWaitForAutoryzation != null) {
                    clearTimeout(isWaitForAutoryzation);
                    isWaitForAutoryzation = null;
                }
                ////
                //console.log("authorization ok");
                if (Logg) {
                    Logg("authorization ok", 2);
                    Logg("GazeFlowSesionID: " + GazeFlowSesionID, 2);
                }

                InitCamSend();

                return;
            }
        } // if(!ConnectionOk)
        ///////gaze data//////////
        {
            var received_msg = evt.data;
            if (evt.data.substring(2, 7) == "AckNr") {
                var ack = JSON.parse(evt.data);
                //  console.log(evt.data + " AckNr " + ack.AckNr);
                networkDelay = Date.now() - ack.time;
                if (networkDelay < minNetworkDelay) minNetworkDelay = networkDelay;
                if (networkDelay > maxNetworkDelay) maxNetworkDelay = networkDelay;
                if (networkDelay < 10 * minNetworkDelay) avrNetworkDelay = (avrNetworkDelay * ack.AckNr + networkDelay) / (ack.AckNr + 1);
                //console.log( " network delay " +networkDelay);
                CurFrameAckNr = ack.AckNr;
                CurFrameAckTime = ack.time;
                return;
            }
            ////////////Calibration complete//////////
            if (evt.data.substring(0, 4) == "Cal:") {
                if (Logg) Logg("cal complete " + evt.data, 2);
                try {
                    try {
                        //if (GazeCloudAPI.OnCalibrationComplete != null) GazeCloudAPI.OnCalibrationComplete();
                        if (true) disableStyle('GazeCloudAPI.css', true);
                    } catch (e) {
                        ;
                    }
                } catch (e) {};
                bIsProcesingCalibration = false;
                bIsCalibrated = true;
                if (evt.data.substring(4, 6) == "ok") {
                    if (GazeCloudAPI.OnCalibrationComplete != null) GazeCloudAPI.OnCalibrationComplete();
                }
                if (evt.data.substring(4, 6) == "no") {
                    if (true) AbortCalibration();
                    ShowErr("Invalid Calibration!");
                }
                return;
            }
            ////////////end Calibration complete//////////
            try {
                if (_GazeData.state == -1) {
                    GoodFrameCount = 0;
                    BadFrameCount++;
                } else {
                    GoodFrameCount++;
                    BadFrameCount = 0;
                }
                _LastGazeData = Object.assign({}, _GazeData);
                var GazeData = JSON.parse(received_msg);
                var LastNr = _GazeData.FrameNr;
                _GazeData = GazeData;
                CurFrameReciveNr = GazeData.FrameNr;
                CurFrameReciveTime = GazeData.time;
                processkDelay = Date.now() - GazeData.time;
                var skipC = _GazeData.FrameNr - LastNr - 1;
                if (!isNaN(skipC))
                    if (skipC > 0) skipProcessCount += skipC;
                // console.log("processkDelay" + processkDelay + " skipC " + skipC);
                PlotGazeData(GazeData);
                return;
            } catch (error) {
                console.error(error);
            }
        }
    }
    //========================
    function Disconect() {
        try {
            //ConnectionOk = false;
            if (ws != null) {
                ws.onopen = null;
                ws.onerror = null;
                ws.onmessage = null;
                ws.onclose = null;
                try {
                    //if(false)
                    ProcessWebRecStream(true);
                    ws.send('exit');
                } catch (ee) {}
                ws.close();
                delete ws;
                ws = null;
            }

            ConnectionOk = false;

            if (isWaitForAutoryzation != null) {
                // if(Logg)
                //Logg("Connect clear WaitForAutoryzation: ",2);
                clearTimeout(isWaitForAutoryzation);
                isWaitForAutoryzation = null;
            }
            if (Logg) Logg("Disconect", 2);
        } catch (error) {}
    }
    //------------------
    function Connect(_url = "") {
        try {
            bIsCalibrated = false;
            bIsRunCalibration = false;
            bIsProcesingCalibration = false;
            Disconect();
            ConnectCount++;
            if (ConnectCount > 4) {
                console.log("try connect count" + ConnectCount);
                ShowErr("Can not connect to GazeFlow server!");
                return;
            }
            AppKey = "AppKeyDemo";
            ConnectionOk = false;
            if ("WebSocket" in window) {
                var port = GazeCloudServerPort;
                var url = GazeCloudServerAdress + port;
                if (_url == "") {
                    _url = GazeCloudServerAdress + GazeCloudServerPort; //"43334";
                    try {
                        ws = new WebSocket(_url);
                    } catch (ec) {
                        if (Logg) Logg(" connect exeption: " + ec.message, -2);
                    };
                } else // reconect
                {
                    var _ws; //= new WebSocket(_url);
                    try {
                        _ws = new WebSocket(_url);
                    } catch (ecc) {
                        if (Logg) Logg(" reconnect exeption: " + ecc.message, -2);
                    };
                    ws = _ws;
                } //else
                if (Logg) {
                    Logg("connecting: " + _url, 2);
                }
                //console.log("connecting: " + _url);
                //////////////////////////////////////////////////
                ws.onopen = function() {
                    if (Logg) {
                        Logg("Connected", -2);
                    }
                    //console.log("connected");
                    WaitForAutoryzation();
                    ws.send("AppKey:" + AppKey); // Send appKey
                } ///////////end open///////////////////
                ///////////////////////////////////////////////////
                ws.onerror = function(error) {
                    if (Logg) {
                        var myJSON = JSON.stringify(error);
                        Logg(ConnectCount + " ws.onerror  ConnectionOk: " + ConnectionOk, -2);
                    }
                    if (!ConnectionOk)
                        if (ConnectCount < 4) {
                            var port = GazeCloudServerPort + ConnectCount
                            if (ConnectCount == 3) port = 80;
                            var _url = GazeCloudServerAdress + port;
                            console.log("ws.onerror  ConnectCount try again" + ConnectCount + "url " + _url);
                            Connect(_url);
                        }
                        else ShowErr("Can not connect to GazeCloud server!");
                }
                ///////////////////////////////////////////////////
                ws.onmessage = OnMessageGaze;
                //////////////////////////////////
                ws.onclose = function(event) {
                    if (Logg) {
                        var myJSON = JSON.stringify(event);
                        Logg(" ws.onclose " + myJSON, -2);
                    }
                    if (bIsProcesingCalibration || bIsRunCalibration) {
                        AbortCalibration();
                        ShowErr("Invalid Calibration");
                    } else ShowErr("GazeCloud server connection lost!");
                };
            } else {
                alert("WebSocket NOT supported by your Browser!");
                if (Logg) Logg("WebSocket NOT supported by your Browser", -2);
            }
            GUIState = 'InitConnection';
        } catch (ee) {
            if (Logg) Logg(" Connect exeption " + JSON.stringify(ee), -2);
        }
    }
    //--------------------------------------
    var RetrayCount = 0;
    var RetrayCountNoSlot = 0;

    function WaitForSlot() {
        if (Logg) Logg("WaitForSlot", 2);
        GUIState = 'WaitForSlot';
        if (isWaitForAutoryzation != null) {
            clearTimeout(isWaitForAutoryzation);
            isWaitForAutoryzation = null;
        }
        document.getElementById("waitslotid").style.display = 'block';
        document.getElementById("waitslottimeid").innerHTML = "30";
        var start = Date.now();
        var _LoopSlotWait = setInterval(() => {
            var t = 30 - (Date.now() - start) / 1000.0;
            t = Math.round(t);
            document.getElementById("waitslottimeid").innerHTML = t;
            if (t < 0) {
                clearInterval(_LoopSlotWait);
                document.getElementById("waitslotid").style.display = 'none';
                Connect();
                RetrayCount++;
                RetrayCountNoSlot++;
            }
        }, 1000);
    }
    ////////////////end connection//////////////////////
    //======================
    /////////////Result//////////////////////
/////////////////////////////////
    let GazeResultEvents = [];

    function GazeEvent() {
        this.docX = 0;
        this.docY = 0;
        this.time = 0;
        this.state = -1;
    }
////////////////////////////////
    var maxDelay = 0;
    var avrDelay = 33;

    function PlotGazeData(GazeData) {
        var delay = Date.now() - GazeData.time;
        var FrameCountDelay = CurFrameNr - CurFrameReciveNr;
        if (delay > maxDelay) maxDelay = delay;
        avrDelay = .99 * avrDelay + .01 * delay;
        //var x = GazeData.GazeX -window.screenX;
        //var y = GazeData.GazeY -window.screenY-   ( window.outerHeight-window.innerHeight);
        var x = GazeData.GazeX - window.screenX;
        var y = GazeData.GazeY - window.screenY - (window.outerHeight - window.innerHeight * window.devicePixelRatio / CalDeviceRation);
        x /= window.devicePixelRatio / CalDeviceRation;
        y /= window.devicePixelRatio / CalDeviceRation;
        //if(false)
        if (true) //boundary lim
        {
            var _m = 50;
            if (_m < window.innerWidth / 12.0) _m = window.innerWidth / 12.0;
            if (_m < window.innerHeight / 12.0) _m = window.innerHeight / 12.0
            var _h_ = (window.outerHeight - window.innerHeight);;
            if (x < 0 && x > -_m) x = .2 * x //;x = 0;
            if (y < 0 && y > -_m) y = .2 * y; //y = 0;
            var _w = window.innerWidth;
            var _h = window.innerHeight;;
            if (x > _w && x - _w < _m) x = .2 * x + .8 * _w; //  x = _w;
            if (y > _h && y - _h < _m)
                //y = _h;
                y = .2 * y + .8 * _h; //  x = _w;
        }
        if (true) {
            var scrollY = Math.max(document.body.scrollTop, window.scrollY)
            var scrollX = Math.max(document.body.scrollLeft, window.scrollX)
            x += scrollX; //document.body.scrollTop;
            y += scrollY; //document.body.scrollTop;
        }
        if (true) {
            GazeData.Xview = x / window.innerWidth;
            GazeData.Yview = y / window.innerHeight
            GazeData.docX = x;
            GazeData.docY = y;
        }
        if (GazeCloudAPI.OnResult != null) {
            var outGazeData = GazeData;
            outGazeData.docX = x;
            outGazeData.docY = y;
            GazeCloudAPI.OnResult(outGazeData);
        }
        var Gazeevent = new GazeEvent();
        Gazeevent.docX = Math.round(x);
        Gazeevent.docY = Math.round(y);
        Gazeevent.time = GazeData.time;
        Gazeevent.state = GazeData.state;
        GazeResultEvents.push(Gazeevent);
        if (true) {
            var t = Date.now();
            var webevent = {
                type: 20,
                data: Gazeevent,
                timestamp: t
            };
            eventsWebRec.push(webevent);
            try {
                if (GazeCloudAPI.OnGazeEvent != null) {
                    GazeCloudAPI.OnGazeEvent(webevent);
                }
            } catch (e) {}
            /* */
        }
        ///////////////////HeatMapLive//////////////
        if (typeof heatmap !== 'undefined')
            if (heatmap != null)
                if (!bIsRunCalibration && !bIsProcesingCalibration && bIsCalibrated) {
                    if (GazeData.state == 0) {
                        var Precision = 1; //5;
                        var _x = Math.round(x / Precision) * Precision + (.5 * Precision - .5);
                        var _y = Math.round(y / Precision) * Precision + (.5 * Precision - .5);
                        _x = Math.round(_x);
                        _y = Math.round(_y);
                        var timedif = _GazeData.time - _LastGazeData.time;
                        // console.log("timedif " + timedif);
                        var v = timedif / 33;
                        if (v > 5) v = 5;
                        try {
                            //AddHeatMapDataWin(_x, _y, v, 0, 0);
                            //if (false)
                            heatmap.addData({
                                x: _x,
                                y: _y,
                                value: v
                            });
                        } catch (e) {}
                    }
                }
        ///////////////////end HeatMapLive//////////////
        UpdateGUI(GazeData);
    }
    /////////////////////////////////
    ///////////////////Gui//////////////////////
    var GUIState = 'none';
    var ButtonCalibrate = document.getElementById("_ButtonCalibrateId");
    //var facemaskimg = document.getElementById("facemaskimg");
    var facemaskimgOk = document.getElementById("facemaskimgok");
    var facemaskimgNo = document.getElementById("facemaskimgno");
    var showinit = document.getElementById("showinit");
    var camid = document.getElementById("camid");
    var loadid = document.getElementById("loadid");
    var DocmentLoaded = false;
    var CalDivId = document.getElementById("CalDivId");
    var waitslotid = document.getElementById("waitslotid");
    var errid = document.getElementById("errid");
    var GazeFlowContainer = document.getElementById("GazeFlowContainer");
    var corectpositionid = document.getElementById("corectpositionid");
    var GUIInitialized = false;
    var disableStyle = function(styleName, disabled) {
        return;
        try {
            var styles = document.styleSheets;
            var href = "";
            for (var i = 0; i < styles.length; i++) {
                href = styles[i].href.split("/");
                href = href[href.length - 1];
                if (href === styleName) {
                    styles[i].disabled = disabled;
                    break;
                }
            }
        } catch (e) {}
    };
    try {
        // var style = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> <link rel="stylesheet" href="https://api.gazerecorder.com/GazeCloudAPI.css" >';
        // document.getElementsByTagName('head')[0].insertAdjacentHTML('afterbegin', style);
        //disableStyle('GazeCloudAPI.css',true);
    } catch (e) {
    }

    function InitGUI() {
        try {
            disableStyle('GazeCloudAPI.css', false);
        } catch (e) {}
        GUIInitialized = true;
        ////////init gui/////
        DocmentLoaded = true;
        video = document.querySelector('video');
        ButtonCalibrate = document.getElementById("_ButtonCalibrateId");
        //facemaskimg = document.getElementById("facemaskimg");
        facemaskimgOk = document.getElementById("facemaskimgok");
        facemaskimgNo = document.getElementById("facemaskimgno");
        corectpositionid = document.getElementById("corectpositionid");
        showinit = document.getElementById("showinit");
        camid = document.getElementById("camid");
        loadid = document.getElementById("loadid");
        waitslotid = document.getElementById("waitslotid");
        errid = document.getElementById("errid");
        CalDivId = document.getElementById("CalDivId");
        GazeFlowContainer = document.getElementById("GazeFlowContainer");
        ////////end init gui/////
        showinit.style.display = 'none';
        GazeFlowContainer.style.display = 'block';
        camid.style.marginLeft = -camid.scrollWidth / 2;
        facemaskimgOk.width = video.width;
        facemaskimgOk.height = video.height;
        facemaskimgNo.width = video.width;
        facemaskimgNo.height = video.height;
    }
    //--------------------------------------
    var TrackingLostShow = true;
    var LatTrackingLostShow = true;

    function UpdateGUI(GazeData) {
        // 0 init
        // 1 calirate
        // 2 calibrate lost
        // 3 tracking
        // 4 racking lost
        // 5 procesing
        try {
            var GuiState = 0;


            ////////////////
            var showInit = false;
            showInit = (!bIsCalibrated && !bIsProcesingCalibration && !bIsRunCalibration);
            var delayC = 5;
            if (TrackingLostShow) {
                if (GoodFrameCount > delayC) TrackingLostShow = false;
            } else {
                if (BadFrameCount > delayC) TrackingLostShow = true;
            }
            var display = 'none';
            if (TrackingLostShow || (!bIsCalibrated && !bIsProcesingCalibration && !bIsRunCalibration)) display = 'block';
            else display = 'none';
            if (bIsProcesingCalibration) display = 'none';

            ///
            var bHideVideo = false;
            if (display == 'none') {
                bHideVideo = true;
                camid.style.display = 'block';
            }
            ///
            var f = 1.0;
            var _w;
            var _h;

            if (bHideVideo) {
                _w = 1;
                _h = 1;
                //_w = 320/10;
                //_h = 240/10;
            } else {
                _w = 320;
                _h = 240;
            }
            if (video.width != _w || video.height != _h) {
                //if(false) // na ios frozen przy zmianie !!!!
                {
                    video.width = _w;
                    video.height = _h;
                }
                facemaskimgOk.width = video.width;
                facemaskimgOk.height = video.height;
                facemaskimgNo.width = video.width;
                facemaskimgNo.height = video.height;
            }
            if (LatTrackingLostShow != TrackingLostShow) {
                if (Logg) Logg("Face : " + TrackingLostShow, 2);
                if (!TrackingLostShow) {
                    // facemaskimgOk.style.display = "block";
                    // facemaskimgNo.style.display = "none";
                    if (localStorage.getItem("CalibrationStart") === null) {
                        facemaskimgOk.style.display = "block";
                        facemaskimgNo.style.display = "none";
                    } else {
                        document.getElementById('camid').style.display = 'none';
                    }
                } else {
                    console.log("head position changed");
                    // facemaskimgOk.style.display = "none";
                    // facemaskimgNo.style.display = "block";
                    if (localStorage.getItem("CalibrationStart") === null) {
                        facemaskimgOk.style.display = "none";
                        facemaskimgNo.style.display = "block";
                    }else {
                        document.getElementById('camid').style.display = 'block';
                        facemaskimgNo.style.display = "block";
                    }
                }
                if (ButtonCalibrate.disabled != TrackingLostShow) ButtonCalibrate.disabled = TrackingLostShow;
                if (display) {
                    var d = null;
                    if (TrackingLostShow) d = 'block';
                    else d = 'none';
                    if (corectpositionid.style.display != d) corectpositionid.style.display = d;
                }
            }
            var dd = null;
            if (showinit.style.display != 'none') dd = "block";
            else dd = "none";
            if (GazeFlowContainer.style.display != dd) GazeFlowContainer.style.display = dd;
            LatTrackingLostShow = TrackingLostShow;
        } catch (e) {
            console.log("update gui exeption ");
        }
    }
    //--------------------------------------
    function ShowErr(txt) {
        if (document.getElementById("errid").style.display != "none") return;
        CloseWebCam();
        if (Logg) Logg("ShowErr:" + txt, 2);
        GUIState = 'Err';
        document.getElementById("errid").style.display = "block";
        //if(document.getElementById("errid").style.display == "none")// second err
        document.getElementById("errmsgid").innerHTML = txt;
        UpdateGUI(_GazeData);
        if (GazeCloudAPI.OnError != null) GazeCloudAPI.OnError(txt);
    }
    ////////////////////end Gui////////////////
    this.get_browser_info = get_browser_info;

    function get_browser_info() {
        var ua = navigator.userAgent,
            tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {
                name: 'IE ',
                version: (tem[1] || '')
            };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
            if (tem != null) {
                return {
                    name: 'Opera',
                    version: tem[1]
                };
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
    }
////////////////////////////////////////
    /* Close fullscreen */
    function closeFullscreen() {
        return;
        if (false) {
            var isMobile = window.orientation > -1;
            if (isMobile) {
                return;
            }
        }
        try {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE/Edge */
                document.msExitFullscreen();
            }
        } catch (error) {
            ;
        }
    }
    ////////////////////////////////////////
    /////////////////////API/////////////////////////
    function ResetIntervals() {
        try {
            if (isWaitForAutoryzation != null) {
                clearTimeout(isWaitForAutoryzation);
                isWaitForAutoryzation = null;
            }
            if (_LoopSlotWait != null) {
                clearInterval(_LoopSlotWait);
                _LoopSlotWait = null;
            }
        } catch (e) {}
    }
    //--------------------
    var bStarted = false;

    function StartGazeFlow() {
        RestlzwStream();
        if (bStarted) return;
        if (bStarted) CloseWebCam();
        bStarted = true;
        InitGUI();
        if (true) {
            ResetIntervals();
            document.getElementById("waitslotid").style.display = 'none';
            document.getElementById("errid").style.display = "none";
            document.getElementById("errmsgid").innerHTML = "";
            // camid.style = ' z-index: 1000;position:absolute; left:50%; top:2%  ; margin-left: -160px; ';
            // camid.style.marginLeft = -camid.scrollWidth / 2;
        }
        GazeResultEvents = [];
        if (typeof GetCloudAdresInfo != null) {
            if (typeof GetCloudAdresInfo.err !== 'undefined')
                if (GetCloudAdresInfo.err != null)
                    if (GetCloudAdresInfo.err != "") {
                        ShowErr(GetCloudAdresInfo.err);
                        return;
                    }
        }
        OpenWebCam();
        //if(false ) /// connect after camera allow acess
        //  Connect();
        if (Logg) Logg("StartGazeFlow", 2);
    }
    //----------------------------------
    function StopGazeFlow() {
        try {
            SendStat();
            CloseWebCam();
            HideGUI();
            if (Logg) Logg("StopGazeFlow", 2);
            bStarted = false;
        } catch (error) {
            ;
        }
    }
    //----------------------------------
    window.addEventListener("beforeunload", function(e) {
        //CloseWebCam();
        GazeCloudAPI.StopEyeTracking();
    }, false);
//---------------------------------------
//---------------------------------------
    ////////////log///////////////////
    if (true) {
        var info = get_browser_info();
        info.platform = navigator.platform;
        info.userAgent = navigator.userAgent;
        info.Media = MediaInfo;
        var myJSON = JSON.stringify(info);
        Logg(myJSON, type = -1);
    }

    function Logg(txt, type = 0) {
        try {
            let req = new XMLHttpRequest();
            let formData = new FormData();
            req.withCredentials = false;
            //formData.append("RecordinSesionId", RecordinSesionId);
            formData.append("log", txt);
            formData.append("type", type);
            req.open("POST", 'https://api.gazerecorder.com/Logs.php');
            req.send(formData);
        } catch (e) {}
    }
    if (true) window.addEventListener('DOMContentLoaded', function(event) {
        if (Logg) Logg("GazeCloundAPI v:1.0.1 ", 2);
    });
} //end GazeCloudAPIInit
/////////Version 1.0.0///////////
var StartGazeFlow = GazeCloudAPI.StartEyeTracking;
var StopGazeFlow = GazeCloudAPI.StopEyeTracking;

function InitOldAPI() {
    try {
        if (typeof OnResult !== 'undefined') GazeCloudAPI.OnResult = OnResult;
        if (typeof OnCalibrationComplete !== 'undefined') GazeCloudAPI.OnCalibrationComplete = OnCalibrationComplete;
        if (typeof OnCalibrationFail !== 'undefined') GazeCloudAPI.OnCalibrationFail = OnCalibrationFail;
        if (typeof OnStopGazeFlow !== 'undefined') GazeCloudAPI.OnStopGazeFlow = OnStopGazeFlow;
        if (typeof OnCamDenied !== 'undefined') GazeCloudAPI.OnCamDenied = OnCamDenied;
        if (typeof OnError !== 'undefined') GazeCloudAPI.OnError = OnError;
    } catch (e) {}
}
/////////end Version 1.0.0///////////
