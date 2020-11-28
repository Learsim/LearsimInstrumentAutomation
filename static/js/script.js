let config = {
    "Offset": "NaN",
    "Current" : "0-0-0-0",
    "Port" :"0000",
    "Sequences": [
        {
            "Name":"NaN",
            "GUID" :"0-0-0-0",
            "Steps": []
        }
    ]
        
}

let selected = null;
function onload(){
    getConfig()
    
   
    
   
    
}
function setActive(seq){
    
    var steps = document.getElementById("steps");
    steps.innerHTML = "";
   
    let num = 1;
    seq.Steps.forEach(element => {

        var step = document.createElement("div");
        step.className = "h-10 rounded shadow-sm bg-white p-1 m-1 flex content-center justify-between step hover:bg-blue-500 hover:text-white cursor-pointer flex";
        step.id = num;
        var type = document.createElement("span");
        var atr = document.createElement("span");
        var stepnum = document.createElement("span");
        type.innerHTML = element.type;
        stepnum.innerHTML = num;
        type.className = "flex-1 text-center  m-auto pointer-events-none";
        atr.className = "flex-1 text-center  m-auto pointer-events-none";
        stepnum.className = "flex-1 text-center  m-auto pointer-events-none";
        num += 1;
        
        switch(element.type){
            case "move":
                atr.innerHTML = ('x: ' + element.x + ' y: '+element.y);
                break;
            case "drag":
                atr.innerHTML = ('x: ' + element.x + ' y: '+element.y + ' Duration: '+element.duration);
                break;
            case "popout":
                atr.innerHTML = ('x: ' + element.x + ' y:'+element.y);
                break;
            case "mouseClick":
                atr.innerHTML = ('x: ' + element.x + ' y:'+element.y + ' Button: '+element.key);
                break;
            case "keyPress":
                atr.innerHTML = ('Key: '+ element.key + ' Duration: '+element.duration);
                break;
            case "delay":
                atr.innerHTML = ('Duration: '+ element.duration);
                break;
            case "combinationPress":
                atr.innerHTML = ("Key1: "+element.key1 + " Key2: "+ element.key2);
            default:
                break;
        }

        steps.appendChild(step);
        step.appendChild(type);
        step.appendChild(atr);
        step.appendChild(stepnum);
    }); 
    
}
window.onclick = e => {
    if(e.target.className.includes("step")){

        
        e.target.className = "h-10 rounded text-white shadow-xl bg-green-500 p-1 m-1 flex content-center justify-between step m-auto mt-1 mb-1";
        if(selected != null){
            document.getElementById(selected).className = "h-10 rounded shadow-sm bg-white p-1 m-1 flex content-center justify-between step hover:bg-blue-500 hover:text-white cursor-pointer flex";
        }
        if(selected == e.target.id){
            return
        }
        selected = e.target.id;
        document.getElementById("typeselector").disabled = false;
        document.getElementById("removestep").disabled = false;
        config.Sequences.forEach(element => {
            if(element.GUID == config.Current){
                currentconfig = element;
            }
        });
        
        if(selected == 1){
            document.getElementById("moveupbtn").disabled = true;
            document.getElementById("movedownbtn").disabled = false;

        }else if(selected == currentconfig.Steps.length){
            document.getElementById("moveupbtn").disabled = false;
            document.getElementById("movedownbtn").disabled = true;
        }else{
            document.getElementById("moveupbtn").disabled = false;
            document.getElementById("movedownbtn").disabled = false;
        }
        typeSelector = document.getElementById("typeselector");
        typeSelector.value = currentconfig.Steps[selected-1].type;
        selectionContainer = document.getElementById("selectioncontainer"); 
        selectionContainer.innerHTML = ""
        switch(currentconfig.Steps[selected-1].type){
            case "move":
                var xin = document.createElement("input");
                var yin = document.createElement("input");
                xin.addEventListener ("change", inputChange);
                yin.addEventListener ("change", inputChange);
                var xtitle = document.createElement("span");
                var ytitle = document.createElement("span");
                xin.value = currentconfig.Steps[selected-1].x;
                yin.value = currentconfig.Steps[selected-1].y;
                xin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                yin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                xtitle.innerHTML="X:";
                ytitle.innerHTML="Y:";
                xin.title = "x"
                yin.title = "y"
                selectionContainer.appendChild(xtitle)  
                selectionContainer.appendChild(xin)   
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(ytitle)
                selectionContainer.appendChild(yin)      
                break;
            case "drag":
                var xin = document.createElement("input");
                var yin = document.createElement("input");
                var durin =document.createElement("input");
                xin.addEventListener ("change", inputChange);
                yin.addEventListener ("change", inputChange);
                durin.addEventListener ("change", inputChange);
                var durtitle = document.createElement("span");   
                var xtitle = document.createElement("span");
                var ytitle = document.createElement("span");
                xin.value = currentconfig.Steps[selected-1].x;
                yin.value = currentconfig.Steps[selected-1].y;
                durin.value = currentconfig.Steps[selected-1].duration;
                xin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                yin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                durin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                xin.title = "x"
                yin.title = "y"
                durin.title = "duration"
                xtitle.innerHTML="X:";
                ytitle.innerHTML="Y:";
                durtitle.innerHTML ="Duration (s):"
                selectionContainer.appendChild(xtitle)  
                selectionContainer.appendChild(xin)   
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(ytitle)
                selectionContainer.appendChild(yin)      
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(durtitle)      
                selectionContainer.appendChild(durin)      
                
                break;
            case "popout":
                var xin = document.createElement("input");
                var yin = document.createElement("input");
                xin.addEventListener ("change", inputChange);
                yin.addEventListener ("change", inputChange);
                var xtitle = document.createElement("span");
                var ytitle = document.createElement("span");
                xin.value = currentconfig.Steps[selected-1].x;
                yin.value = currentconfig.Steps[selected-1].y;
                xin.title = "x"
                yin.title = "y"
                xin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                yin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                xtitle.innerHTML="X:";
                ytitle.innerHTML="Y:";
                selectionContainer.appendChild(xtitle)  
                selectionContainer.appendChild(xin)   
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(ytitle)
                selectionContainer.appendChild(yin)      
                break;
            case "mouseClick":
                var xin = document.createElement("input");
                var yin = document.createElement("input");
                var btnin = document.createElement("input");
                xin.addEventListener ("change", inputChange);
                yin.addEventListener ("change", inputChange);
                btnin.addEventListener ("change", inputChange);
                var btntitle = document.createElement("span");   
                var xtitle = document.createElement("span");
                var ytitle = document.createElement("span");
                xin.value = currentconfig.Steps[selected-1].x;
                yin.value = currentconfig.Steps[selected-1].y;
                btnin.value =currentconfig.Steps[selected-1].key;
                xin.title = "x"
                yin.title = "y"
                btnin.title = "key"
                xin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                yin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                btnin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                xtitle.innerHTML="X:";
                ytitle.innerHTML="Y:";
                btntitle.innerHTML ="Button: "
                selectionContainer.appendChild(xtitle)  
                selectionContainer.appendChild(xin)   
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(ytitle)
                selectionContainer.appendChild(yin)      
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(btntitle)
                selectionContainer.appendChild(btnin)
                break;
            case "keyPress":
                var keyin = document.createElement("input");
                var keytitle = document.createElement("span");
                
                var durin =document.createElement("input");
                var durtitle = document.createElement("span");   
                keyin.addEventListener ("change", inputChange);
                durin.addEventListener ("change", inputChange);
                durin.value = currentconfig.Steps[selected-1].duration;
                keyin.value =  currentconfig.Steps[selected-1].key;
                keyin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                durin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                keyin.title = "key"
                durin.title = "duration"

                keytitle.innerHTML="Key: ";
                durtitle.innerHTML ="Duration (s):"
                selectionContainer.appendChild(keytitle)  
                selectionContainer.appendChild(keyin)        
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(durtitle)      
                selectionContainer.appendChild(durin)      
                break;
            case "delay":
                var durin =document.createElement("input");
                var durtitle = document.createElement("span");   
                durin.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                durtitle.innerHTML ="Duration (s):"
                durin.value = currentconfig.Steps[selected-1].duration;
                durin.addEventListener ("change", inputChange);
                durin.title = "duration"
                selectionContainer.appendChild(durtitle)      
                selectionContainer.appendChild(durin)    
                break;
            case "combinationPress":
                var key1in = document.createElement("input");
                var key1title = document.createElement("span");
                
                var key2in =document.createElement("input");
                var key2title = document.createElement("span");   
                key1in.addEventListener ("change", inputChange);
                key2in.addEventListener ("change", inputChange);
                key1in.title = "key1"
                key2in.title = "key2"
                key1in.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";
                key2in.className = "mt-1 relative rounded-md shadow-sm border-2 p-1 border-gray-100";

                key1in.value =  currentconfig.Steps[selected-1].key1;
                key2in.value =  currentconfig.Steps[selected-1].key2;


                key1title.innerHTML="Key1: ";
                key2title.innerHTML="Key2: ";
                
                selectionContainer.appendChild(key1title)  
                selectionContainer.appendChild(key1in)        
                selectionContainer.appendChild(document.createElement("br")) 
                selectionContainer.appendChild(key2title)  
                selectionContainer.appendChild(key2in) 
            default:
                break;
        }





        
   }}

function moveup(){
    config.Sequences.forEach(element => {
        if(element.GUID == config.Current){
            currentconfig = element;
        }
    });
    tempStep = currentconfig.Steps[selected-1]
    currentconfig.Steps[selected-1] =  currentconfig.Steps[selected-2]
    currentconfig.Steps[selected-2] = tempStep
    selected = parseInt(selected)-1
    if(selected == 1){
        document.getElementById("moveupbtn").disabled = true;
        document.getElementById("movedownbtn").disabled = false;

    }else if(selected == currentconfig.Steps.length){
        document.getElementById("moveupbtn").disabled = false;
        document.getElementById("movedownbtn").disabled = true;
    }else{
        document.getElementById("moveupbtn").disabled = false;
        document.getElementById("movedownbtn").disabled = false;
    }
    setActiveAsSeq();
    document.getElementById(selected).className = "h-10 rounded text-white shadow-xl bg-green-500 p-1 m-1 flex content-center justify-between step m-auto mt-1 mb-1";
    
    
} 
function movedown(){

    config.Sequences.forEach(element => {
        if(element.GUID == config.Current){
            currentconfig = element;
        }
    });
    tempStep = currentconfig.Steps[selected]
    currentconfig.Steps[selected] =  currentconfig.Steps[selected-1]
    currentconfig.Steps[selected-1] = tempStep
    selected = parseInt(selected)+1
    if(selected == 1){
        document.getElementById("moveupbtn").disabled = true;
        document.getElementById("movedownbtn").disabled = false;

    }else if(selected == currentconfig.Steps.length){
        document.getElementById("moveupbtn").disabled = false;
        document.getElementById("movedownbtn").disabled = true;
    }else{
        document.getElementById("moveupbtn").disabled = false;
        document.getElementById("movedownbtn").disabled = false;
    }
    setActiveAsSeq();
    document.getElementById(selected).className = "h-10 rounded text-white shadow-xl bg-green-500 p-1 m-1 flex content-center justify-between step m-auto mt-1 mb-1";

    
}
function setActiveAsSeq(){
    config.Sequences.forEach(element => {

        if(element.GUID == config.Current){
            setActive(element)
        }
    });
}
function changeActive(event)
{
    document.getElementById("typeselector").disabled = true;
 config.Current = event.value;
 config.Sequences.forEach(element => {
    if(element.GUID == config.Current){
        setActive(element)
        selected = null;
    }
 });
 document.getElementById("selectioncontainer").innerHTML = ""
}

function inputChange(event){
    
    config.Sequences.forEach(element => {
        if(element.GUID == config.Current){
            element.Steps[selected-1][event.target.title] = [event.target.value]
        }
    });
    setActiveAsSeq();
    document.getElementById(selected).className = "h-10 rounded text-white shadow-xl bg-green-500 p-1 m-1 flex content-center justify-between step m-auto mt-1 mb-1";

}
function changeType(event){
    config.Sequences.forEach(element => {
        if(element.GUID == config.Current){
            element.Steps[selected-1] = {}
            switch(event.target.value){
                case "move":
                    element.Steps[selected-1]['type'] = "move"
                    element.Steps[selected-1]['x'] = 1
                    element.Steps[selected-1]['y'] = 1

                    break;
                case "drag":
                    element.Steps[selected-1]['type'] = "drag"
                    element.Steps[selected-1]['x'] = 1
                    element.Steps[selected-1]['y'] = 1
                    element.Steps[selected-1]['duration'] = 1
                    break;
                case "popout":
                    element.Steps[selected-1]['type']  = "popout"
                    element.Steps[selected-1]['x'] = 1
                    element.Steps[selected-1]['y'] = 1

                    break;
                case "mouseClick":
                    element.Steps[selected-1]['type']  = "mouseClick"
                    element.Steps[selected-1]['x'] = 1
                    element.Steps[selected-1]['y'] = 1
                    element.Steps[selected-1]['key'] = "left"
                    break;
                case "keyPress":
                    element.Steps[selected-1]['type']  = "keyPress"
                    element.Steps[selected-1]['duration'] = 1
                    element.Steps[selected-1]['key'] = "a"

                    break;
                case "delay":
                    element.Steps[selected-1]['type']  = "delay"
                    element.Steps[selected-1]['duration'] = 1
                    break;
                case "combinationPress":
                    element.Steps[selected-1]['type']  = "combinationPress"
                    element.Steps[selected-1]['key1'] = "ctrl"
                    element.Steps[selected-1]['key2'] = "a"
                    break;
                default:
                    break;
        }
    }});
    setActiveAsSeq();
    document.getElementById(selected).className = "h-10 rounded text-white shadow-xl bg-green-500 p-1 m-1 flex content-center justify-between step m-auto mt-1 mb-1";

}
function updateConfig(event){

    switch(event.target.id){
        case("adrinput"):
            config.Offset = event.target.value;
        break;
        case("portinput"):
            config.Port = event.target.value;

        break;
        default:
            break;
    }
}
function saveConfig(){
    delete config["ServerOffset"];
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","SaveConfig",true)
    xhttp.send(JSON.stringify(config))
}



function getConfig(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var respobj = JSON.parse(this.responseText);
          config = respobj
          var activeSelect = document.getElementById("activeSelect");
          activeSelect.innerHTML = ""
          config.Sequences.forEach(element => {
              var x = document.createElement("option");
              x.text = element.Name;
              x.value = element.GUID;
              activeSelect.add(x)
              if(element.GUID == config.Current){
                  setActive(element)
              }
          });
          document.getElementById("typeselector").addEventListener ("change", changeType);
          document.getElementById("adrinput").value = config.Offset;
          document.getElementById("portinput").value = config.Port;
          document.getElementById("adrinput").addEventListener("change",updateConfig)
          document.getElementById("portinput").addEventListener("change",updateConfig)
          
          document.getElementById("selectioncontainer").innerHTML = ""
          document.getElementById("typeselector").disabled = true
          document.getElementById("moveupbtn").disabled = true
          document.getElementById("movedownbtn").disabled = true
          selected = null
          if(config.Offset != config.ServerOffset){
              document.getElementById("newoffsetcontainer").style.visibility = "visible";
          }
        document.getElementById('steps').scrollTop = 0;
          
        }
      };
    xhttp.open("GET","GetConfig",true);
    xhttp.send()
}
function changeToNewAdress(){
    config.Offset = config.ServerOffset;
    document.getElementById("newoffsetcontainer").style.visibility = "hidden";
    document.getElementById("adrinput").value = config.Offset;

}
function addNewStep(top){
    
    config.Sequences.forEach(element => {
        if(element.GUID == config.Current){
            currentconfig = element;
        }
    });
    if(top){
        currentconfig.Steps.unshift({"type":"move","x":1,"y":1})
        setActiveAsSeq()
        document.getElementById('steps').scrollTop = 0;

    }else{
        currentconfig.Steps.push({"type":"move","x":1,"y":1})
        setActiveAsSeq()
        document.getElementById('steps').scrollTop = 99999999;

    }


}
function removeStep(){
    config.Sequences.forEach(element => {
        if(element.GUID == config.Current){
            currentconfig = element;
        }
    });
    currentconfig.Steps.splice(selected-1,1)
    selected = null
    document.getElementById("typeselector").disabled = true
    document.getElementById("selectioncontainer").innerHTML = ""
    document.getElementById("removestep").disabled = true

    setActiveAsSeq()
}