document.getElementById('view-driver-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const driverId = document.getElementById('driverId').value.trim();
  const driverDetails = document.getElementById('driverDetails');
  const fetchButton = document.getElementById('fetchDriver');

  if (!driverId || isNaN(driverId)) {
    alert('Please enter a valid Driver ID (numeric)');
    driverDetails.innerHTML = '';
    return;
  }

  // Loading state
  fetchButton.disabled = true;
  fetchButton.textContent = 'Fetching...';
  driverDetails.innerHTML = '<p class="text-center text-gray-500 animate-pulse">Loading driver details...</p>';

  try {
    const contract = await getContract();

    // Check if driver exists
    const driverExists = await contract.methods.driverExists(driverId).call();
    if (!driverExists) {
      alert('Driver with ID ' + driverId + ' does not exist.');
      driverDetails.innerHTML = '<p class="text-center text-red-500 animate__animated animate__fadeIn">No driver found for ID ' + driverId + '.</p>';
      return;
    }

    // Call getDriverData
    const result = await contract.methods.getDriverData(driverId).call();

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

    // Generate HTML with enhanced styling and animations
    let html = '';

    // Driver Image
    html += `
      <div class="mb-12 text-center animate__animated animate__fadeIn" style="animation-delay: 0.1s;">
        <h2 class="text-3xl font-bold mb-6 text-navy-blue">Driver Profile</h2>
        ${driverInfoStruct.imageUrl ? `
          <div class="relative inline-block">
            <img src="${driverInfoStruct.imageUrl}" alt="Driver Image" class="max-w-xs rounded-2xl shadow-2xl border-4 border-gold transform transition-transform hover:scale-105" onerror="this.src='https://placehold.co/300x300?text=Image+Not+Found'; this.alt='Image not found';">
            <div class="absolute inset-0 rounded-2xl border-4 border-gold opacity-20 pointer-events-none"></div>
          </div>
        ` : `
          <p class="text-red-500 font-semibold">No image provided.</p>
        `}
      </div>
    `;

    // Driver Details Card
    html += `
      <div class="mb-12 animate__animated animate__fadeIn" style="animation-delay: 0.2s;">
        <h2 class="text-3xl font-bold mb-6 text-navy-blue">Driver Details</h2>
        ${driverInfoStruct.exists ? `
          <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span class="font-semibold text-dark-gray">Name:</span> ${driverInfoStruct.name}</div>
              <div><span class="font-semibold text-dark-gray">DOB:</span> ${driverInfoStruct.dob}</div>
              <div><span class="font-semibold text-dark-gray">Mobile:</span> ${driverInfoStruct.mobile}</div>
              <div><span class="font-semibold text-dark-gray">Email:</span> ${driverInfoStruct.email}</div>
              <div><span class="font-semibold text-dark-gray">License Number:</span> ${driverInfoStruct.licenseNumber}</div>
              <div><span class="font-semibold text-dark-gray">Address:</span> ${driverInfoStruct.permanentAddress}</div>
              <div><span class="font-semibold text-dark-gray">Blood Group:</span> ${driverInfoStruct.bloodGroup}</div>
              <div><span class="font-semibold text-dark-gray">Vehicle Type:</span> ${driverInfoStruct.vehicleType}</div>
            </div>
          </div>
        ` : `
          <p class="text-red-500 text-center font-semibold">No driver details found.</p>
        `}
      </div>
    `;

    // Vehicle Details Card
    html += `
      <div class="mb-12 animate__animated animate__fadeIn" style="animation-delay: 0.3s;">
        <h2 class="text-3xl font-bold mb-6 text-navy-blue">Vehicle Details</h2>
        ${vehicleInfoStruct.exists ? `
          <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span class="font-semibold text-dark-gray">Company:</span> ${vehicleInfoStruct.company}</div>
              <div><span class="font-semibold text-dark-gray">Model:</span> ${vehicleInfoStruct.model}</div>
              <div><span class="font-semibold text-dark-gray">Registration:</span> ${vehicleInfoStruct.registrationNumber}</div>
              <div><span class="font-semibold text-dark-gray">PUC Dates:</span> ${vehicleInfoStruct.pucDates}</div>
              <div><span class="font-semibold text-dark-gray">Owner:</span> ${vehicleInfoStruct.ownerName}</div>
              <div><span class="font-semibold text-dark-gray">Insurance Provider:</span> ${vehicleInfoStruct.insuranceProvider}</div>
              <div><span class="font-semibold text-dark-gray">Policy Number:</span> ${vehicleInfoStruct.policyNumber}</div>
              <div><span class="font-semibold text-dark-gray">Policy Validity:</span> ${vehicleInfoStruct.policyValidity}</div>
              <div><span class="font-semibold text-dark-gray">Insurance Type:</span> ${vehicleInfoStruct.insuranceType}</div>
            </div>
          </div>
        ` : `
          <p class="text-red-500 text-center font-semibold">No vehicle details found.</p>
        `}
      </div>
    `;

    // Accident History Table
    html += `
      <div class="animate__animated animate__fadeIn" style="animation-delay: 0.4s;">
        <h2 class="text-3xl font-bold mb-6 text-navy-blue">Accident History</h2>
        ${accidentHistory.length > 0 ? `
          <div class="overflow-x-auto">
            <table class="w-full bg-navy-blue text-white rounded-2xl shadow-xl">
              <thead>
                <tr class="bg-gold text-navy-blue">
                  <th class="p-4 text-left rounded-tl-2xl">Photo</th>
                  <th class="p-4 text-left">Accident #</th>
                  <th class="p-4 text-left">Date & Time</th>
                  <th class="p-4 text-left">Location</th>
                  <th class="p-4 text-left">Description</th>
                  <th class="p-4 text-left">Cause</th>
                  <th class="p-4 text-left">Case Status</th>
                  <th class="p-4 text-left">Claim Status</th>
                  <th class="p-4 text-left rounded-tr-2xl">FIR Number</th>
                </tr>
              </thead>
              <tbody>
                ${accidentHistory.map((accident, index) => accident.exists ? `
                  <tr class="hover:bg-gray-700 transition-colors duration-200 animate__animated animate__fadeInUp" style="animation-delay: ${0.1 * (index + 1)}s;">
                    <td class="p-4 align-middle">
                      ${accident.photoUrl ? `
                        <img src="${accident.photoUrl}" alt="Accident ${index + 1} Photo" class="w-20 h-20 object-cover rounded-lg shadow-md border-2 border-gold transform transition-transform hover:scale-110" onerror="this.src='https://placehold.co/100x100?text=Photo+Not+Found'; this.alt='Photo not found';">
                      ` : `
                        <div class="w-20 h-20 flex items-center justify-center bg-gray-600 rounded-lg text-gray-400 text-xs">No Photo</div>
                      `}
                    </td>
                    <td class="p-4 align-middle">${index + 1}</td>
                    <td class="p-4 align-middle">${new Date(accident.dateTime * 1000).toLocaleString()}</td>
                    <td class="p-4 align-middle">${accident.location}</td>
                    <td class="p-4 align-middle">${accident.description}</td>
                    <td class="p-4 align-middle">${accident.cause}</td>
                    <td class="p-4 align-middle">${accident.caseStatus}</td>
                    <td class="p-4 align-middle">${accident.claimStatus}</td>
                    <td class="p-4 align-middle">${accident.firNumber}</td>
                  </tr>
                ` : '').join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <p class="text-red-500 text-center font-semibold">No accident history found.</p>
        `}
      </div>
    `;

    driverDetails.innerHTML = html;
  } catch (error) {
    console.error('Error fetching driver details:', error);
    alert('Error: ' + error.message);
    driverDetails.innerHTML = '<p class="text-center text-red-500 animate__animated animate__fadeIn">Error fetching driver details: ' + error.message + '</p>';
  } finally {
    fetchButton.disabled = false;
    fetchButton.textContent = 'Fetch Details';
  }
});