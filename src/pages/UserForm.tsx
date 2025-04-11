'use client';

import { Bike, Bus, Car, Cog, Truck } from 'lucide-react';
import { useState } from 'react';

// Example step-based UserForm component
const UserForm = () => {
    // Step control
    const [step, setStep] = useState(1);
    const totalSteps = 6; // or however many steps you have
    const progress = (step / totalSteps) * 100;

    // Step 1: Fleet size
    const [fleetSize, setFleetSize] = useState('');
    // Step 2: Vehicle count
    const [vehicleCount, setVehicleCount] = useState('');
    // Step 3: Tracking needs
    const [trackingNeeds, setTrackingNeeds] = useState<string[]>([]);

    // Generic handlers
    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };
    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    // Step 1 handlers
    const handleFleetSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFleetSize(event.target.value);
    };
    const handleSubmitStep1 = () => {
        // alert(`Selected Fleet Size: ${fleetSize}`);
        // Move to step 2, or do any additional logic
        nextStep();
    };

    // Step 2 handlers
    const handleVehicleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleCount(event.target.value);
    };

    // Step 3 placeholder (extend as needed)
    const handleSubmitStep2 = () => {
        // alert(`You selected: ${vehicleCount} vehicles`);
        nextStep();
    };


    // ---------------- STEP 3 CODE BELOW ----------------
    const handleTrackingNeedsChange = (option: string) => {
        if (trackingNeeds.includes(option)) {
            // Uncheck
            setTrackingNeeds(trackingNeeds.filter((need) => need !== option));
        } else {
            // Check
            setTrackingNeeds([...trackingNeeds, option]);
        }
    };

    const handleSubmitStep3 = () => {
        // alert(`Tracking: ${trackingNeeds.join(', ') || 'No selection'}`);
        nextStep();
    };

    // Step 4 state: which additional GPS features are selected?
    const [gpsFeatures, setGpsFeatures] = useState<string[]>([]);

    const handleGpsFeaturesChange = (option: string) => {
        if (gpsFeatures.includes(option)) {
            // Uncheck this feature
            setGpsFeatures(gpsFeatures.filter((feature) => feature !== option));
        } else {
            // Check this feature
            setGpsFeatures([...gpsFeatures, option]);
        }
    };

    const handleSubmitStep4 = () => {
        // alert(`GPS Features: ${gpsFeatures.join(', ') || 'None'}`);
        nextStep(); // proceed to Step 5 or final step
    };

    // Step 5 state: ZIP code
    const [zipCode, setZipCode] = useState('');

    const handleSubmitStep5 = () => {
        // alert(`ZIP Code: ${zipCode}`);
        // or do any additional logic
        nextStep(); // proceed to Step 6 or final step
    };

    // Step 6 state: Company Name
    const [companyName, setCompanyName] = useState('');

    const handleSubmitStep6 = () => {
        // alert(`Company Name: ${companyName}`);
        // or do any additional logic
        nextStep(); // proceed to Step 7 or final step
    };



    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-center mb-2">
                <h2 className="text-2xl font-semibold">
                    Step {step} of {totalSteps}
                </h2>
            </div>

            {/* ---------------- STEP 1 ---------------- */}
            {step === 1 && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-4">
                    {/* Heading */}
                    <h1 className="text-xl md:text-2xl font-bold text-center">
                        Save by Comparing Fleet Tracking Prices
                    </h1>
                    {/* Question */}
                    <div className="mt-6 mb-4">
                        <p className="text-lg font-semibold">
                            What size fleet do you want to track?
                        </p>
                    </div>

                    {/* Radio Options */}
                    <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="radio"
                                name="fleetSize"
                                value="1-4 vehicles"
                                checked={fleetSize === '1-4 vehicles'}
                                onChange={handleFleetSizeChange}
                                className="mr-2"
                            />
                            Very small fleet (1-4 vehicles)
                        </label>

                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="radio"
                                name="fleetSize"
                                value="5-20 vehicles"
                                checked={fleetSize === '5-20 vehicles'}
                                onChange={handleFleetSizeChange}
                                className="mr-2"
                            />
                            Small fleet (5-20 vehicles)
                        </label>

                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="radio"
                                name="fleetSize"
                                value="21-50 vehicles"
                                checked={fleetSize === '21-50 vehicles'}
                                onChange={handleFleetSizeChange}
                                className="mr-2"
                            />
                            Average fleet (21-50 vehicles)
                        </label>

                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="radio"
                                name="fleetSize"
                                value="50+ vehicles"
                                checked={fleetSize === '50+ vehicles'}
                                onChange={handleFleetSizeChange}
                                className="mr-2"
                            />
                            Large fleet (50+ vehicles)
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleSubmitStep1}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            Compare Prices
                        </button>
                    </div>
                </div>
            )}

            {/* ---------------- STEP 2 ---------------- */}
            {step === 2 && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-4">
                    <h1 className="text-xl md:text-2xl font-bold text-center">
                        Save by Comparing Fleet Tracking Prices
                    </h1>

                    <div className="mt-6 mb-4">
                        <p className="text-lg font-semibold">
                            Please confirm the number of vehicles:
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="radio"
                                name="numberOfVehicles"
                                value="50-99"
                                checked={vehicleCount === '50-99'}
                                onChange={handleVehicleCountChange}
                                className="mr-2"
                            />
                            50-99
                        </label>

                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="radio"
                                name="numberOfVehicles"
                                value="100+"
                                checked={vehicleCount === '100+'}
                                onChange={handleVehicleCountChange}
                                className="mr-2"
                            />
                            100+
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevStep}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                        >
                            &larr;
                        </button>
                        <button
                            onClick={handleSubmitStep2}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            Continue
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        50 seconds left...
                    </p>
                </div>
            )}

            {/* ---------------- STEP 3 (THIS IS WHAT YOU REQUESTED) ---------------- */}
            {step === 3 && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-4">
                    {/* Heading */}
                    <h1 className="text-xl md:text-2xl font-bold text-center">
                        Save by Comparing Fleet Tracking Prices
                    </h1>


                    {/* Question */}
                    <div className="mt-6 mb-2">
                        <p className="text-lg font-semibold">What do you need to track?</p>
                        <p className="text-sm text-gray-500">
                            Please select all that apply, then click Continue.
                        </p>
                    </div>

                    {/* Checkbox Options */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* Vans / Trucks */}
                        <label
                            className={`flex flex-col items-center justify-center border p-3 rounded-md cursor-pointer hover:bg-gray-50 
                ${trackingNeeds.includes('Vans/Trucks')
                                    ? 'border-blue-500'
                                    : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="checkbox"
                                className="mb-2"
                                checked={trackingNeeds.includes('Vans/Trucks')}
                                onChange={() => handleTrackingNeedsChange('Vans/Trucks')}
                            />
                            <Bus/>
                            <span className="text-sm text-gray-700">Vans / Trucks</span>
                        </label>

                        {/* Heavy duty trucks / Semis */}
                        <label
                            className={`flex flex-col items-center justify-center border p-3 rounded-md cursor-pointer hover:bg-gray-50 
                ${trackingNeeds.includes('Heavy duty trucks / Semis')
                                    ? 'border-blue-500'
                                    : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="checkbox"
                                className="mb-2"
                                checked={trackingNeeds.includes('Heavy duty trucks / Semis')}
                                onChange={() =>
                                    handleTrackingNeedsChange('Heavy duty trucks / Semis')
                                }
                            />
                            <Truck />
                            <span className="text-sm text-gray-700">
                                Heavy duty trucks / Semis
                            </span>
                        </label>

                        {/* Cars / Automobiles */}
                        <label
                            className={`flex flex-col items-center justify-center border p-3 rounded-md cursor-pointer hover:bg-gray-50 
                ${trackingNeeds.includes('Cars/Automobiles')
                                    ? 'border-blue-500'
                                    : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="checkbox"
                                className="mb-2"
                                checked={trackingNeeds.includes('Cars/Automobiles')}
                                onChange={() => handleTrackingNeedsChange('Cars/Automobiles')}
                            />
                            <Car />
                            <span className="text-sm text-gray-700">
                                Cars / Automobiles
                            </span>
                        </label>

                        {/* Motorcycles */}
                        <label
                            className={`flex flex-col items-center justify-center border p-3 rounded-md cursor-pointer hover:bg-gray-50 
                ${trackingNeeds.includes('Motorcycles')
                                    ? 'border-blue-500'
                                    : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="checkbox"
                                className="mb-2"
                                checked={trackingNeeds.includes('Motorcycles')}
                                onChange={() => handleTrackingNeedsChange('Motorcycles')}
                            />
                            <Bike />
                            <span className="text-sm text-gray-700">Motorcycles</span>
                        </label>

                        {/* Construction Machinery */}
                        <label
                            className={`flex flex-col items-center justify-center border p-3 rounded-md cursor-pointer hover:bg-gray-50 
                ${trackingNeeds.includes('Construction Machinery')
                                    ? 'border-blue-500'
                                    : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="checkbox"
                                className="mb-2"
                                checked={trackingNeeds.includes('Construction Machinery')}
                                onChange={() =>
                                    handleTrackingNeedsChange('Construction Machinery')
                                }
                            />
                            <Cog/>
                            <span className="text-sm text-gray-700">
                                Construction Machinery
                            </span>
                        </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevStep}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                        >
                            &larr;
                        </button>
                        <button
                            onClick={handleSubmitStep3}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            Continue
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 text-center">
                        45 seconds left...
                    </p>
                </div>
            )}

            {/* ---------------- STEP 4 (EXAMPLE) ---------------- */}
            {step === 4 && (
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-md mt-4">
                    <h1 className="text-xl md:text-2xl font-bold text-center">
                        Save by Comparing Fleet Tracking Prices
                    </h1>

                    <div className="mt-6 mb-2">
                        <p className="text-lg font-semibold">
                            In addition to GPS Tracking, are you interested in any of these features?
                        </p>
                    </div>

                    {/* Checkbox Options */}
                    <div className=" grid grid-cols-2 gap-2 w-full ">
                        {/* Real-time GPS Tracking */}
                        <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gpsFeatures.includes('Real-time GPS Tracking')}
                                onChange={() => handleGpsFeaturesChange('Real-time GPS Tracking')}
                                className="mr-2"
                            />
                            Real-time GPS Tracking
                        </label>

                        {/* Dash cam */}
                        <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gpsFeatures.includes('Dash cam')}
                                onChange={() => handleGpsFeaturesChange('Dash cam')}
                                className="mr-2"
                            />
                            Dash cam
                        </label>

                        {/* Electronic logging device (ELD) */}
                        <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gpsFeatures.includes('ELD')}
                                onChange={() => handleGpsFeaturesChange('ELD')}
                                className="mr-2"
                            />
                            Electronic logging device (ELD)
                        </label>

                        {/* Fuel efficiency monitoring */}
                        <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gpsFeatures.includes('Fuel efficiency monitoring')}
                                onChange={() => handleGpsFeaturesChange('Fuel efficiency monitoring')}
                                className="mr-2"
                            />
                            Fuel efficiency monitoring
                        </label>

                        {/* Route optimization */}
                        <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gpsFeatures.includes('Route optimization')}
                                onChange={() => handleGpsFeaturesChange('Route optimization')}
                                className="mr-2"
                            />
                            Route optimization
                        </label>

                        {/* Other */}
                        <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gpsFeatures.includes('Other')}
                                onChange={() => handleGpsFeaturesChange('Other')}
                                className="mr-2"
                            />
                            Other
                        </label>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                        Please select all that apply, then click Continue.
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevStep}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                        >
                            &larr;
                        </button>
                        <button
                            onClick={handleSubmitStep4}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            Continue
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 text-center">
                        40 seconds left...
                    </p>
                </div>
            )}

            {step === 5 && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-4">
                    <h1 className="text-xl md:text-2xl font-bold text-center">
                        Save by Comparing Fleet Tracking Prices
                    </h1>

                    {/* ZIP Code Field */}
                    <div className="mt-6 mb-4">
                        <label className="block text-lg font-semibold mb-1">
                            Company ZIP code
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your ZIP code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* Optional icon inside input - if you want a location icon */}
                            {/* <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg>...icon here...</svg>
        </div> */}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Your ZIP code ensures quotes are as accurate as possible for your area.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevStep}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                        >
                            &larr;
                        </button>
                        <button
                            onClick={handleSubmitStep5}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            Continue
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 text-center">
                        30 seconds left...
                    </p>
                </div>
            )}

            {step === 6 && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-4">
                    <h1 className="text-xl md:text-2xl font-bold text-center">
                        Save by Comparing Fleet Tracking Prices
                    </h1>

                    {/* Company Name Field */}
                    <div className="mt-6 mb-4">
                        <label className="block text-lg font-semibold mb-1">
                            Company Name
                        </label>

                        {/* Input with optional check icon on the right */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* Check icon (optional) */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M16.707 5.293a1 1 0 00-1.414-1.414L8 10.586 4.707 7.293a1 1 0 00-1.414 1.414l4 4a1 
                     1 0 001.414 0l8-8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={prevStep}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                        >
                            &larr;
                        </button>
                        <button
                            onClick={handleSubmitStep6}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            Continue
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 text-center">
                        20 seconds left...
                    </p>
                </div>
            )}


        </div>
    );
};

export default UserForm;
