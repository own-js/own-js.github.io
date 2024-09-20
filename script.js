var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
  gameData = savegame
}

var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldUpgradePerClickCost: 10,
}

function mineGold()
{
    gameData.gold += gameData.goldPerClick
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
}

function buyGoldPerClick() 
{
    if (gameData.gold >= gameData.goldUpgradePerClickCost) 
    {
        gameData.gold -= gameData.goldUpgradePerClickCost
        gameData.goldPerClick++
        gameData.goldUpgradePerClickCost *= 2
        document.getElementById("perClickUpgrade").innerHTML = " Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: "+ gameData.goldUpgradePerClickCost + " Gold"
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
    }
}

var mainGameLoop = window.setInterval(function() {
    mineGold()
}, 1000)


var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}, 15000)