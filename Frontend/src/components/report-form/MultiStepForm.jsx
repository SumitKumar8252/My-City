// MultiStepForm.js
import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CitizenDetails from "./CitizenDetails";
import IssueDetails from "./IssueDetails";
import UploadImage from "./UploadImage";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    issueType: "",
    issueTitle: "",
    issueDescription: "",
    images: [],
  });

  // Ref to store the stopCamera callback from UploadImage
  const stopCameraRef = useRef(() => {});

  // Memoized handlers
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleImageChange = useCallback((files) => {
    setFormData((prev) => ({ ...prev, images: files }));
  }, []);

  const nextStep = useCallback(() => {
    // Basic validation
    if (step === 1 && (!formData.name || !formData.email)) {
      alert("Please fill in required fields.");
      return;
    }
    if (step === 2 && !formData.issueTitle) {
      alert("Please provide an issue title.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  }, [step, formData]);

  const prevStep = useCallback(() => {
    // Call stopCamera before moving to previous step
    if (step === 3) {
      stopCameraRef.current();
    }
    setStep((prev) => Math.max(prev - 1, 1));
  }, [step]);

  const handleStopCamera = useCallback((stopFn) => {
    stopCameraRef.current = stopFn;
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Upload images to Cloudinary if any
    const uploadedImageUrls = [];
    if (formData.images.length > 0) {
      const uploadPromises = formData.images.map(async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Replace with your cloud name
            data
          );
          uploadedImageUrls.push(response.data.secure_url);
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          alert("Failed to upload one or more images.");
          return;
        }
      });

      await Promise.all(uploadPromises);

      // Update formData with Cloudinary URLs
      setFormData((prev) => ({ ...prev, images: uploadedImageUrls }));
    }

    // Call stopCamera before submission (optional, if still active)
    stopCameraRef.current();

    console.log("Form Submitted:", formData);
    alert(JSON.stringify(formData, null, 2));
  }, [formData]);

  // Step titles
  const stepTitles = ["Citizen Details", "Issue Details", "Upload Images"];

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
          {stepTitles.map((title, index) => (
            <div
              key={title}
              className={`flex-1 text-center ${
                step > index + 1
                  ? "text-blue-600"
                  : step === index + 1
                  ? "text-blue-800"
                  : "text-gray-400"
              }`}
            >
              {title}
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {step === 1 && <CitizenDetails data={formData} handleChange={handleChange} />}
            {step === 2 && <IssueDetails data={formData} handleChange={handleChange} />}
            {step === 3 && (
              <UploadImage
                data={formData}
                handleImageChange={handleImageChange}
                onStopCamera={handleStopCamera}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              &lt; Previous
            </button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Next &gt;
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;