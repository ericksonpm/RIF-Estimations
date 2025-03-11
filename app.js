function validateMilitary() {
    const veteranStatus = document.getElementById('veteranStatus').value;
    const militaryInput = document.getElementById('militaryYears');
    
    if(veteranStatus !== 'AD') {
        militaryInput.value = '';
        militaryInput.setAttribute('disabled', 'true');
    } else {
        militaryInput.removeAttribute('disabled');
    }
}

function calculateRIF() {
    // Get input values
    const tenureGroup = document.getElementById('tenureGroup').value;
    const veteranStatus = document.getElementById('veteranStatus').value;
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    
    // Calculate performance average
    const ratings = [
        parseFloat(document.getElementById('rating1').value),
        parseFloat(document.getElementById('rating2').value),
        parseFloat(document.getElementById('rating3').value)
    ];
    const performanceAvg = ratings.reduce((a, b) => a + b, 0) / 3;

    // Calculate total SCD
    const totalSCD = civilianYears + militaryYears + performanceAvg;

    // Update results display
    document.getElementById('resultTenure').textContent = `Group ${tenureGroup}`;
    document.getElementById('resultVeteran').textContent = `Subgroup ${veteranStatus}`;
    document.getElementById('resultSCD').textContent = `${totalSCD.toFixed(2)} years`;
    document.getElementById('resultPerformance').textContent = `${performanceAvg.toFixed(1)} average`;

    // Calculate risk level (example calculation)
    const riskPercentage = Math.min(100, Math.max(0, (totalSCD - 5) * 2));
    document.getElementById('riskBar').style.width = `${riskPercentage}%`;

    // Show results section
    document.getElementById('results').style.display = 'block';
}

// Initial validation
validateMilitary();
