let config = null;

$(document).ready(function() {
    window.addEventListener('message', function(event) {
        const data = event.data;
        
        if (data.action === "setConfig") {
            config = data.config;
            applyConfig();
        }
        
        if (data.action === "setStatusVisibility") {
            if (config && config.StatusBars.hunger.enabled && config.StatusBars.hunger.requireEsxStatus && data.hasStatus) {
                $('#hunger-container').show();
            } else if (!config || !config.StatusBars.hunger.enabled) {
                $('#hunger-container').hide();
            }
            
            if (config && config.StatusBars.thirst.enabled && config.StatusBars.thirst.requireEsxStatus && data.hasStatus) {
                $('#thirst-container').show();
            } else if (!config || !config.StatusBars.thirst.enabled) {
                $('#thirst-container').hide();
            }
        }
        
        if (data.action === "updateHUD") {
            if (config && config.PlayerInfo.showID) {
                $('#player-id').text(data.playerId);
            }
            
            if (config && config.PlayerInfo.showMoney) {
                $('#money').text('$' + formatNumber(data.money));
            }
            
            if (config && config.PlayerInfo.showBank) {
                $('#bank').text('$' + formatNumber(data.bank));
            }
            
            if (config && config.StatusBars.health.enabled) {
                const healthPercent = Math.max(0, Math.min(100, data.health));
                $('#health-bar').css('width', healthPercent + '%');
                
                if (config.StatusBars.health.hideWhenZero && data.health <= 0) {
                    $('#health-container').hide();
                } else {
                    $('#health-container').show();
                }
            }
            
            if (config && config.StatusBars.armor.enabled) {
                if (config.StatusBars.armor.hideWhenZero) {
                    if (data.armor > 0) {
                        $('#armor-container').show();
                        $('#armor-bar').css('width', data.armor + '%');
                    } else {
                        $('#armor-container').hide();
                    }
                } else {
                    $('#armor-container').show();
                    $('#armor-bar').css('width', data.armor + '%');
                }
            }
            
            if (config && config.StatusBars.hunger.enabled) {
                $('#hunger-bar').css('width', data.hunger + '%');
            }
            
            if (config && config.StatusBars.thirst.enabled) {
                $('#thirst-bar').css('width', data.thirst + '%');
            }
        }
    });
});

function applyConfig() {
    if (!config) return;
    
    if (config.Logo.enabled) {
        $('#logo').attr('src', config.Logo.path);
        $('#logo').css('width', config.Logo.width + 'px');
        $('#logo').show();
    } else {
        $('#logo').hide();
    }
    
    if (config.PlayerInfo.showID) {
        $('#id-item').show();
    } else {
        $('#id-item').hide();
    }
    
    if (config.PlayerInfo.showMoney) {
        $('#money-item').show();
    } else {
        $('#money-item').hide();
    }
    
    if (config.PlayerInfo.showBank) {
        $('#bank-item').show();
    } else {
        $('#bank-item').hide();
    }
    
    if (config.StatusBars.health.enabled) {
        $('#health-container').show();
    } else {
        $('#health-container').hide();
    }
    
    if (config.StatusBars.armor.enabled) {
        $('#armor-container').show();
    } else {
        $('#armor-container').hide();
    }
    
    if (config.Position.topRight) {
        $('#top-right').css({
            'top': config.Position.topRight.top + 'px',
            'right': config.Position.topRight.right + 'px',
            'gap': config.Position.topRight.gap + 'px'
        });
    }
    
    if (config.Position.bottomRight) {
        $('#bottom-right').css({
            'bottom': config.Position.bottomRight.bottom + 'px',
            'right': config.Position.bottomRight.right + 'px',
            'gap': config.Position.bottomRight.gap + 'px'
        });
    }
    
    if (config.Style) {
        $('.bar-wrapper').css({
            'width': config.Style.barWidth + 'px',
            'height': config.Style.barHeight + 'px'
        });
        
        $('.value').css('font-size', config.Style.fontSize.info + 'px');
        $('.icon').css('font-size', config.Style.fontSize.icon + 'px');
        $('.icon-bar').css('font-size', config.Style.fontSize.iconBar + 'px');
    }
    
    if (config.Icons) {
        if (config.Icons.id) {
            $('#id-item .icon').removeClass().addClass('fa-solid ' + config.Icons.id + ' icon');
        }
        if (config.Icons.money) {
            $('#money-item .icon').removeClass().addClass('fa-solid ' + config.Icons.money + ' icon');
        }
        if (config.Icons.bank) {
            $('#bank-item .icon').removeClass().addClass('fa-solid ' + config.Icons.bank + ' icon');
        }
    }
    
    if (config.StatusBars) {
        if (config.StatusBars.health.icon) {
            $('#health-container .icon-bar').removeClass().addClass('fa-solid ' + config.StatusBars.health.icon + ' icon-bar');
        }
        if (config.StatusBars.armor.icon) {
            $('#armor-container .icon-bar').removeClass().addClass('fa-solid ' + config.StatusBars.armor.icon + ' icon-bar');
        }
        if (config.StatusBars.hunger.icon) {
            $('#hunger-container .icon-bar').removeClass().addClass('fa-solid ' + config.StatusBars.hunger.icon + ' icon-bar');
        }
        if (config.StatusBars.thirst.icon) {
            $('#thirst-container .icon-bar').removeClass().addClass('fa-solid ' + config.StatusBars.thirst.icon + ' icon-bar');
        }
    }
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
