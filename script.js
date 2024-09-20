var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldUpgradePerClickCost: 10,
    autoMiners: 1,
    autoMinersPurchaseCost: 20,
    rebirth: 1,
    rebirthCost: 5000,
    rebirthDisplay: 0
}
const perClickUpgrade = document.getElementById("perClickUpgrade")
const goldMined = document.getElementById("goldMined")
const buyAutoMinersButton = document.getElementById("buyAutoMinersButton")
const buyRebirthButton = document.getElementById("buyRebirthButton")
var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
    gameData = savegame
    perClickUpgrade.innerHTML = " Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: "+ gameData.goldUpgradePerClickCost + " Gold"
    buyAutoMinersButton.innerHTML = " Buy Auto Miner (Current Auto Miners " + gameData.autoMiners + ") Cost: "+ gameData.autoMinersPurchaseCost + " Gold"
    buyRebirthButton.innerHTML = " Rebirth (Current Rebirths " + gameData.rebirthDisplay + ") Cost: "+ gameData.rebirthCost + " Gold"
    goldMined.innerHTML = gameData.gold + " Gold Mined"
}
function mineGold()
{
    gameData.gold += gameData.goldPerClick * gameData.rebirth 
    goldMined.innerHTML = gameData.gold + " Gold Mined"
}
function autoMinersMine()
{
        let randomDelayAutoMiner = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
        setTimeout(function() {
            gameData.gold += gameData.goldPerClick * gameData.rebirth * gameData.autoMiners
       }, randomDelayAutoMiner);
       goldMined.innerHTML = gameData.gold + " Gold Mined"
}
function buyGoldPerClick() 
{
    if (gameData.gold >= gameData.goldUpgradePerClickCost) 
    {
        gameData.gold -= gameData.goldUpgradePerClickCost
        gameData.goldPerClick++
        gameData.goldUpgradePerClickCost *= 2
        perClickUpgrade.innerHTML = " Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: "+ gameData.goldUpgradePerClickCost + " Gold"
        goldMined.innerHTML = gameData.gold + " Gold Mined"
    }
}
function buyAutoMiners()
{
    if (gameData.gold >= gameData.autoMinersPurchaseCost) 
    {
        gameData.gold -= gameData.autoMinersPurchaseCost
        gameData.autoMiners++
        gameData.autoMinersPurchaseCost *= 2
        buyAutoMinersButton.innerHTML = " Buy Auto Miner (Current Auto Miners " + gameData.autoMiners + ") Cost: "+ gameData.autoMinersPurchaseCost + " Gold"
        goldMined.innerHTML = gameData.gold + " Gold Mined"
    }
}
function buyRebirth() 
{
    if (gameData.gold >= gameData.rebirthCost)
    {
        gameData.gold = 0
        gameData.autoMiners = 1
        gameData.goldPerClick = 1
        gameData.goldUpgradePerClickCost = 10
        gameData.autoMinersPurchaseCost = 20
        gameData.rebirthCost *= 3
        gameData.rebirth++
        gameData.rebirthDisplay++
        perClickUpgrade.innerHTML = " Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: "+ gameData.goldUpgradePerClickCost + " Gold"
        buyAutoMinersButton.innerHTML = " Buy Auto Miner (Current Auto Miners " + gameData.autoMiners + ") Cost: "+ gameData.autoMinersPurchaseCost + " Gold"
        buyRebirthButton.innerHTML = " Rebirth (Current Rebirths " + gameData.rebirthDisplay + ") Cost: "+ gameData.rebirthCost + " Gold"
        goldMined.innerHTML = gameData.gold + " Gold Mined"
    }
}
var mainGameLoop = window.setInterval(function() {
    autoMinersMine()
}, 1000)


var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}, 15000)
