
let boroughBtnLstnArr = document.getElementsByClassName("boroughBtn")

for (var i = 0; i < boroughBtnLstnArr.length; i++) {
    boroughBtnLstnArr[i].addEventListener('click', (e) => {
        const borough = e.target.innerText
        console.log(borough);
        displayComplaints(borough)
        e.preventDefault()
    })
}

async function displayComplaints(borough) {
    
    clearComplaints()
    
    let numOfComplaints = document.querySelector(".inputBox").value
    if (numOfComplaints === "" || numOfComplaints <= 0) {
        numOfComplaints = 10
    }
    
    let url = `https:data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${borough}`
    
    // let div = document.querySelector(".list-complaints")
    
    const response = await fetch(url)
    var data = await response.json()
    
    console.log(data);
    console.log(data.length);
    
    const div = document.createElement("div")
    
    for(let i=0; i < numOfComplaints; i++) {
        div.textContent = data[i].complaint_type
        let divClone = div.cloneNode(true)
        divClone.id = i
        document.body.appendChild(divClone)
        console.log(data[i].complaint_type);
    }
    addButton(data)
}

function clearComplaints() {
    while (document.body.querySelector("div") !=null) document.body.querySelector("div").remove()
}

function addButton(data) {
    const but = document.createElement('button')
    but.className = "resolution"
    but.innerText = "WHAT DID THE POLICE DO?"
    divArr = document.body.getElementsByTagName("div")
    for (let i = 0; i < divArr.length; i++) {
        divArr[i].appendChild(but.cloneNode(true)) 
    }

    let resolutionBtnLstnrArr = document.getElementsByClassName("resolution")
    let p = document.createElement("p")

    for (var i = 0; i < resolutionBtnLstnrArr.length; i++) {
        
        resolutionBtnLstnrArr[i].addEventListener('click', (e) => {

            let parent = e.target.parentNode;

            if(parent.querySelector("p") != null){

                parent.querySelector("p").remove();

            } else {

                p.textContent = data[e.target.parentNode.id].resolution_description;
                parent.appendChild(p.cloneNode(true));

            }
      });
    }

}