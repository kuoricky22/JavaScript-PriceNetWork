let data = [];
let filterData = [];

document.addEventListener("DOMContentLoaded", function() { 
    callApiMethod();
    setTimeout(() => displayData(data), 1200);
});

const search = document.querySelector('.search');
const input = document.querySelector('#crop');
search.addEventListener('click', function(){
    if(input.value === '' || input.value === undefined){
        displayData(data)
        return;
    }
    filterData = data.filter(item => `${item.作物名稱}`.indexOf(input.value) !== -1);
    displayData(filterData);
})

const filterGroup = document.querySelector('.button-group');
filterGroup.addEventListener('click', function(e){
    filterType(e.target.getAttribute('data-type'))
})

const sortButton = document.querySelector('.js-sort-advanced');
sortButton.addEventListener('click', function(e){
    if(data.length === 0){
        return;
    }
    if(e.target.nodeName = 'I'){
        sortPrice(e.target.getAttribute('data-price'), e.target.getAttribute('data-sort'))
    }
})

const sortSelect = document.querySelector('#js-select');
sortSelect.addEventListener('change', function(){
    sortPrice(sortSelect.value, '');
})

//價格排序
function sortPrice(price, sort){
    filterData = data;

    if(sort === ''){
        sort = 'up';
    }
    switch (price){
        case '上價':
            if(sort === 'up'){
                filterData.sort((a, b) => {return b.上價 - a.上價})
            }
            else{
                filterData.sort((a, b) => {return a.上價 - b.上價})
            }
        break;
        case '中價':
            if(sort === 'up'){
                filterData.sort((a, b) => {return b.中價 - a.中價})
            }
            else{
                filterData.sort((a, b) => {return a.中價 - b.中價})
            }
        break;
        case '下價':
            if(sort === 'up'){
                filterData.sort((a, b) => {return b.下價 - a.下價})
            }
            else{
                filterData.sort((a, b) => {return a.下價 - b.下價})
            }
        break;
        case '平均價':
            if(sort === 'up'){
                filterData.sort((a, b) => {return b.平均價 - a.平均價})
            }
            else{
                filterData.sort((a, b) => {return a.平均價 - b.平均價})
            }
        break;
        case '交易量':
            if(sort === 'up'){
                filterData.sort((a, b) => {return b.交易量 - a.交易量})
            }
            else{
                filterData.sort((a, b) => {return a.交易量 - b.交易量})
            }
        break;     
    }
    displayData(filterData);
}

// 篩選作物
function filterType(type) {
    filterData = data.filter(item => item.種類代碼 === type);
    displayData(filterData);
}

// 呈現資料
function displayData(res){
    if(data.length === 0){
        alert('目前系統維修中，請稍等...');
        return;
    }

    let str = '';
    const list = document.querySelector('.showList');
    res.forEach(item => {
        str = str.concat(`<tr>
        <td>${item.作物名稱 === null ? '' : item.作物名稱}</td>
        <td>${item.市場名稱 === null ? '' : item.市場名稱}</td>
        <td>${item.上價 === null ? '0' : item.上價}元</td>
        <td>${item.中價 === null ? '0' : item.中價}元</td>
        <td>${item.下價 === null ? '0' : item.下價}元</td>
        <td>${item.平均價 === null ? '0' : item.平均價}元</td>
        <td>${item.交易量 === null ? '' : item.交易量}</td>
        </tr>`)
    });
    list.innerHTML = str;
}

// 透過 axios 取的API資料
function callApiMethod(){
    axios.post('https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx')
    .then(function(response){
        data = response.data;
    })
}
