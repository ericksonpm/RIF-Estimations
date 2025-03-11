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

function updateMilitaryYears() {
    const militaryRetiree = document.getElementById('militaryRetiree').checked;
    const militaryInput = document.getElementById('militaryYears');
    const militaryNote = document.getElementById('militaryNote');
    
    if(militaryRetiree) {
        militaryInput.value = '';
        militaryInput.setAttribute('disabled', 'true');
        militaryNote.style.display = 'block';
    } else {
        militaryInput.removeAttribute('disabled');
        militaryNote.style.display = 'none';
    }
}

function updateCampaignInput() {
    const campaignTime = document.getElementById('campaignTime').checked;
    const campaignInput = document.getElementById('campaignYears');
    
    if(campaignTime) {
        campaignInput.style.display = 'block';
    } else {
        campaignInput.style.display = 'none';
        campaignInput.value = '';
    }
}

function calculateRIF() {
    // Get input values
    const tenureGroup = document.getElementById('tenureGroup').value;
    const veteranStatus = document.getElementById('veteranStatus').value;
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryRetiree = document.getElementById('militaryRetiree').checked;
    const combatDisability = document.getElementById('combatDisability').checked;
    let militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    const campaignTime = document.getElementById('campaignTime').checked;
    let campaignYears = parseFloat(document.getElementById('campaignYears').value) || 0;
    
    if(militaryRetiree && !combatDisability) {
        militaryYears = 0; // Default unless combat disability
        if(campaignTime) {
            militaryYears = campaignYears; // Adjust for campaign service
        }
    }
    
    // Calculate performance average
    const ratings = [
        parseFloat(document.getElementById('rating1').value),
        parseFloat(document.getElementById('rating2').value),
        parseFloat(document.getElementById('rating3').value)
    ];
    const performanceAvg = ratings.reduce((a, b) => a + b, 0) / 3;

    // Calculate total SCD
    const totalSCD = civilianYears + militaryYears + performanceAvg;

    // Estimate severance pay (simplified example)
    const severancePay = totalSCD * 1000; // Example: $1000 per year of service

    // Update results display
    document.getElementById('resultTenure').textContent = `Group ${tenureGroup}`;
    document.getElementById('resultVeteran').textContent = `Subgroup ${veteranStatus}`;
    document.getElementById('resultSCD').textContent = `${totalSCD.toFixed(2)} years`;
    document.getElementById('resultPerformance').textContent = `${performanceAvg.toFixed(1)} average`;
    
    const retirementGoal = document.getElementById('retirementGoal').value;
    const yearsToRetirement = parseFloat(document.getElementById('yearsToRetirement').value);
    document.getElementById('resultYearsToRetirement').textContent = `${yearsToRetirement} years to ${retirementGoal === '20' ? '20 years' : retirementGoal === '30' ? '30 years' : 'MRA'}`;
    
    document.getElementById('resultSeverance').textContent = `$${severancePay.toFixed(2)}`;

    // Calculate risk level (example calculation)
    const riskPercentage = Math.min(100, Math.max(0, (totalSCD - 5) * 2));
    document.getElementById('riskBar').style.width = `${riskPercentage}%`;

    // Show results section
    document.getElementById('results').style.display = 'block';
}

function exportResults() {
    // Example export function
    console.log("Exporting results...");
    // Implement actual export logic here
}
