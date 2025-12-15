ESX = exports['es_extended']:getSharedObject()
local hasEsxStatus = false
local playerLoaded = false

Citizen.CreateThread(function()
    Citizen.Wait(1000)
    
    if ESX.GetPlayerData() and ESX.GetPlayerData().job then
        ESX.PlayerData = ESX.GetPlayerData()
        playerLoaded = true
        
        Citizen.Wait(500)
        UpdateHUD()
    else
        while ESX.GetPlayerData().job == nil do
            Citizen.Wait(100)
        end
        
        ESX.PlayerData = ESX.GetPlayerData()
        playerLoaded = true
        
        Citizen.Wait(500)
        UpdateHUD()
    end
    
    DisplayRadar(true)

    while true do
        Citizen.Wait(0)
        HideHudComponentThisFrame(3)
        HideHudComponentThisFrame(4)
        HideHudComponentThisFrame(6)
        HideHudComponentThisFrame(7)
        HideHudComponentThisFrame(8)
        HideHudComponentThisFrame(9)
        
        DisplayAmmoThisFrame(false)
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
    end
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    ESX.PlayerData = xPlayer
    playerLoaded = true
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
    if ESX.PlayerData and ESX.PlayerData.accounts then
        for i=1, #ESX.PlayerData.accounts do
            if ESX.PlayerData.accounts[i].name == account.name then
                ESX.PlayerData.accounts[i] = account
                break
            end
        end
    end
    Citizen.Wait(100)
    UpdateHUD()
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    ESX.PlayerData.job = job
end)

Citizen.CreateThread(function()
    Citizen.Wait(1000)
    
    local resourceState = GetResourceState('esx_status')
    if resourceState == 'started' or resourceState == 'starting' then
        hasEsxStatus = true
    end
    
    SendNUIMessage({
        action = "setConfig",
        config = Config
    })
    
    SendNUIMessage({
        action = "setStatusVisibility",
        hasStatus = hasEsxStatus
    })
end)

function UpdateHUD()
    if not playerLoaded then
        return
    end
    
    local playerId = GetPlayerServerId(PlayerId())
    
    ESX.PlayerData = ESX.GetPlayerData()
    
    local money = 0
    local bank = 0
    
    if ESX.PlayerData and ESX.PlayerData.accounts then
        for i=1, #ESX.PlayerData.accounts do
            if ESX.PlayerData.accounts[i].name == 'money' then
                money = math.floor(ESX.PlayerData.accounts[i].money or 0)
            elseif ESX.PlayerData.accounts[i].name == 'bank' then
                bank = math.floor(ESX.PlayerData.accounts[i].money or 0)
            end
        end
    end
    
    local health = GetEntityHealth(PlayerPedId()) - 100
    local armor = GetPedArmour(PlayerPedId())
    
    if hasEsxStatus and Config.StatusBars.hunger.enabled and Config.StatusBars.thirst.enabled then
        TriggerEvent('esx_status:getStatus', 'hunger', function(status)
            if status then
                local hunger = status.getPercent()
                
                TriggerEvent('esx_status:getStatus', 'thirst', function(statusThirst)
                    if statusThirst then
                        local thirst = statusThirst.getPercent()
                        
                        SendNUIMessage({
                            action = "updateHUD",
                            playerId = playerId,
                            money = money,
                            bank = bank,
                            health = health,
                            armor = armor,
                            hunger = hunger,
                            thirst = thirst
                        })
                    end
                end)
            end
        end)
    else
        SendNUIMessage({
            action = "updateHUD",
            playerId = playerId,
            money = money,
            bank = bank,
            health = health,
            armor = armor,
            hunger = 0,
            thirst = 0
        })
    end
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(Config.RefreshRate)
        UpdateHUD()
    end
end)
