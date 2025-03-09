const RETENTION_WEIGHTS = {
    tenure: { I: 20, II: 15, III: 10 },
    veteran: { 0: 0, 5: 5, 10: 10 },
    serviceYearWeight: 1
};

function updateRatingInputs() {
    const container = document.getElementById('ratingContainer');
    const count = parseInt(document.getElementById('evalCount').value);
    container.innerHTML = '';

    if(count === 0) {
        document.getElementById('modalRatingSection').classList.remove('hidden');
    } else {
        document.getElementById('modalRatingSection').classList.add('hidden');
        for(let i = 1; i <= count; i++) {
            const group = document.createElement('div');
            group.className = 'input-group';
            group.innerHTML = `
                <label>Evaluation ${i}:</label>
                <select class="rating-select">
                    <option value="12">Fully Successful</option>
                    <option value="16">Exceeds FS</option>
                    <option value="20">Outstanding</option>
                </select>
            `;
            container.appendChild(group);
        }
    }
}

function calculateServiceCredit() {
    const evalCount = parseInt(document.getElementById('evalCount').value);
    if(evalCount === 0) {
        return parseInt(document.getElementById('modalRating').value);
    }
    
    const ratings = Array.from(document.querySelectorAll('.rating-select'))
                       .map(select => parseInt(select.value));
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

function calculateRetentionScore() {
    const tenure = document.getElementById('tenure').value;
    const veteran = parseInt(document.getElementById('veteran').value);
    const serviceYears = parseFloat(document.getElementById('civilianYears').value || 0) +
                       parseFloat(document.getElementById('militaryYears').value || 0);

    return RETENTION_WEIGHTS.tenure[tenure] + 
           RETENTION_WEIGHTS.veteran[veteran] + 
           (serviceYears * RETENTION_WEIGHTS.serviceYearWeight);
}

function generateGuidance(score) {
    const actions = [];
    const tenure = document.getElementById('tenure').value;
    const age = parseInt(document.getElementById('age').value);

    if(tenure === 'III') {
        actions.push("Consider lateral transfers to career-conditional positions");
    }

    if(score < 45) {
        actions.push("Schedule career counseling session with HR specialist");
    }

    if(age >= 50) {
        actions.push("Review retirement eligibility with benefits center");
    }

    return actions;
}

function calculateAll() {
    // Perform calculations
    const serviceCredit = calculateServiceCredit();
    const retentionScore = calculateRetentionScore();
    const riskLevel = retentionScore >= 45 ? "Low Risk" : "Elevated Risk";
    
    // Generate guidance
    const actions = generateGuidance(retentionScore);
    
    // Update UI
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('retentionScore').textContent = `Retention Score: ${retentionScore}`;
    document.getElementById('riskLevel').textContent = `Risk Level: ${riskLevel}`;
    document.getElementById('actionList').innerHTML = actions.map(a => `<li>${a}</li>`).join('');
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("VA RIF Calculation Report", 15, 20);
    doc.setFontSize(12);
    
    // Add calculation results
    const yStart = 30;
    let yPosition = yStart;
    
    doc.text(`Retention Score: ${document.getElementById('retentionScore').textContent}`, 15, yPosition);
    yPosition += 10;
    doc.text(`Risk Level: ${document.getElementById('riskLevel').textContent}`, 15, yPosition);
    yPosition += 20;
    
    doc.text("Recommended Actions:", 15, yPosition);
    yPosition += 10;
    const actions = Array.from(document.getElementById('actionList').children)
                       .map(li => li.textContent);
    actions.forEach((action, index) => {
        doc.text(`• ${action}`, 20, yPosition + (index * 7));
    });
    
    doc.save("rif-report.pdf");
}

// Initialize modal rating visibility
document.getElementById('evalCount').addEventListener('change', updateRatingInputs);
updateRatingInputs();
