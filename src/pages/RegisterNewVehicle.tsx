'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import QRScanner from '../components/QRScanner'
import toast from 'react-hot-toast'

type UlipVehicleDetails = {
  rc_owner_name: string
  rc_regn_no: string
  rc_regn_dt: string
  rc_regn_upto: string
  rc_chasi_no: string
  rc_eng_no: string
  rc_maker_desc: string
  rc_insurance_policy_no: string
  rc_insurance_upto: string
  rc_status: string
  rc_vch_catg_desc: string
}

export default function VehicleRegistrationForm() {
  const [deviceId, setDeviceId] = useState('')
  const deviceIdRef = useRef('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [ulipDl, setUlipDl] = useState<UlipVehicleDetails | null>(null)
  const [scanning, setScanning] = useState(false)

  const verifyDetails = async () => {
    setIsVerified(false)

  }
  useEffect(() => {
    deviceIdRef.current = deviceId
    console.log("🎯 Device ID changed:", deviceId)
  }, [deviceId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!deviceId || !vehicleNumber) {
      toast.success("Please fill all the fields")
      return
    }

    toast.success("Device linked with vehicle successfully!")

    // setDeviceId('')
    // setVehicleNumber('')
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Link Device with Vehicle</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="deviceId">Device ID</label>
              <div className="flex gap-2 items-center">
                <input
                  id="deviceId"
                  value={deviceId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeviceId(e.target.value)}
                  placeholder="Enter Device ID"
                />

                <button
                  type="button"
                  onClick={() => setScanning(true)}
                >
                  Scan QR
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Current Device ID: <code>{deviceId}</code>
            </div>

            <div>
              <label htmlFor="vehicleNumber">Vehicle Number</label>
              <input
                id="vehicleNumber"
                value={vehicleNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVehicleNumber(e.target.value)}
                placeholder="Enter Vehicle Number"
              />
            </div>

            <button type="button" onClick={verifyDetails} disabled={isVerified}>
              {isVerified ? "Verified" : "Verify Details"}
            </button>

            {isVerified && ulipDl && (
              <div className='mb-10'>
                <h1 className='font-bold text-xl underline mb-4'>Verify Details</h1>
                <p>Driver Full Name : {ulipDl.rc_owner_name}</p>
                <p>Registration Number : {ulipDl.rc_regn_no}</p>
                <p>Registration Date : {ulipDl.rc_regn_dt}</p>
                <p>Registration upto : {ulipDl.rc_regn_upto}</p>
                <p>Chasi Number : {ulipDl.rc_chasi_no}</p>
                <p>Engine Number : {ulipDl.rc_eng_no}</p>
                <p>Maker: {ulipDl.rc_maker_desc}</p>
                <p>Insurance Policy Number : {ulipDl.rc_insurance_policy_no}</p>
                <p>Insurance Upto : {ulipDl.rc_insurance_upto}</p>
                <p>Status : {ulipDl.rc_status}</p>
                <p>Vehicle Category : {ulipDl.rc_vch_catg_desc}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button type="submit">Register</button>
              <button type="button" className='text-sm' >Stop Registration</button>
            </div>
          </form>
        </div>
      </div>

      {scanning && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative w-[320px] h-[320px] rounded-lg bg-white p-4 shadow-xl">
            
            <QRScanner
              onScanSuccess={(text) => {
                console.log("✅ Scanned:", text);
                setDeviceId(text); // Updates the input with the scanned value
                setScanning(false);
                toast.success("Device ID scanned successfully!");
              }}
              onClose={() => setScanning(false)}
            />
          </div>
        </div>
      )}

    </div>)
}
