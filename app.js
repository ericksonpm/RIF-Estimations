function validateMilitary() {
  const veteranStatus = document.getElementById("veteranStatus").value;
  const militaryInput = document.getElementById("militaryYears");

  // For non-AD veterans, disable military years input
  if (veteranStatus !== "AD") {
    militaryInput.value = "";
    militaryInput.setAttribute("disabled", "true");
  } else {
    militaryInput.removeAttribute("disabled");
  }
}

function updateMilitaryYears() {
  const militaryRetiree = document.getElementById("militaryRetiree").checked;
  const militaryInput = document.getElementById("militaryYears");
  const militaryNote = document.getElementById("militaryNote");
  const combatDiv = document.getElementById("combatDiv");

  if (militaryRetiree) {
    militaryInput.value = "";
    militaryInput.setAttribute("disabled", "true");
    militaryNote.style.display = "block";
    combatDiv.style.display = "block";
  } else {
    militaryInput.removeAttribute("disabled");
    militaryNote.style.display = "none";
    combatDiv.style.display = "none";
  }
}

function updateCampaignInput() {
  const campaignTime = document.getElementById("campaignTime").checked;
  const campaignInput = document.getElementById("campaignYears");

  if (campaignTime) {
    campaignInput.style.display = "block";
  } else {
    campaignInput.style.display = "none";
    campaignInput.value = "";
  }
}

function toggleFAQ() {
  const faqDiv = document.getElementById("veteranFAQ");
  if (faqDiv.style.display === "none" || faqDiv.style.display === "") {
    faqDiv.style.display = "block";
  } else {
    faqDiv.style.display = "none";
  }
}

function calculateRIF() {
  // Get input values
  const tenureGroup = document.getElementById("tenureGroup").value;
  const veteranStatus = document.getElementById("veteranStatus").value;
  const civilianYears = parseFloat(document.getElementById("civilianYears").value) || 0;
  const militaryRetiree = document.getElementById("militaryRetiree").checked;
  const combatDisability = document.getElementById("combatDisability").checked;
  let militaryYears = parseFloat(document.getElementById("militaryYears").value) || 0;
  const campaignTime = document.getElementById("campaignTime").checked;
  let campaignYears = parseFloat(document.getElementById("campaignYears").value) || 0;

  // If retired and NOT combat-disabled, drop regular military years.
  // However, if campaign time is provided, allow credit for campaign service.
  if (militaryRetiree && !combatDisability) {
    militaryYears = 0;
    if (campaignTime) {
      militaryYears = campaignYears;
    }
  }

  // Calculate performance average (defaults missing ratings to Fully Successful)
  const ratings = [
    parseFloat(document.getElementById("rating1").value),
    parseFloat(document.getElementById("rating2").value),
    parseFloat(document.getElementById("rating3").value)
  ];
  const performanceAvg = ratings.reduce((a, b) => a + b, 0) / 3;

  // Calculate total Service Computation Date (SCD)
  const totalSCD = civilianYears + militaryYears + performanceAvg;

  // Estimate severance pay (example: $1000 per year of service credit)
  const severancePay = totalSCD * 1000;

  // Update results display
  document.getElementById("resultTenure").textContent = `Group ${tenureGroup}`;
  document.getElementById("resultVeteran").textContent = `Subgroup ${veteranStatus}`;
  document.getElementById("resultSCD").textContent = `${totalSCD.toFixed(2)} years`;
  document.getElementById("resultPerformance").textContent = `${performanceAvg.toFixed(1)} average`;

  const retirementGoal = document.getElementById("retirementGoal").value;
  const yearsToRetirement = parseFloat(document.getElementById("yearsToRetirement").value);
  let goalLabel = "";
  if (retirementGoal === "20") {
    goalLabel = "20 years";
  } else if (retirementGoal === "30") {
    goalLabel = "30 years";
  } else {
    goalLabel = "MRA";
  }
  document.getElementById("resultYearsToRetirement").textContent = `${yearsToRetirement} years to ${goalLabel}`;
  document.getElementById("resultSeverance").textContent = `$${severancePay.toFixed(2)}`;

  // Calculate risk level (example logic)
  const riskPercentage = Math.min(100, Math.max(0, (totalSCD - 5) * 2));
  const riskBar = document.getElementById("riskBar");
  riskBar.style.width = `${riskPercentage}%`;
  if (riskPercentage > 75) {
    riskBar.style.backgroundColor = "red";
  } else if (riskPercentage > 50) {
    riskBar.style.backgroundColor = "orange";
  } else {
    riskBar.style.backgroundColor = "green";
  }

  // Show results section
  document.getElementById("results").style.display = "block";
}

function exportResults() {
  // Sample export function – currently logs results to console.
  console.log("Exporting results...");
  // Further implementation (e.g., PDF generation) can be added here.
}

function submitFeedback() {
  const feedback = document.getElementById("feedbackText").value;
  if (feedback.trim() !== "") {
    console.log("Feedback submitted:", feedback);
    alert("Thank you for your feedback!");
    document.getElementById("feedbackText").value = "";
  } else {
    alert("Please enter some feedback before submitting.");
  }
}
