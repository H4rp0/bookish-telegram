// ==UserScript==
// @name         CoinMarketCap Gainers Plus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  CoinMarketCap Gainers & Losers interface update
// @author       BriceM
// @match        *://coinmarketcap.com/gainers-losers/
// @icon         https://www.google.com/s2/favicons?domain=coinmarketcap.com
// @grant        none
// ==/UserScript==

//GM_addStyle("uikit-col-md-8 uikit-col-sm-16 { flex : none; max-width = 100%; }");

(function() {
    'use strict';

    // Gainers on top of Losers, not aside
    var divsGainersLosers= document.getElementsByClassName('uikit-col-md-8 uikit-col-sm-16');
    for (const currDiv of divsGainersLosers){

        //console.log(currDiv);
        currDiv.style.flex = "none";
        currDiv.style.maxWidth = "100%";

    }

    var thead = document.getElementsByTagName('thead')[0];
    //console.log("test");
    var trToCopy = thead.firstChild.firstChild; // thead -> tr -> th
    var newTr = trToCopy.cloneNode(true); // copie le th "#"
    newTr.innerHTML = "Plus";

    var priceTr = thead.firstChild.children[2]; // tr des prix
    thead.firstChild.insertBefore(newTr, priceTr);

    var tbody = document.getElementsByTagName('tbody')[0];

//    var contractAddress, contractExplorerUrl;

    for (let node of tbody.childNodes) { //pour chaque tr
        // tbody > tr > td


        var tokenUrl = node.children[1].firstChild.href;
        //console.log(tokenUrl);
        //var tdata = getDataFromPage(tokenUrl);
        //console.log(tdata.etherscanUrl);
        //console.log(getDataFromPage(tokenUrl));
        let xhr = new XMLHttpRequest();

        // getting the token data from the link
        xhr.open("GET", tokenUrl);

        xhr.responseType = "document";

        xhr.send();

        xhr.onload = function(){

            if (xhr.readyState == 4 && xhr.status == 200){

                /*
                var tokenData = {
                    contract : "",
                    etherscanUrl : ""
                }
                */

                var docPage = xhr.response;
                const jsonData = JSON.parse(docPage.getElementById("__NEXT_DATA__").text);



                //console.log(jsonData.props.initialProps.pageProps.info.platforms[0]);//.contractAddress
                console.log(jsonData.props.initialProps.pageProps.info.platforms[0].contractAddress);
                var contractAddress = jsonData.props.initialProps.pageProps.info.platforms[0].contractAddress; //"0xea3983fc6d0fbbc41fb6f6091f68f3e08894dc06"
                var contractExplorerUrl = jsonData.props.initialProps.pageProps.info.platforms[0].contractExplorerUrl; // "https://etherscan.io/token/0xea3983fc6d0fbbc41fb6f6091f68f3e08894dc06"



                var tdToCopy = node.children[2];
                var newTd = tdToCopy.cloneNode(true); // clone la 1e colonne
                var priceTd = node.children[2]; // td des prix
                //console.log(priceTd.innerHTML);
                //console.log(contractAddress);
                var tokenSymbol = node.querySelector("td:nth-child(2) > a > div > div > div > p").innerText;
                //console.log(tokenSymbol);
                newTd.setAttribute("style", "text-align : left");
                newTd.innerHTML = `
<div style="display: inline-flex; font-size : 10px;">
	<div style="padding-right : 10px">
            <b>Infos</b>
            <ul>
                <li><a style="" href="` + contractExplorerUrl + `"> token info</a></li>
            </ul>
	</div>
	<div style="padding-right : 10px">
            <b>Charts</b>
            <ul>
                <li><a href="https://ftx.com/trade/` + tokenSymbol + `/USD"><img src="https://www.google.com/s2/favicons?domain=ftx.com" alt="FTX">FTX</a></li>
                <li><a href="https://poocoin.app/tokens/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=poocoin.app" alt="Poocoin">Poocoin</a></li>
            </ul>
	</div>
	<div style="padding-right : 10px">
		<b>Scam analyse</b>
		<ul>
            <li><a href="https://tokensniffer.com/token/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=tokensniffer.com" alt="TokenSniffer">TokenSniffer</a></li>
            <li><a href="https://honeypot.is/?address=` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=honeypot.is" alt="HoneyPot.is">HoneyPot.is</a></li>
        </ul>
	</div>
	<div style="padding-right : 10px">
        <ul>
            <li><a href="https://moonarch.app/token/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=moonarch.app" alt="MonArch.app">MonArch.app</a></li>
            <li><a href="https://www.team.finance/view-coin/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=team.finance" alt="Team.finance">Team.finance</a></li>
		</ul>
	</div>
</div>
`;
                //console.log(newTd.innerHTML);
                // urls à ajouter :
                // infos
                // https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
                // trade/charts
                // https://ftx.com/trade/XRP/USD
                // https://poocoin.app/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c
                // scam
                // https://tokensniffer.com/token/0x78f334cffbc3b6a10494ec9e5c8cd7892cf309d0
                // https://honeypot.is/?address=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
                // https://moonarch.app/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
                // https://www.team.finance/view-coin/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
                node.insertBefore(newTd, priceTd);





            } else {

                //console.log("ko");
                //return
            }
        }


    }
    // Your code here...
})();