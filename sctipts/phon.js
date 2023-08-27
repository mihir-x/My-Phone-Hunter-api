
//getting data from server and calling display methods
const loadPhone = async (searchPhone, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phoneList = data.data;
    displayPhones(phoneList, isShowAll);
}

//displaying process
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container section before adding 
    phoneContainer.innerHTML = '';
    if(phones.length>9 && !isShowAll){
        document.getElementById('show-container').classList.remove('hidden');
    }
    else{
        document.getElementById('show-container').classList.add('hidden');
    }
    console.log('the value of show all ', isShowAll);
    //display only 9 phone if show all is false
    if(!isShowAll){
        phones = phones.slice(0,9);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-2 bg-base-100 shadow-xl';
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleDetail('${phone.slug}')" class="btn btn-primary">Details</button>
          </div>
        </div>
        `;
        
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

//search and display phone card on website after search button click
const handleSearch = (isShowAll)=>{
    const searchText = document.getElementById('search-field').value;
    toggleLoading(true);
    loadPhone(searchText, isShowAll);
}

//show loading indicator
const toggleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

//show all the remaining phone card after show all button click
const handleShowAll = () =>{
    handleSearch(true)
}

//detail clicked
const handleDetail = async (id) =>{
    //load the data of phone id
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
}