Config = {}

Config.RefreshRate = 500

Config.Logo = {
    enabled = true,
    path = 'logo.png',
    width = 140
}

Config.PlayerInfo = {
    showID = true,
    showMoney = true,
    showBank = true
}

Config.StatusBars = {
    health = {
        enabled = true,
        icon = 'fa-heart',
        hideWhenZero = false
    },
    armor = {
        enabled = true,
        icon = 'fa-shield',
        hideWhenZero = true
    },
    hunger = {
        enabled = true,
        icon = 'fa-burger',
        requireEsxStatus = true,
        hideWhenZero = false
    },
    thirst = {
        enabled = true,
        icon = 'fa-droplet',
        requireEsxStatus = true,
        hideWhenZero = false
    }
}

Config.Position = {
    topRight = {
        top = 25,
        right = 25,
        gap = 4
    },
    bottomRight = {
        bottom = 120,
        right = 30,
        gap = 10
    }
}

Config.Icons = {
    id = 'fa-user',
    money = 'fa-wallet',
    bank = 'fa-building-columns'
}

Config.Style = {
    barWidth = 160,
    barHeight = 8,
    fontSize = {
        info = 16,
        icon = 14,
        iconBar = 13
    }
}
