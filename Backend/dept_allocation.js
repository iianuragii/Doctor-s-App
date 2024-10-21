function dept_allocation(diseaseName) {

    const diseaseVsDoctor = {
        "Drug Reaction": "Allergist",
        "Allergy": "Allergist",
        "Hypertension": "Cardiologist",
        "Heart attack": "Cardiologist",
        "Psoriasis": "Dermatologist",
        "Chicken pox": "Dermatologist",
        "Acne": "Dermatologist",
        "Impetigo": "Dermatologist",
        "Fungal infection": "Dermatologist",
        "Hypothyroidism": "Endocrinologist",
        "Diabetes": "Endocrinologist",
        "Hypoglycemia": "Endocrinologist",
        "Hyperthyroidism": "Endocrinologist",
        "GERD": "Gastroenterologist",
        "Peptic ulcer disease": "Gastroenterologist",
        "Jaundice": "Gastroenterologist",
        "Dimorphic hemmorhoids(piles)": "Gastroenterologist",
        "Gastroenteritis": "Gastroenterologist",
        "Urinary tract infection": "Gynecologist",
        "Chronic cholestasis": "Hepatologist",
        "Hepatitis A": "Hepatologist",
        "Hepatitis B": "Hepatologist",
        "Hepatitis C": "Hepatologist",
        "Hepatitis E": "Hepatologist",
        "Hepatitis D": "Hepatologist",
        "Alcoholic hepatitis": "Hepatologist",
        "Malaria": "Internal Medicine",
        "Dengue": "Internal Medicine",
        "Migraine": "Neurologist",
        "Cervical spondylosis": "Neurologist",
        "Paralysis (brain hemorrhage)": "Neurologist",
        "AIDS": "Osteopathic",
        "(vertigo) Paroymsal  Positional Vertigo": "Otolaryngologist",
        "Common Cold": "Otolaryngologist",
        "Typhoid": "Pediatrician",
        "Varicose veins": "Phlebologist",
        "Bronchial Asthma": "Pulmonologist",
        "Pneumonia": "Pulmonologist",
        "Osteoarthritis": "Rheumatologists",
        "Arthritis": "Rheumatologists",
        "Tuberculosis": "Pulmonologist"
    };
    
      
    console.log(`Disease : ${diseaseName}`);
    console.log(`Allocated Department : ${diseaseVsDoctor[diseaseName]}`);
    return diseaseVsDoctor[diseaseName] || "Respective department not found";

}

module.exports = { dept_allocation };