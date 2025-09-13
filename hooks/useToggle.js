import { useState } from "react";

export const useToggle = () => {
  const [officerToggle, setOfficerToggle] = useState(false);
  const [feedbackToggle, setFeedbackToggle] = useState(false);
  const [responseToggle, setResponseToggle] = useState(false);

  const handleOfficerToggle = () => {
    setOfficerToggle(!officerToggle);
    setFeedbackToggle(false);
    setResponseToggle(false);
  };

  const handleFeedbackToggle = () => {
    setFeedbackToggle(!feedbackToggle);
    setOfficerToggle(false);
    setResponseToggle(false);
  };

  const handleResponseToggle = () => {
    setResponseToggle(!responseToggle);
    setOfficerToggle(false);
    setFeedbackToggle(false);
  };

  return {
    officerToggle,
    feedbackToggle,
    responseToggle,
    setOfficerToggle,
    setFeedbackToggle,
    setResponseToggle,
    handleOfficerToggle,
    handleFeedbackToggle,
    handleResponseToggle,
  };
};
