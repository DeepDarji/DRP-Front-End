document.getElementById('add-vehicle-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  if (!accounts || accounts.length === 0) {
    alert('Please connect your wallet first.');
    return;
  }

  const submitButton = document.getElementById('submitVehicle');
  submitButton.disabled = true;
  submitButton.textContent = 'Processing...';

  try {
    const driverId = document.getElementById('driverId').value;
    const company = document.getElementById('company').value;
    const model = document.getElementById('model').value;
    const regNumber = document.getElementById('regNumber').value;
    const pucDates = document.getElementById('pucDates').value;
    const ownerName = document.getElementById('ownerName').value;
    const insuranceProvider = document.getElementById('insuranceProvider').value;
    const policyNumber = document.getElementById('policyNumber').value;
    const policyValidity = document.getElementById('policyValidity').value;
    const insuranceType = document.querySelector('input[name="insuranceType"]:checked')?.value;

    if (!driverId || !company || !model || !regNumber || !pucDates || !ownerName || !insuranceProvider || !policyNumber || !policyValidity || !insuranceType) {
      alert('Please fill all fields');
      throw new Error('Missing required fields');
    }

    // Validate driverId
    const driverIdNum = parseInt(driverId);
    if (isNaN(driverIdNum) || driverIdNum <= 0) {
      alert('Driver ID must be a positive integer');
      throw new Error('Invalid Driver ID');
    }

    // Validate date formats
    if (!/^\d{4}-\d{2}-\d{2}$/.test(pucDates)) {
      alert('PUC Dates must be in YYYY-MM-DD format');
      throw new Error('Invalid PUC Dates format');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(policyValidity)) {
      alert('Policy Validity must be in YYYY-MM-DD format');
      throw new Error('Invalid Policy Validity format');
    }

    const contract = await getContract();
    const result = await contract.methods
      .addVehicle(driverIdNum, company, model, regNumber, pucDates, ownerName, insuranceProvider, policyNumber, policyValidity, insuranceType)
      .send({ from: accounts[0] });

    alert('Vehicle added for Driver ID: ' + driverId + ' with Registration Number: ' + result.events.VehicleAdded.returnValues.regNumber);
  } catch (error) {
    console.error('Error adding vehicle:', error);
    alert('Error: ' + (error.message || 'Failed to add vehicle. Please check the console for details.'));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Add Vehicle';
  }
});