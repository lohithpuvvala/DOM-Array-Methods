const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let userData = [];

//Fetch Random User and Add Money.
async function getRandomUser()
{
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*10**6)
    };
    
    addData(newUser);
}

function addData(newUser){
    userData.push(newUser);
    updateDOM();
}

//updateDOM
function updateDOM(providedData = userData){
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;

        main.appendChild(element);
    });
}

//Doubles all the Wealth in UserData
function doubleMoney(){
    userData = userData.map(user => {
        return{name: user.name,money: user.money * 2};
});
    updateDOM(updatedUserData);
}

//format number as money
function formatMoney(number)
{
    return  "$ "+(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleMoneyBtn.addEventListener('click',doubleMoney);