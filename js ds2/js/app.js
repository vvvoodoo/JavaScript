window.currenciesBackup = [];

function filterCurrencies(searchValue) {
	var result = [];
	for(var currency of currenciesBackup) {
	  var currencyName = currency.txt.toLowerCase();
	  if(currencyName.indexOf(searchValue) >= 0) {
		 result.push(currency);
	  }
	}
	renderCurrencies(result);
 }

function renderCurrencies(currencies) {
	var htmlString = '';

	if(!currencies.length) {
		htmlStr = `<tr><td colspan="2" class="text-center">No Items Found</td></tr>`;
		document.getElementById('currencies').innerHTML = htmlStr;
		return;
	 }

	for (var currency of currencies) {
		htmlString += `<tr>
			<td>${currency.txt}</td>
			<td>${currency.rate}</td>			
		</tr>`
	}

	document.getElementById('currencies').innerHTML = htmlString;

}	

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221112&json').then(res => res.json()).then(function(data) {
	window.currenciesBackup = data;
	renderCurrencies(data);
});

var search = document.getElementById('search');

search.onkeyup = function(e) {
	var searchValue = e.currentTarget.value;
	filterCurrencies(searchValue.trim().toLowerCase());
}


