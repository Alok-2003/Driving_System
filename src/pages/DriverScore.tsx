'use client';

import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import TruckPage from "./TruckPage";

// Dummy driver data function – no route params
const getDriverDetails = () => ({
  id: 1,
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
      weight: 3500, // in KG
      registrationDate: "15-Jan-2018",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Active",
      rtoLocation: "Lucknow",
      lastServiceDate: "20-Oct-2023",
      mileage: 80000, // in KM
    },
    {
      truckName: "Mahindra Bolero Pik-Up",
      deviceId: "DEF456UVW",
      vehicleNumber: "MH12CD5678",
      weight: 2800, // in KG
      registrationDate: "10-Mar-2019",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Expired",
      rtoLocation: "Mumbai",
      lastServiceDate: "15-Nov-2023",
      mileage: 60000, // in KM
    }
  ],
  rashDriving: 0,
  rapidAcceleration: 0,
  hardBrake: 0,
  maxTurnableSpeed: 8.5
});

export default function DriverDetailsPage() {
  const driver = getDriverDetails();

  // State for local polling metrics
  const [hardBrake, setHardBrake] = useState<number | null>(null);
  const [rapidAcceleration, setRapidAcceleration] = useState<number | null>(null);
  const [maxTurnableSpeed, setMaxTurnableSpeed] = useState<number | null>(null);
  const [drivingScore, setDrivingScore] = useState<number>(100);

  // New states for additional metrics
  const [rashDriving, setRashDriving] = useState<number>(driver.rashDriving);
  const [roughVibration, setRoughVibration] = useState<number>(0);
  const [harshBraking, setHarshBraking] = useState<number>(driver.hardBrake);
  const lastBrakingToastTime = useRef<number>(0);

  // State for real-time WebSocket data for gyro (rotation) and acceleration.
  const [gyro, setGyro] = useState({ x: 0, y: 0, z: 0 });
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });

  // New states to detect and count rapid acceleration events (threshold 20 m/s²)
  const [rapidAccelCount, setRapidAccelCount] = useState<number>(0);
  const [isHighAccel, setIsHighAccel] = useState<boolean>(false);

  // useEffect to poll metrics from data.json every second
  useEffect(() => {
    const fetchDriverMetrics = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        if (data.hb !== undefined) {
          setHardBrake(data.hb);
        }
        if (data.ra !== undefined) {
          setRapidAcceleration(data.ra);
        }
        if (data.mts !== undefined) {
          setMaxTurnableSpeed(data.mts);
        }
      } catch (error) {
        console.error("Error fetching metrics from data.json:", error);
      }
    };

    fetchDriverMetrics();
    const intervalId = setInterval(fetchDriverMetrics, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect to open a WebSocket connection and update gyro/accel in real time
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received WebSocket data:", data);
        // Check for gyro/rotation – we use whichever is provided:
        if (
          data.gyro &&
          typeof data.gyro.x === "number" &&
          typeof data.gyro.y === "number" &&
          typeof data.gyro.z === "number"
        ) {
          setGyro(data.gyro);
        } else if (
          data.rotation &&
          typeof data.rotation.x === "number" &&
          typeof data.rotation.y === "number" &&
          typeof data.rotation.z === "number"
        ) {
          setGyro(data.rotation);
        }
        // Update acceleration if available
        if (
          data.accel &&
          typeof data.accel.x === "number" &&
          typeof data.accel.y === "number" &&
          typeof data.accel.z === "number"
        ) {
          setAccel(data.accel);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  // useEffect to check for high acceleration events (magnitude > 20 m/s²)
  useEffect(() => {
    // Compute acceleration magnitude
    const magnitude = Math.sqrt(accel.x ** 2 + accel.y ** 2 + accel.z ** 2);
    if (magnitude > 40 && !isHighAccel) {
      setRapidAccelCount((prev) => prev + 1);
      toast.error("High acceleration detected!");
      setIsHighAccel(true);
    } else if (magnitude <= 20 && isHighAccel) {
      // Reset flag once acceleration drops below threshold
      setIsHighAccel(false);
    }
  }, [accel, isHighAccel]);

  useEffect(() => {
    // Threshold for detecting a wavy (snake-like) motion for rash driving
    const rashThreshold = 0.5; // example threshold in radians
    if (Math.abs(gyro.x) > rashThreshold || Math.abs(gyro.y) > rashThreshold) {
      // Increment rash driving count if threshold is exceeded
      setRashDriving(prev => prev + 1);
      toast("Rash driving detected!", { icon: "🚗" });
    }
  }, [gyro]);

  useEffect(() => {
    // Threshold for slight but repetitive vibrations
    const vibrationLowerThreshold = 10;
    const vibrationUpperThreshold = 15; // prevent counting strong impacts
    if (
      Math.abs(accel.z) >= vibrationLowerThreshold &&
      Math.abs(accel.z) <= vibrationUpperThreshold
    ) {
      setRoughVibration(prev => prev + 1);
      toast("Rough road vibration detected!", { icon: "🛣️" });
    }
  }, [accel.z]);

  useEffect(() => {
    const brakingThreshold = -5; // If accel.x is less than -5 m/s², consider it harsh braking
    if (accel.x < brakingThreshold) {
      const now = Date.now();
      if (now - lastBrakingToastTime.current > 2000) { // 2 seconds delay
        lastBrakingToastTime.current = now;
        setHarshBraking(prev => prev + 1);
        toast("Harsh braking detected!", { icon: "🚨" });
      }
    }
  }, [accel.x]);

  // Calculate the driving score based on polled metrics
  const calculateDrivingScore = () => {
    let score = 100;
    if (hardBrake === 1) score -= 10;
    if (rapidAcceleration === 1) score -= 5;
    if (maxTurnableSpeed !== null) score += maxTurnableSpeed * 2;
    score = Math.max(0, Math.min(100, score));
    setDrivingScore(score);
  };

  // Recalculate driving score when metrics change
  useEffect(() => {
    if (hardBrake !== null || rapidAcceleration !== null || maxTurnableSpeed !== null) {
      calculateDrivingScore();
    }
  }, [hardBrake, rapidAcceleration, maxTurnableSpeed]);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="fixed top-0 z-10 right-0 overflow-hidden max-h-screen w-[300px]">
        <Toaster position="top-center" toastOptions={{duration: 1000}} />
      </div>
      <div className="container mx-auto py-10 px-4 bg-white z-50">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
          Driver Details
        </h1>

        {/* Metric Cards (from polling data) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Rash Driving Card */}
          <div className="rounded-xl shadow-lg p-4 bg-red-100 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Rash Driving</h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-600">{rashDriving}</p>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-4 bg-yellow-100 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Harsh Acceleration</h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-yellow-600">
                {rapidAccelCount}
              </p>
            </div>
          </div>
          {/* Rough Road Vibration Card */}
          <div className="rounded-xl shadow-lg p-4 bg-green-100 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Rough Road Vibration</h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600">{roughVibration}</p>
            </div>
          </div>
          {/* Harsh Braking Card */}
          <div className="rounded-xl shadow-lg p-4 bg-orange-100 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Harsh Braking</h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-orange-600">
                {harshBraking}
              </p>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-4 bg-purple-100 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Curve Speed Limit </h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-600">
                {maxTurnableSpeed !== null ? `${maxTurnableSpeed.toFixed(2)} m/s` : "0 m/s"}
              </p>
            </div>
          </div>
          <div className="rounded-xl shadow-lg p-4 bg-blue-100 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Driver Behaviour Score </h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-600">
                0
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Metrics from WebSocket */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Real Time Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gyro / Rotation */}
            <div className="p-4 bg-white rounded-xl shadow-md transition-all transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Gyro / Rotation</h3>
              <p className="text-lg">
                X: {gyro.x.toFixed(2)} <span className="text-gray-600">rad</span>
              </p>
              <p className="text-lg">
                Y: {gyro.y.toFixed(2)} <span className="text-gray-600">rad</span>
              </p>
              <p className="text-lg">
                Z: {gyro.z.toFixed(2)} <span className="text-gray-600">rad</span>
              </p>
            </div>
            {/* Acceleration */}
            <div className="p-4 bg-white rounded-xl shadow-md transition-all transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Acceleration</h3>
              <p className="text-lg">
                X: {accel.x.toFixed(2)} <span className="text-gray-600">m/s²</span>
              </p>
              <p className="text-lg">
                Y: {accel.y.toFixed(2)} <span className="text-gray-600">m/s²</span>
              </p>
              <p className="text-lg">
                Z: {accel.z.toFixed(2)} <span className="text-gray-600">m/s²</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border border-black rounded-xl m-2">
          <TruckPage />
        </div>



        {/* Personal Information and Allocated Trucks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
            <dl className="space-y-4 text-gray-600">
              <div>
                <dt className="font-semibold">Name:</dt>
                <dd>{driver.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email:</dt>
                <dd>{driver.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone Number:</dt>
                <dd>{driver.phoneNumber}</dd>
              </div>
              <div>
                <dt className="font-semibold">Age:</dt>
                <dd>{driver.age}</dd>
              </div>
              <div>
                <dt className="font-semibold">Driving License:</dt>
                <dd>{driver.drivingLicense}</dd>
              </div>
            </dl>
          </div>

          {/* Allocated Trucks */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Allocated Trucks</h2>
            <div className="space-y-6">
              {driver.trucksAllocated.map((truck, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-sm transition-all hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800">{truck.truckName}</h3>
                  <p className="text-gray-600"><strong>Device ID:</strong> {truck.deviceId}</p>
                  <p className="text-gray-600"><strong>Vehicle Number:</strong> {truck.vehicleNumber}</p>
                  <p className="text-gray-600"><strong>Weight:</strong> {truck.weight} KG</p>
                  <p className="text-gray-600"><strong>Registration Date:</strong> {truck.registrationDate}</p>
                  <p className="text-gray-600"><strong>Insurance Status:</strong> {truck.insuranceStatus}</p>
                  <p className="text-gray-600"><strong>RTO Location:</strong> {truck.rtoLocation}</p>
                  <p className="text-gray-600"><strong>Last Service Date:</strong> {truck.lastServiceDate}</p>
                  <p className="text-gray-600"><strong>Mileage:</strong> {truck.mileage.toLocaleString()} KM</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optionally, display the calculated driving score */}
        {/*
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-green-600">Driving Score: {drivingScore}</h2>
        </div>
        */}
      </div>
    </div>
  );
}
