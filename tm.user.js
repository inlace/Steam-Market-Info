// ==UserScript==
// @name        Продажи и медианная цена за сутки
// @namespace   https://github.com/inlace
// @version     1.0.1
// @author      Inlace
// @description Показывает продажи и медианную цену за сутки
// @supportURL  https://github.com/inlace
// @match       http://steamcommunity.com/market/listings/730/*
// @match       https://steamcommunity.com/market/listings/730/*
// @license     MIT
// @grant       none
// @run-at      document-end
// ==/UserScript==

const link = window.location.href.split("/")[6].split("?")[0]

if (link !== null) {
    getVolume(link)
        .then(data => addVolume(data.volume,data.median_price));
}

function getVolume(link) {
    return fetch(`//steamcommunity.com/market/priceoverview/\
?appid=730&currency=1&market_hash_name=${link}`)
        .then(res => res.json());
}

function addVolume(volume,median) {
    const elmDivItem = document.querySelector('#largeiteminfo_item_descriptors');
    if (elmDivItem !== null) {
        if (volume == undefined) {
            volume = 'нет'
        }
        if (median == undefined) {
            median = 'нет'
        }
         elmDivItem.innerHTML += `<div class="descriptor">Продаж в сутки：<span style="color: #5b9ace">${volume}</span></div>`;
         elmDivItem.innerHTML += `<div class="descriptor">&nbsp;</div><div class="descriptor">Медианная цена：<span style="color: #5b9ace">${median}</span></div>`;
    }
}
