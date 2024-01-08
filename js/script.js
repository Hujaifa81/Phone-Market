const dataLoad = async (fieldValue,showAllBtnClicked) => {
  /* fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
  .then(res=>res.json())
  .then(data=>console.log(data)); */
  const value = fieldValue;
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,showAllBtnClicked);
}
const displayPhones = (phones,showAllBtnClicked) => {
  const mainDiv = document.getElementById("mainDiv");
  const showAllBtn = document.getElementById("showAllBtn");
  if (phones.length > 6 && !showAllBtnClicked) {
    phones = phones.slice(0, 6);
    showAllBtn.classList.remove('hidden');

  }
  else {
    showAllBtn.classList.add('hidden');
  }
  document.getElementById('spinner').classList.add('hidden');
  mainDiv.innerText = "";
  phones.forEach((phone) => {
    //console.log(phone);
    const div = document.createElement('div');
    div.classList = `card bg-gray-100 w-96 shadow-xl border-4 border-red-500 my-5`;
    div.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          
          <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick="dataForModal('${phone.slug}')">Show details</button>
          </div>
        </div>`
    mainDiv.appendChild(div);
  });

}
const searchText = (showAllBtnClicked) => {
  const fieldValue = document.getElementById("searchField").value;
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('hidden');
  dataLoad(fieldValue,showAllBtnClicked);


}
const showAll = () => {
  if(document.getElementById("searchField").value===""){
    dataLoad("apple",true);
  }
  else{
    searchText(true);
  }
  
}
const dataForModal=async (id)=>{
  const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data= await res.json()
  const phoneForDetails=data.data;
  modal(phoneForDetails);
}
const modal=(phoneD)=>{
  document.getElementById('showDetails').innerHTML=`<h1>Name: ${phoneD.name}</h1>
  <h1>Release Date:${phoneD.releaseDate?phoneD.releaseDate:"not found"}</h1>
  <h1>storage:${phoneD.mainFeatures.storage}</h1>`
  console.log(phoneD);
  my_modal_1.showModal();
}
dataLoad("apple");