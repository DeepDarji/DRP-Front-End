document.getElementById('add-accident-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  if (!accounts || accounts.length === 0) {
    alert('Please connect your wallet first.');
    return;
  }

  const submitButton = document.getElementById('submitAccident');
  submitButton.disabled = true;
  submitButton.textContent = 'Processing...';

  try {
    // Retrieve and trim input values
    const driverId = document.getElementById('driverId')?.value.trim();
    const dateTimeInput = document.getElementById('dateTime')?.value;
    const location = document.getElementById('location')?.value.trim();
    const description = document.getElementById('description')?.value.trim();
    const cause = document.getElementById('cause')?.value.trim();
    const caseStatus = document.getElementById('caseStatus')?.value;
    const claimStatus = document.getElementById('claimStatus')?.value;
    const photoUrl = document.getElementById('photoUrl')?.value.trim();
    const firNumber = document.getElementById('firNumber')?.value.trim();

    // Compute dateTime
    let dateTime;
    if (dateTimeInput) {
      dateTime = Math.floor(new Date(dateTimeInput).getTime() / 1000);
    }

    // Validate inputs
    const missingFields = [];
    if (!driverId) missingFields.push('Driver ID');
    if (!dateTimeInput || isNaN(dateTime)) missingFields.push('Date & Time');
    if (!location) missingFields.push('Location');
    if (!description) missingFields.push('Description');
    if (!cause) missingFields.push('Cause');
    if (!caseStatus) missingFields.push('Case Status');
    if (!claimStatus) missingFields.push('Claim Status');
    if (!photoUrl) missingFields.push('Photo URL');
    if (!firNumber) missingFields.push('FIR Number');

    if (missingFields.length > 0) {
      alert('Please fill all required fields: ' + missingFields.join(', '));
      throw new Error('Missing required fields');
    }

    // Validate driverId
    const driverIdNum = parseInt(driverId);
    if (isNaN(driverIdNum) || driverIdNum <= 0) {
      alert('Driver ID must be a positive integer');
      throw new Error('Invalid Driver ID');
    }

    // Validate photoUrl
    const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    if (!urlPattern.test(photoUrl)) {
      alert('Photo URL must be a valid URL starting with http:// or https://');
      throw new Error('Invalid Photo URL');
    }

    const contract = await getContract();
    const result = await contract.methods
      .addAccident(driverIdNum, dateTime, location, description, cause, caseStatus, claimStatus, photoUrl, firNumber)
      .send({ from: accounts[0] });

    //alert('Accident added for Driver ID: ' + driverId + ' with Accident ID: ' + result.events.AccidentAdded.returnValues.accidentId);
    alert('Accident added for Driver ID: ' + driverId);
  } catch (error) {
    console.error('Error adding accident:', error);
    alert('Error: ' + (error.message || 'Failed to add accident. Please check the console for details.'));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Add Accident';
  }
});