import React from 'react';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';

const WorldIDVerification: React.FC = () => {
  // Callback when the proof is received
  const handleVerify = async (proof: ISuccessResult) => {
    try {
      const res = await fetch("http://localhost:3000//api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      });

      if (!res.ok) {
        throw new Error("Verification failed.");
      }
      console.log("Verification successful", await res.json());
    } catch (error) {
      console.error("Error verifying proof:", error);
    }
  };

  // Callback when the modal is closed successfully
  const onSuccess = () => {
    // You can redirect the user or show a success message here
    console.log("Verification successful");
    window.location.href = "/success";
  };

  return (
    <IDKitWidget
      app_id="app_ad7a15c672b5ad2376c796299ca7b9f6"  // Your app_id from Worldcoin Developer Portal
      action="test-user"  // Your action from Worldcoin Developer Portal
      onSuccess={onSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Orb}  // Optional, depending on the verification level
    >
      {({ open }) => (
        <button onClick={open}>World ID Auth</button>
      )}
    </IDKitWidget>
  );
};

export default WorldIDVerification;



// app_id="app_ad7a15c672b5ad2376c796299ca7b9f6" // replace with your actual app ID from Worldcoin Developer Portal
// action="test-user" // replace with your actual action ID