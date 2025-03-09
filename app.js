function updateMilitaryCredit() {
    const status = document.getElementById('militaryStatus').value;
    const militaryInput = document.getElementById('militaryYears');
    const militaryGroup = document.getElementById('militaryYearsGroup');
    
    if(status === 'medical') {
        militaryInput.disabled = true;
        militaryInput.value = '';
        militaryGroup.classList.add('hidden');
    } else {
        militaryInput.disabled = false;
        militaryGroup.classList.remove('hidden');
        militaryInput.max = status === 'non-combat' ? 0 : 4;
    }
}

function calculateSeverance() {
    // Convert years to weeks (52.18 weeks/year)
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    const age = parseInt(document.getElementById('age').value) || 0;

    // Convert to weeks with 52-week cap
    let totalWeeks = (civilianYears + militaryYears) * 52.18;
    totalWeeks = Math.min(totalWeeks, 52);

    // Age adjustment calculation
    const ageAdjustment = age > 40 ? 
        totalWeeks * 0.025 * Math.floor((age - 40)/0.25) : 
        0;

    const totalSeverance = totalWeeks + ageAdjustment;

    return {
        base: totalWeeks,
        adjustment: ageAdjustment,
        total: totalSeverance
    };
}

function generateConsiderations() {
    const considerations = [];
    const tenure = document.getElementById('tenure').value;
    const veteranPoints = parseInt(document.getElementById('veteran').value);

    if(tenure === 'III') {
        considerations.push("Temporary employees may have different separation benefits");
    }

    if(veteranPoints > 0) {
        considerations.push("Veterans may qualify for additional placement assistance");
    }

    return considerations;
}

function calculateAll() {
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(e => e.remove());

    // Validate inputs
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    const totalWeeks = (civilianYears + militaryYears) * 52.18;

    if(totalWeeks > 52) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Total service cannot exceed 52 weeks';
        document.getElementById('militaryYearsGroup').appendChild(error);
        return;
    }

    // Perform calculations
    const severance = calculateSeverance();
    const considerations = generateConsiderations();

    // Display results
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('severanceResult').innerHTML = `
        Base Severance: ${severance.base.toFixed(1)} weeks<br>
        Age Adjustment: ${severance.adjustment.toFixed(1)} weeks<br>
        <strong>Total Estimate: ${severance.total.toFixed(1)} weeks</strong>
    `;

    document.getElementById('considerationList').innerHTML = 
        considerations.map(c => `<li>${c}</li>`).join('');
}

// Initialize military status handler
document.getElementById('militaryStatus').addEventListener('change', updateMilitaryCredit);
updateMilitaryCredit();
