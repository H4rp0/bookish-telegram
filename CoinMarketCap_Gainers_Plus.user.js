// ==UserScript==
// @name         CoinMarketCap Gainers Plus
// @namespace    http://tampermonkey.net/
// @version      0.01
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



                var contractAddress, contractExplorerUrl;

                try {
                    contractAddress = jsonData.props.initialProps.pageProps.info.platforms[0].contractAddress;
                    contractExplorerUrl = jsonData.props.initialProps.pageProps.info.platforms[0].contractExplorerUrl;
                } catch (e){
                    // inserer un td vide ?


                }

                //console.log(jsonData.props.initialProps.pageProps.info.platforms[0]);//.contractAddress
                //console.log(jsonData.props.initialProps.pageProps.info.platforms[0].contractAddress);
                //var contractAddress =  jsonData.props.initialProps.pageProps.info.platforms[0].contractAddress; //"0xea3983fc6d0fbbc41fb6f6091f68f3e08894dc06"
                //console.log(contractAddress);
                //var contractExplorerUrl = jsonData.props.initialProps.pageProps.info.platforms[0].contractExplorerUrl; // "https://etherscan.io/token/0xea3983fc6d0fbbc41fb6f6091f68f3e08894dc06"
                //var contractAddress = tokenData.contractAddress;
                //var contractExplorerUrl = tokenData.contractExplorerUrl;



                var tdToCopy = node.children[2];
                var newTd = tdToCopy.cloneNode(true); // clone la 1e colonne
                var priceTd = node.children[2]; // td des prix
                //console.log(priceTd.innerHTML);
                //console.log(contractAddress);

                //var tokenSymbol = node.querySelector("td:nth-child(2) > a > div > div > div > p").innerText;
                //console.log(tokenSymbol);

                newTd.setAttribute("style", "text-align : left");
                newTd.innerHTML = `
<table>
<tr>
<td><a href="` + contractExplorerUrl + `">info</a></td>
<td>| charts : <a href="https://charts.bogged.finance/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=bogged.finance" alt="bogged.finance" /></a>
  <a href="https://poocoin.app/tokens/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=poocoin.app" alt="Poocoin" /></a></td>
<td>| scam :
<a href="https://tokensniffer.com/token/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=tokensniffer.com" alt="TokenSniffer" /></a>
<a href="https://honeypot.is/?address=` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=honeypot.is" alt="HoneyPot.is" /></a>
<a href="https://moonarch.app/token/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=moonarch.app" alt="MonArch.app" /></a>
<a href="https://www.team.finance/view-coin/` + contractAddress + `"><img src="https://www.google.com/s2/favicons?domain=team.finance" alt="Team.finance" />
</td>
</tr>
</table>
`;
                node.insertBefore(newTd, priceTd);





            } else {

                //console.log("ko");
                //return
            }
        }


    }

})();
