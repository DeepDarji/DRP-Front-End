document.getElementById('submitDriver').addEventListener('click', async () => {
  if (!accounts || accounts.length === 0) {
    alert('Please connect your wallet first.');
    return;
  }

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const licenseNumber = document.getElementById('licenseNumber').value;
  const address = document.getElementById('address').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const vehicleType = document.getElementById('vehicleType').value;
  const imageUrl = document.getElementById('imageUrl').value;

  if (!name || !dob || !mobile || !email || !licenseNumber || !address || !bloodGroup || !vehicleType || !imageUrl) {
    alert('Please fill all fields');
    return;
  }

  try {
    const contract = await getContract();
    const result = await contract.methods
      .addDriver(name, dob, mobile, email, licenseNumber, address, bloodGroup, vehicleType, imageUrl)
      .send({ from: accounts[0] });
    alert('Driver added with ID: ' + result.events.DriverAdded.returnValues.driverId);
  } catch (error) {
    alert('Error: ' + error.message);
  }
});