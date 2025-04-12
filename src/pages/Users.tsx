// src/pages/UsersPage.jsx
import React, { useState } from "react";

const users = [
  { id: 1, name: "Rakesh", email: "rakesh@example.com" },
  { id: 2, name: "Mukesh", email: "mukesh@example.com" },
  { id: 3, name: "Amit", email: "amit@example.com" },
];

// This would typically come from an API or database based on the user ID
const getUserDetails = (id: number) => ({
  id: parseInt(id),
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phoneNumber: "+91 98765 43210",
  age: 38,
  drivingLicense: "DL1234567890",
  trucksAllocated: [
    {
      truckName: "Tata 407",
      deviceId: "ABC123XYZ",
      vehicleNumber: "UP32AB1234",
      weight: 3500,
      registrationDate: "15-Jan-2018",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Active",
      rtoLocation: "Lucknow",
      lastServiceDate: "20-Oct-2023",
      mileage: 80000,
    },
    {
      truckName: "Mahindra Bolero Pik-Up",
      deviceId: "DEF456UVW",
      vehicleNumber: "MH12CD5678",
      weight: 2800,
      registrationDate: "10-Mar-2019",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Expired",
      rtoLocation: "Mumbai",
      lastServiceDate: "15-Nov-2023",
      mileage: 60000,
    }
  ],
  totalDeliveries: 22,
  drivingScore: 95,
  totalKm: 373,
});

export default function Users() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // If a user is selected, get their details.
  const userDetails = selectedUserId ? getUserDetails(selectedUserId) : null;

  if (selectedUserId) {
    return (
      <div className="container mx-auto py-4 px-4">
        <button
          onClick={() => setSelectedUserId(null)}
          className="mb-4 text-blue-500 hover:underline"
        >
          &larr; Back to Users
        </button>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          User Details
        </h1>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-100 rounded-xl p-4 transition-all transform">
            <h2 className="text-xl font-semibold text-gray-700">Total Deliveries</h2>
            <p className="text-5xl font-bold text-blue-600 text-center">
              {userDetails!.totalDeliveries}
            </p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 transition-all transform">
            <h2 className="text-xl font-semibold text-gray-700">Driving Score</h2>
            <p className="text-5xl font-bold text-green-600 text-center">
              {userDetails!.drivingScore.toFixed(1)}%
            </p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 transition-all transform">
            <h2 className="text-xl font-semibold text-gray-700">Total KM</h2>
            <p className="text-5xl font-bold text-yellow-600 text-center">
              {userDetails!.totalKm.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Personal Information and Allocated Trucks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded p-6 transition-all transform">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>
            <dl className="space-y-4 text-gray-600">
              <div>
                <dt className="font-semibold">Name:</dt>
                <dd>{userDetails!.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email:</dt>
                <dd>{userDetails!.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone Number:</dt>
                <dd>{userDetails!.phoneNumber}</dd>
              </div>
              <div>
                <dt className="font-semibold">Age:</dt>
                <dd>{userDetails!.age}</dd>
              </div>
              <div>
                <dt className="font-semibold">Driving License:</dt>
                <dd>{userDetails!.drivingLicense}</dd>
              </div>
            </dl>
          </div>

          {/* Allocated Trucks */}
          <div className="bg-gray-50 rounded p-6 transition-all transform">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Allocated Trucks
            </h2>
            <div className="space-y-6">
              {userDetails!.trucksAllocated.map((truck, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {truck.truckName}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Device ID:</strong> {truck.deviceId}
                  </p>
                  <p className="text-gray-600">
                    <strong>Vehicle Number:</strong> {truck.vehicleNumber}
                  </p>
                  <p className="text-gray-600">
                    <strong>Weight:</strong> {truck.weight} KG
                  </p>
                  <p className="text-gray-600">
                    <strong>Registration Date:</strong> {truck.registrationDate}
                  </p>
                  <p className="text-gray-600">
                    <strong>Insurance Status:</strong> {truck.insuranceStatus}
                  </p>
                  <p className="text-gray-600">
                    <strong>RTO Location:</strong> {truck.rtoLocation}
                  </p>
                  <p className="text-gray-600">
                    <strong>Last Service Date:</strong> {truck.lastServiceDate}
                  </p>
                  <p className="text-gray-600">
                    <strong>Mileage:</strong>{" "}
                    {truck.mileage.toLocaleString()} KM
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Users List view
  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => setSelectedUserId(user.id)}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
