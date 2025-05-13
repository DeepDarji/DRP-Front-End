document.getElementById('fetchDriver').addEventListener('click', async () => {
  const driverId = document.getElementById('driverId').value.trim();
  const driverDetails = document.getElementById('driverDetails');

  if (!driverId || isNaN(driverId)) {
    alert('Please enter a valid Driver ID (numeric)');
    driverDetails.innerHTML = '';
    return;
  }

  try {
    const contract = await getContract();
    
    // Check if driver exists
    const driverExists = await contract.methods.driverExists(driverId).call();
    if (!driverExists) {
      alert('Driver with ID ' + driverId + ' does not exist.');
      driverDetails.innerHTML = '<p class="text-center text-red-500">No driver found for ID ' + driverId + '.</p>';
      return;
    }

    // Call getDriverData and log raw result
    const result = await contract.methods.getDriverData(driverId).call();
    console.log('Raw getDriverData result:', result);

    // Handle object or array return
    let driverInfo, vehicleInfo, accidentHistory;
    if (Array.isArray(result)) {
      [driverInfo, vehicleInfo, accidentHistory] = result;
    } else if (result && typeof result === 'object') {
      driverInfo = result['0'];
      vehicleInfo = result['1'];
      accidentHistory = result['2'];
    } else {
      throw new Error('getDriverData returned an invalid format: ' + JSON.stringify(result));
    }

    // Map DriverInfo array to struct
    const driverInfoStruct = {
      name: driverInfo[0],
      dob: driverInfo[1],
      mobile: driverInfo[2],
      email: driverInfo[3],
      licenseNumber: driverInfo[4],
      permanentAddress: driverInfo[5],
      bloodGroup: driverInfo[6],
      vehicleType: driverInfo[7],
      imageUrl: driverInfo[8],
      exists: driverInfo[9]
    };

    // Map VehicleInfo array to struct
    const vehicleInfoStruct = {
      company: vehicleInfo[0],
      model: vehicleInfo[1],
      registrationNumber: vehicleInfo[2],
      pucDates: vehicleInfo[3],
      ownerName: vehicleInfo[4],
      insuranceProvider: vehicleInfo[5],
      policyNumber: vehicleInfo[6],
      policyValidity: vehicleInfo[7],
      insuranceType: vehicleInfo[8],
      exists: vehicleInfo[9]
    };

    // Generate HTML with tables
    let html = '';

    // Driver Image
    html += `
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-bold mb-4 text-gray-100">Driver Image</h2>
        ${driverInfoStruct.imageUrl ? `
          <img src="${driverInfoStruct.imageUrl}" alt="Driver Image" class="max-w-sm mx-auto rounded-xl shadow-lg transition-transform hover:scale-105" onerror="this.src='https://via.placeholder.com/150?text=Image+Not+Found'; this.alt='Image not found';">
        ` : `
          <p class="text-red-500">No image provided.</p>
        `}
      </div>
    `;

    // Driver Details Table
    html += `
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-gray-100">Driver Details</h2>
        ${driverInfoStruct.exists ? `
          <div class="overflow-x-auto">
            <table class="w-full bg-gray-700 rounded-lg shadow-md">
              <thead>
                <tr class="bg-gray-600 text-gray-100">
                  <th class="p-3 text-left">Field</th>
                  <th class="p-3 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Name</td><td class="p-3">${driverInfoStruct.name}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">DOB</td><td class="p-3">${driverInfoStruct.dob}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Mobile</td><td class="p-3">${driverInfoStruct.mobile}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Email</td><td class="p-3">${driverInfoStruct.email}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">License Number</td><td class="p-3">${driverInfoStruct.licenseNumber}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Address</td><td class="p-3">${driverInfoStruct.permanentAddress}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Blood Group</td><td class="p-3">${driverInfoStruct.bloodGroup}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Vehicle Type</td><td class="p-3">${driverInfoStruct.vehicleType}</td></tr>
              </tbody>
            </table>
          </div>
        ` : `
          <p class="text-red-500 text-center">No driver details found.</p>
        `}
      </div>
    `;

    // Vehicle Details Table
    html += `
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-gray-100">Vehicle Details</h2>
        ${vehicleInfoStruct.exists ? `
          <div class="overflow-x-auto">
            <table class="w-full bg-gray-700 rounded-lg shadow-md">
              <thead>
                <tr class="bg-gray-600 text-gray-100">
                  <th class="p-3 text-left">Field</th>
                  <th class="p-3 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Company</td><td class="p-3">${vehicleInfoStruct.company}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Model</td><td class="p-3">${vehicleInfoStruct.model}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Registration</td><td class="p-3">${vehicleInfoStruct.registrationNumber}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">PUC Dates</td><td class="p-3">${vehicleInfoStruct.pucDates}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Owner</td><td class="p-3">${vehicleInfoStruct.ownerName}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Insurance Provider</td><td class="p-3">${vehicleInfoStruct.insuranceProvider}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Policy Number</td><td class="p-3">${vehicleInfoStruct.policyNumber}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Policy Validity</td><td class="p-3">${vehicleInfoStruct.policyValidity}</td></tr>
                <tr class="hover:bg-gray-600"><td class="p-3 font-semibold">Insurance Type</td><td class="p-3">${vehicleInfoStruct.insuranceType}</td></tr>
              </tbody>
            </table>
          </div>
        ` : `
          <p class="text-red-500 text-center">No vehicle details found.</p>
        `}
      </div>
    `;

    // Accident History Table with Photos
    html += `
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-100">Accident History</h2>
        ${accidentHistory.length > 0 ? `
          <div class="overflow-x-auto">
            <table class="w-full bg-gray-700 rounded-lg shadow-md">
              <thead>
                <tr class="bg-gray-600 text-gray-100">
                  <th class="p-3 text-left">Photo</th>
                  <th class="p-3 text-left">Accident #</th>
                  <th class="p-3 text-left">Date & Time</th>
                  <th class="p-3 text-left">Location</th>
                  <th class="p-3 text-left">Description</th>
                  <th class="p-3 text-left">Cause</th>
                  <th class="p-3 text-left">Case Status</th>
                  <th class="p-3 text-left">Claim Status</th>
                  <th class="p-3 text-left">FIR Number</th>
                </tr>
              </thead>
              <tbody>
                ${accidentHistory.map((accident, index) => accident.exists ? `
                  <tr class="hover:bg-gray-600 transition-colors">
                    <td class="p-3 align-middle">
                      ${accident.photoUrl ? `
                        <img src="${accident.photoUrl}" alt="Accident ${index + 1} Photo" class="w-24 h-24 object-cover rounded-lg shadow-md" onerror="this.src='https://via.placeholder.com/100?text=Photo+Not+Found'; this.alt='Photo not found';">
                      ` : `
                        <div class="w-24 h-24 flex items-center justify-center bg-gray-600 rounded-lg text-gray-400 text-sm">No Photo</div>
                      `}
                    </td>
                    <td class="p-3 align-middle">${index + 1}</td>
                    <td class="p-3 align-middle">${new Date(accident.dateTime * 1000).toLocaleString()}</td>
                    <td class="p-3 align-middle">${accident.location}</td>
                    <td class="p-3 align-middle">${accident.description}</td>
                    <td class="p-3 align-middle">${accident.cause}</td>
                    <td class="p-3 align-middle">${accident.caseStatus}</td>
                    <td class="p-3 align-middle">${accident.claimStatus}</td>
                    <td class="p-3 align-middle">${accident.firNumber}</td>
                  </tr>
                ` : '').join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <p class="text-red-500 text-center">No accident history found.</p>
        `}
      </div>
    `;

    driverDetails.innerHTML = html;
  } catch (error) {
    console.error('Error fetching driver details:', error);
    alert('Error: ' + error.message);
    driverDetails.innerHTML = '<p class="text-center text-red-500">Error fetching driver details: ' + error.message + '</p>';
  }
}); 