function drawGraph() {
    toggleHidden();

    var v = parseInt(document.getElementById('initial').value);
    var r = parseInt(document.getElementById('recurring').value);
    var y = parseInt(document.getElementById('return').value) / 100;

    var baseValue = calcBaseValue(v, r);
    var compoundValue = calcCompoundValue(v, r, y);
    var yearLabels = getLabels();

    var data = {
        labels  : yearLabels,
        series  : [
            baseValue,
            compoundValue
        ]
    };

    var options = {
        axisY: {
            labelInterpolationFnc: function(value) {
                if (value >= 1000000) {
                    var remainder = value % 1000000;
                    if (remainder == 0) {
                        return '$' + value / 1000000 + 'M';
                    } else if (remainder == 500000) {
                        return '$' + (value / 1000000).toFixed(1) + 'M';
                    } else {
                        return '$' + (value / 1000000).toFixed(2) + 'M';
                    }
                } else {
                    return '$' + value;
                }
            }
        }
    }

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value.toString().substr(2);
                }
            }
        }]
    ];

    new Chartist.Line('.ct-chart', data, options, responsiveOptions); 

}

function getLabels() {
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    var labels = [];

    for (var i=0; i < 31; i++) {
        labels.push(currentYear+i);
    }

    return labels;
}

function calcBaseValue(v, r) {
    var returnValues = [];
    var z = v;

    for (var i = 0; i < 31; i++) {
        returnValues.push(z.toFixed(2));
        z = z + r;
    }

    return returnValues;
}

function calcCompoundValue(v, r, y) {
    var returnValues = [];
    var z = 0;

    for (var i = 0; i < 31; i++) {
        if (i == 0) {
            z = (v * y)+v;
            returnValues.push(z.toFixed(2));
        } else {
            z = (z+r)+((z+r)*y);
            returnValues.push(z.toFixed(2));
        }
    }

    return returnValues;
}

function toggleHidden() {
    if (document.getElementById('hidden').style.display='none') {
        document.getElementById('hidden').style.display='block'
    }
}
