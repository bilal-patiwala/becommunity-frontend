import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RecommendationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const interestvalues = location.state?.interestvalues;
  const [interestdata, setInterestData] = useState([]);

  useEffect(() => {
    if (interestvalues) {
      setInterestData(interestvalues);
    }
  }, [interestvalues]);

  return (
    <div>
      {/* Use the interestdata state */}
      {interestdata.map((interest) => (
        <div key={interest}>{interest}</div>
      ))}
    </div>
  );
}

export default RecommendationPage;
