function calculateRIF() {
    // Get inputs
    const tenure = document.getElementById('tenureGroup').value;
    const veteranStatus = document.getElementById('veteranStatus').value;
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryYears = document.getElementById('militaryRetiree').checked ? 0 : 
                        parseFloat(document.getElementById('militaryYears').value) || 0;

    // Handle performance ratings
    const getRatingValue = id => {
        const val = document.getElementById(id).value;
        return val ? parseInt(val) : 12; // Default to 12 if empty
    };
    
    const ratings = [
        getRatingValue('rating1'),
        getRatingValue('rating2'),
        getRatingValue('rating3')
    ];
    
    const performanceCredit = ratings.reduce((a,b) => a + b, 0) / 3;

    // Calculate SCD
    const totalService = civilianYears + militaryYears;
    const adjustedSCD = totalService + performanceCredit;

    // Determine retention priority
    const tenureOrder = {'I': 1, 'II': 2, 'III': 3};
    const veteranOrder = {'AD': 1, 'A': 2, 'B': 3};
    const retentionScore = 
        `${tenureOrder[tenure]}-${veteranOrder[veteranStatus]}-${adjustedSCD.toFixed(2)}`;

    // Display results
    document.getElementById('resTenure').textContent = tenure;
    document.getElementById('resVeteran').textContent = veteranStatus;
    document.getElementById('resSCD').textContent = adjustedSCD.toFixed(1);
    document.getElementById('resPriority').textContent = retentionScore;
    document.getElementById('result').style.display = 'block';

    // Show warnings
    const exemptionCheck = veteranStatus === 'B' && tenure === 'III' ? 
        "Higher risk category - consider position criticality" : "";
    document.getElementById('exemptions').textContent = exemptionCheck;
}
