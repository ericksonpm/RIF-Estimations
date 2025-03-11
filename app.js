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

function calculateRIF() {
    // Get input values
    const tenureGroup = document.getElementById('tenureGroup').value;
    const veteranStatus = document.getElementById('veteranStatus').value;
    const civilianYears = parseFloat(document.getElementById('civilianYears').value) || 0;
    const militaryRetiree = document.getElementById('militaryRetiree').checked;
    let militaryYears = parseFloat(document.getElementById('militaryYears').value) || 0;
    
    if(militaryRetiree) {
        militaryYears = 0; // Adjust for military retirees
    }
    
    // Calculate performance average
    const ratings = [
        parseFloat(document.getElementById('
