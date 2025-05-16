document.getElementById('add-driver-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  if (!accounts || accounts.length === 0) {
    alert('Please connect your wallet first.');
    return;
  }

  const submitButton = document.getElementById('submitDriver');
  submitButton.disabled = true;
  submitButton.textContent = 'Processing...';

  try {
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const licenseNumber = document.getElementById('licenseNumber').value;
    const address = document.getElementById('address').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const vehicleType = document.querySelector('input[name="vehicleType"]:checked')?.value;
    const imageUrl = document.getElementById('imageUrl').value;

    if (!name || !dob || !mobile || !email || !licenseNumber || !address || !bloodGroup || !vehicleType || !imageUrl) {
      alert('Please fill all fields');
      throw new Error('Missing required fields');
    }

    // Validate DOB format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      alert('DOB must be in YYYY-MM-DD format');
      throw new Error('Invalid DOB format');
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      throw new Error('Invalid email format');
    }

    const contract = await getContract();
    const result = await contract.methods
      .addDriver(name, dob, mobile, email, licenseNumber, address, bloodGroup, vehicleType, imageUrl)
      .send({ from: accounts[0] });
    
    alert('Driver added with ID: ' + result.events.DriverAdded.returnValues.driverId);
  } catch (error) {
    console.error('Error adding driver:', error);
    alert('Error: ' + (error.message || 'Failed to add driver. Please check the console for details.'));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Add Driver';
  }
});