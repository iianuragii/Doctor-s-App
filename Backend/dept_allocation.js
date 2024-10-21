function dept_allocation(diseaseName) {

    const diseaseVsDoctor = {
        "Drug_Reaction": "Allergist",
        "Allergy": "Allergist",
        "Hypertension": "Cardiologist",
        "Heart_attack": "Cardiologist",
        "Psoriasis": "Dermatologist",
        "Chicken_pox": "Dermatologist",
        "Acne": "Dermatologist",
        "Impetigo": "Dermatologist",
        "Fungal_infection": "Dermatologist",
        "Hypothyroidism": "Endocrinologist",
        "Diabetes": "Endocrinologist",
        "Hypoglycemia": "Endocrinologist",
        "Hyperthyroidism": "Endocrinologist",
        "GERD": "Gastroenterologist",
        "Peptic_ulcer_disease": "Gastroenterologist",
        "Jaundice": "Gastroenterologist",
        "Dimorphic_hemorrhoids_(piles)": "Gastroenterologist",
        "Gastroenteritis": "Gastroenterologist",
        "Urinary_tract_infection": "Gynecologist",
        "Chronic_cholestasis": "Hepatologist",
        "Hepatitis_A": "Hepatologist",
        "Hepatitis_B": "Hepatologist",
        "Hepatitis_C": "Hepatologist",
        "Hepatitis_E": "Hepatologist",
        "Hepatitis_D": "Hepatologist",
        "Alcoholic_hepatitis": "Hepatologist",
        "Malaria": "Internal_Medicine",
        "Dengue": "Internal_Medicine",
        "Migraine": "Neurologist",
        "Cervical_spondylosis": "Neurologist",
        "Paralysis_(brain_hemorrhage)": "Neurologist",
        "AIDS": "Osteopathic",
        "Paroymsal_Positional_Vertigo_(vertigo)": "Otolaryngologist",
        "Common_Cold": "Otolaryngologist",
        "Typhoid": "Pediatrician",
        "Varicose_veins": "Phlebologist",
        "Bronchial_Asthma": "Pulmonologist",
        "Pneumonia": "Pulmonologist",
        "Osteoarthristis": "Rheumatologists",
        "Arthritis": "Rheumatologists",
        "Tuberculosis": "Pulmonologist"
    };
      
    console.log(`Disease : ${diseaseName}`);
    console.log(`Allocated Department : ${diseaseVsDoctor[diseaseName]}`);
    return diseaseVsDoctor[diseaseName] || "Respective department not found";

}

module.exports = { dept_allocation };