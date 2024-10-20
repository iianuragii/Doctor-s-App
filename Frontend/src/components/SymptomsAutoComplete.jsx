import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SymptomsAutoComplete = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  const suggestionsList1 = [
    "red sore around nose", "fast heart rate", "weight gain", "spinning movements",
   "cough", "loss of appetite", "weakness of one body side", "muscle weakness",
   "diarrhoea", "pain during bowel movements", "cold hands and feets", "sinus pressure",
   "yellowing of eyes", "dizziness", "swollen extremeties", "dark urine", "anxiety",
   "knee pain", "vomiting", "stomach pain", "breathlessness", "excessive hunger",
   "mood swings", "blister", "rusty sputum", "pain in anal region", 
   "blurred and distorted vision", "mucoid sputum", "irritability", "cramps", 
   "restlessness", "irregular sugar level", "painful walking", "hip joint pain", 
   "swelling of stomach", "red spots over body", "continuous sneezing", 
   "weakness in limbs", "small dents in nails", "prominent veins on calf", 
   "skin rash", "back pain", "dehydration", "high fever", "ulcers on tongue", 
   "constipation", "watering from eyes", "stomach bleeding", "spotting urination", 
   "sunken eyes", "bloody stool", "receiving unsterile injections", "bruising", 
   "lack of concentration", "joint pain", "shivering", "silver like dusting", 
   "internal itching", "mild fever", "swollen legs", "swollen blood vessels", 
   "bladder discomfort", "foul smell of urine", "acute liver failure", 
   "extra marital contacts", "toxic look (typhos)", "increased appetite", 
   "obesity", "runny nose", "lethargy", "brittle nails", "yellow urine", 
   "muscle wasting", "nausea", "unsteadiness", "patches in throat", 
   "slurred speech", "polyuria", "fluid overload", "chest pain", 
   "visual disturbances", "blood in sputum", "movement stiffness", "itching", 
   "irritation in anus", "distention of abdomen", "indigestion", 
   "receiving blood transfusion", "passage of gases", "palpitations", 
   "malaise", "coma", "scurring", "muscle pain", "abnormal menstruation", 
   "stiff neck", "loss of smell", "burning micturition", "swelled lymph nodes", 
   "inflammatory nails", "weight loss", "family history", "nodal skin eruptions", 
   "blackheads", "fatigue", "history of alcohol consumption", "redness of eyes", 
   "sweating", "swelling joints", "pus filled pimples", "abdominal pain", 
   "yellowish skin", "enlarged thyroid", "neck pain", "altered sensorium", 
   "belly pain", "phlegm", "dischromic patches", "pain behind the eyes", 
   "skin peeling", "continuous feel of urine", "drying and tingling lips", 
   "throat irritation", "acidity", "chills", "congestion", 
   "puffy face and eyes", "loss of balance", "depression", 
   "yellow crust ooze", "headache"
  ];
  const suggestionsList = suggestionsList1.map(suggestion => suggestion.replace(/\s+/g, '_'));
  const REF_CHIPS = 131; // Maximum number of chips for progress calculation

  useEffect(() => {
    const filtered = suggestionsList.filter((symptom) =>
      symptom.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setDropdownVisible(true);
  };

  const handleSelectSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      const updatedSymptoms = [...selectedSymptoms, symptom];
      setSelectedSymptoms(updatedSymptoms);
      onChange(updatedSymptoms); // Notify parent component
    }
    setInputValue('');
    setDropdownVisible(false);
  };

  const handleRemoveSymptom = (symptom) => {
    const updatedSymptoms = selectedSymptoms.filter((s) => s !== symptom);
    setSelectedSymptoms(updatedSymptoms);
    onChange(updatedSymptoms); // Notify parent component
  };

  const clearOut = () => {
    setSelectedSymptoms([]);
    onChange([]); // Notify parent component
  };

  const percentage = ((selectedSymptoms.length % REF_CHIPS) / REF_CHIPS) * 100;
  const overflow = Math.floor(selectedSymptoms.length / REF_CHIPS);

  const highlightMatch = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ color: 'blue' }}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

return (
    <div className='flex flex-col items-center px-4 sm:px-0'>
      <button
        className='ml-8 bg-gray-500 text-white px-4 py-1 rounded-md'
        onClick={clearOut}
      >
        Clear Out
      </button>
      <p className='mb-1 text-lg font-semibold w-full sm:w-3/4 text-left text-gray-500'>Input Tags</p>
      <div className='w-full sm:w-3/4 relative' ref={inputRef}>
        <div className="flex flex-wrap items-center border-2 bg-gray-200 border-gray-300 rounded-2xl py-2 px-4">
          {selectedSymptoms.map((symptom, index) => (
            <div key={index} className="flex items-center bg-white text-black-500 font-semibold rounded-full px-3 py-1 m-1 shadow-lg">
              {symptom}
              <button
                className="ml-2"
                onClick={() => handleRemoveSymptom(symptom)}
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="Search symptoms..."
            className="flex-grow outline-none bg-transparent"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="ml-2" style={{ width: 30, height: 30 }}>
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                pathColor: overflow === 0 ? '#000000' : '#e74c3c',
                trailColor: '#e0e0e0'
              })}
            />
          </div>
        </div>
        {isDropdownVisible && filteredSuggestions.length > 0 && (
          <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full sm:w-2/5 left-1/2 transform -translate-x-1/2 z-10">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200 font-semibold"
                onClick={() => {
                  handleSelectSymptom(suggestion);
                  setInputValue('');
                  setFilteredSuggestions([]);
                }}
              >
                {highlightMatch(suggestion, inputValue)}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className='mt-1 text-sm text-gray-500 w-full sm:w-3/4 text-left'>Enter a comma-separated chips and enjoy</p>
    </div>
  );

};

export default SymptomsAutoComplete;

