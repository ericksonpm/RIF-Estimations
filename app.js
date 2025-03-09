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
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    const age = parseInt(document.getElementById('age').value) || 0;

    // Convert to weeks with cap
    let totalWeeks = (civilianYears + militaryYears) * 52.18;
    totalWeeks = Math.min(totalWeeks, 52);

    // Age adjustment
    const ageAdjustment = age > 40 ? 
        totalWeeks * 0.025 * Math.floor((age - 40)/0.25) : 
        0;

    return {
        base: totalWeeks,
        adjustment: ageAdjustment,
        total: totalWeeks + ageAdjustment
    };
}

function calculateAll() {
    // Clear errors
    document.querySelectorAll('.error-message').forEach(e => e.remove());

    // Get inputs
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    const totalYears = civilianYears + militaryYears;

    // Validate year input
    if(totalYears > 1) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Total service cannot exceed 1 year (52 weeks)';
        document.getElementById('militaryYearsGroup').appendChild(error);
        return;
    }

    // Calculate and display
    const severance = calculateSeverance();
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('severanceResult').innerHTML = `
        Base Severance: ${severance.base.toFixed(1)} weeks<br>
        Age Adjustment: ${severance.adjustment.toFixed(1)} weeks<br>
        <strong>Total Estimate: ${severance.total.toFixed(1)} weeks</strong>
    `;
}

document.getElementById('militaryStatus').addEventListener('change', updateMilitaryCredit);
updateMili
