const loadPhone = async (searchPhone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phoneList = data.data;
    displayPhones(phoneList);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container section before adding 
    phoneContainer.innerHTML = '';
    if(phones.length>9){
        document.getElementById('show-container').classList.remove('hidden');
    }
    else{
        document.getElementById('show-container').classList.add('hidden');
    }
    //display only 9 phone
    phones = phones.slice(0,9);
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-2 bg-base-100 shadow-xl';
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

const handleSearch = ()=>{
    const searchText = document.getElementById('search-field').value;
    toggleLoading(true);
    loadPhone(searchText);
    // toggleLoading(false);
}

const toggleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}