document.getElementById('submitAccident').addEventListener('click', async () => {
  if (!accounts || accounts.length === 0) {
    alert('Please connect your wallet first.');
    return;
  }

  // Retrieve and trim input values
  const driverId = document.getElementById('driverId')?.value.trim();
  const dateTimeInput = document.getElementById('dateTime')?.value;
  const location = document.getElementById('location')?.value.trim();
  const description = document.getElementById('description')?.value.trim();
  const cause = document.getElementById('cause')?.value.trim();
  const caseStatus = document.getElementById('caseStatus')?.value.trim();
  const claimStatus = document.getElementById('claimStatus')?.value.trim();
  const photoUrl = document.getElementById('photoUrl')?.value.trim();
  const firNumber = document.getElementById('firNumber')?.value.trim();

  // Compute dateTime
  let dateTime;
  if (dateTimeInput) {
    dateTime = Math.floor(new Date(dateTimeInput).getTime() / 1000);
  }

  // Log values for debugging
  console.log('Form values:', {
    driverId,
    dateTimeInput,
    dateTime,
    location,
    description,
    cause,
    caseStatus,
    claimStatus,
    photoUrl,
    firNumber
  });

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
    return;
  }

  try {
    const contract = await getContract();
    await contract.methods
      .addAccident(driverId, dateTime, location, description, cause, caseStatus, claimStatus, photoUrl, firNumber)
      .send({ from: accounts[0] });
    alert('Accident added for Driver ID: ' + driverId);
  } catch (error) {
    console.error('Error adding accident:', error);
    alert('Error: ' + error.message);
  }
});