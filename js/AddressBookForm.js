window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}[ : ][A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name.value)) nameError.textContent = "";
        else nameError.textContent = "Name is Incorrect";
    })

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function () {
        let phoneRegex = RegExp('^(?=.+)[0-9]{0,3}[0-9]{10}$');
        if (phoneRegex.test(phone.value)) phoneError.textContent = "";
        else phoneError.textContent = "Phone Number is Incorrect";
    })

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        let addressRegex = RegExp('.*');
        if (addressRegex.test(address.value)) addressError.textContent = "";
        else addressError.textContent = "Address is Incorrect";
    })
});

const save = () => {
    try{
        let contactList = createAddressBook();
        createAndUpdateStorage(contactList);
    } catch (e) {
        return;
    }
};

const createAddressBook = () => {
    
    let contactList = new AddressBookContact();

    try {
        contactList.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.name-error', e);
        throw e;
    }

    contactList.name = getInputValueById('#name');
    contactList.phone = getInputValueById('#phone');
    contactList.address = getInputValueById('#address');
    contactList.city = getInputValueById('#city');
    contactList.state = getInputValueById('#state');
    contactList.zip = getInputValueById('#zip');
    alert(contactList.toString());
    return contactList;
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

function createAndUpdateStorage(contactList) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList != undefined) {
        addressBookList.push(contactList);
    } else {
        addressBookList = [contactList];
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
};

const resetForm = () => {
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#address', '');
    setValue('#city', 'City');
    setValue('#state', 'State');
    setValue('#zip', '');
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}