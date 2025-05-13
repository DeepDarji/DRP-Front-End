document.getElementById('submitVehicle').addEventListener('click', async () => {
  if (!accounts || accounts.length === 0) {
    alert('Please connect your wallet first.');
    return;
  }

  const driverId = document.getElementById('driverId').value;
  const company = document.getElementById('company').value;
  const model = document.getElementById('model').value;
  const regNumber = document.getElementById('regNumber').value;
  const pucDates = document.getElementById('pucDates').value;
  const ownerName = document.getElementById('ownerName').value;
  const insuranceProvider = document.getElementById('insuranceProvider').value;
  const policyNumber = document.getElementById('policyNumber').value;
  const policyValidity = document.getElementById('policyValidity').value;
  const insuranceType = document.getElementById('insuranceType').value;

  if (!driverId || !company || !model || !regNumber || !pucDates || !ownerName || !insuranceProvider || !policyNumber || !policyValidity || !insuranceType) {
    alert('Please fill all fields');
    return;
  }

  try {
    const contract = await getContract();
    await contract.methods
      .addVehicle(driverId, company, model, regNumber, pucDates, ownerName, insuranceProvider, policyNumber, policyValidity, insuranceType)
      .send({ from: accounts[0] });
    alert('Vehicle added for Driver ID: ' + driverId);
  } catch (error) {
    alert('Error: ' + error.message);
  }
});