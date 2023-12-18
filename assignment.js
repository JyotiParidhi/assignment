let nextpage = document.getElementById('nextpage');

let curpage = document.getElementById('curpage');

let error = document.getElementById("error");

let modal_close = document.getElementsByClassName('close');

let modal = document.getElementsByClassName('modal');

let newuser = document.getElementsByClassName('new1');

let dataas = document.getElementById('takedata');

let single_data = document.getElementById('single_data');

let next = document.getElementById('next');

let back = document.getElementById('back');

let backpage = document.getElementById('backpage');

let tr = ""

let tdd = ""

let lmt = ""

back.innerHTML = "";
backpage.innerHTML = "";
back.value = "";

nextpage.innerHTML = "";
next.innerHTML = "";



//leave

for (let i = 0; i < modal_close.length; i++) {

  modal_close[i].addEventListener("click", () => {

    for (let j = 0; j < modal_close.length; j++) {
      modal[j].classList.remove('block')
      modal[j].classList.add('none')
    }
  })
}


// Display

var valshow = 15;
function showrec(valuee) {
  valshow = valuee;
  showfunction(users);

  tdd = "";

  fetch("https://gorest.co.in/public-api/users?id=" + valshow)
    .then((data) => {
      return data.json()
    })
    .then((takedata) => {

      tdd = `<td>${takedata.data[0].id}</td>
    <td>${takedata.data[0].name} </td>
    
    <td>${takedata.data[0].email} </td>

    <td>${takedata.data[0].gender} </td>

    <td>${takedata.data[0].status} </td> `;

      single_data.innerHTML = tdd;
    })
    .catch((error) => {
      console.log(error);
    })
}


let showfunction = (cname) => {
  cname.classList.remove('none')
  cname.classList.add('block')
}


// load 

let pagen = 1;

backpage.addEventListener("click", () => {
  pagen = pagen - 1;
  loaddata()
})

nextpage.addEventListener("click", () => {

  pagen = pagen + 1;
  loaddata()
})




next.addEventListener("click", () => {
  pagen = next.value;
  loaddata()
})


back.addEventListener("click", () => {
  pagen = 1;
  loaddata()
})






loaddata();
function loaddata() {

  let url = `https://gorest.co.in/public-api/users?page=${pagen}`;

  fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((takedata) => {

      let limit = takedata.meta.pagination.limit;

      let page = takedata.meta.pagination.page;

      let tpages = takedata.meta.pagination.pages;

      let totalrecords = takedata.meta.pagination.total;

      curpage.innerHTML = page;
      back.innerHTML = "≪";
      backpage.innerHTML = page - 1;
      nextpage.innerHTML = page + 1;
      next.innerHTML = "≫";
      next.value = tpages;

      dataas.innerHTML = "";

      if (page - 1 == 0) {
        back.className += " none";
        backpage.className += " none";
      } else if (page - 1 > 0) {
        back.className = "";
        backpage.className = "";
      }

      if (page == tpages) {
        next.className += " none";
        nextpage.className += " none";
      } else {
        next.className = "";
        nextpage.className = "";
      }


      tr = "";
      for (let i in takedata.data) {
        tr += `<tr> <td>${takedata.data[i].id}</td>
    <td>${takedata.data[i].name} </td>
    <td>
<span class="span1"  onclick="showrec(${takedata.data[i].id})" id="show${takedata.data[i].id}" style="box-shadow: 10px 8px 5px #aaaaaa; color: white; background-color:#616161; border: solid; border-radius: 15px 50px">Show</span>
<span class="span1"  onclick="editrec(${takedata.data[i].id})" style="box-shadow: 10px 8px 5px #aaaaaa; background-color:MediumSeaGreen; border-radius: 15px 50px">Edit</span>
<span class="span1"  onclick="deleterec(${takedata.data[i].id})" style="box-shadow: 10px 8px 5px #aaaaaa; background-color:#ff4700; border-radius: 15px 50px">Delete</span>
    </td>
<tr>`;
      }

      dataas.innerHTML = tr;


    })


    .catch((error) => {

      error.innerHTML = "error Found";
      error.className = 'block';
    })
}



// update

var updatedata = document.getElementById("updatedata");

function editrec(valuee) {
  valshow = valuee;
  showfunction(editusers);

  tdd = "";

  fetch("https://gorest.co.in/public-api/users?id=" + valshow)
    .then((data) => {
      return data.json()
    })
    .then((takedata) => {

      tdd = ` 
<input type="text" id="id${takedata.data[0].id}" placeholder="User ID" value="${takedata.data[0].id}">

<input type="text" id="n${takedata.data[0].id}" placeholder="Name" value="${takedata.data[0].name}">

<input type="text" id="e${takedata.data[0].id}" placeholder="Email" value="${takedata.data[0].email}">
 
<input type="text" id="s${takedata.data[0].id}" placeholder="Status" value="${takedata.data[0].status}">

<input type="text" id="g${takedata.data[0].id}" placeholder="Genger" value="${takedata.data[0].gender}">
 
<input style="background-color: #3cb371" type="submit" id="su${takedata.data[0].id}" value="UPDATE" onclick="update_data(${takedata.data[0].id});">
`

      updatedata.innerHTML = tdd;
    })
    .catch((error) => {
      console.log(error);
    })
}

function update_data(idupdate) {
  console.log(idupdate);


  var id = document.getElementById(`id${idupdate}`);

  var name = document.getElementById(`n${idupdate}`);

  var email = document.getElementById(`e${idupdate}`);

  var gender = document.getElementById(`g${idupdate}`);

  var status = document.getElementById(`s${idupdate}`);

  var dataaa = JSON.stringify({
    id: id.value,
    name: name.value,
    email: email.value,
    gender: gender.value,
    status: status.value
  })

  console.log(dataaa)

  var urll = `https://gorest.co.in/public-api/users/${idupdate}`;

  fetch(urll, {
    method: 'PUT',
    body: dataaa,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      return response.json()
      console.log(response.json());
    })

    .then((json) => {
      alert("finel update result : " + json.data.message);

      for (let j = 0; j < modal_close.length; j++) {
        modal[j].classList.remove('block')
        modal[j].classList.add('none')
      }
    })
    .catch((error) => {
      alert('update error')

      for (let j = 0; j < modal_close.length; j++) {
        modal[j].classList.remove('block')
        modal[j].classList.add('none')
      }

    })


}



// save 

function davedata() {

  var id = document.getElementById('id');

  var name = document.getElementById('name');

  var email = document.getElementById('email');

  var gender = document.getElementById('gender');

  var status = document.getElementById('status');

  var dataaa = JSON.stringify({
    id: id.value,
    name: name.value,
    email: email.value,
    gender: gender.value,
    status: status.value
  })

  fetch('https://gorest.co.in/public-api/users', {
    method: 'POST',
    body: dataaa,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {

      alert("finel Insert result : " + json.data.message);
      ;

      var form = document.getElementById("form");

      for (let j = 0; j < modal_close.length; j++) {
        modal[j].classList.remove('block')
        modal[j].classList.add('none')
      }
      form.reset();

    })
    .catch((error) => {
      console.log(error)
    })


}




// delete 


function deleterec(iddd) {

  var urll = `https://gorest.co.in/public-api/users/${iddd}`;


  fetch(urll, {
    method: 'DELETE',
  }).then((asdf) => {
    return asdf.json();
  })
    .then((asdf) => {
      alert("Delete Message : " + asdf.data.message);
    })
    ;
}