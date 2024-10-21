from flask import Flask, request, jsonify
import pickle
import joblib
import os
from dotenv import load_dotenv
import numpy as np

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Step 1: Specify the directory and file name where the model is saved

directory = os.getenv('MODEL_DIRECTORY') 
model_filename = 'disease_prediction_model.pkl'
label_encoder_filename='label_encoder_2.pkl'
scaler_filename='scaler.pkl'
file_path = os.path.join(directory, model_filename)
label_encoder_path=os.path.join(directory,label_encoder_filename)
scaler_path=os.path.join(directory,scaler_filename)

# Step 2: Load the saved model
loaded_model = joblib.load(file_path)
print(f"Model loaded from {file_path}")
label_encoder=joblib.load(label_encoder_path)
print(f"Label Encoder loaded from {label_encoder_path}")
scaler=joblib.load(scaler_path)
print(f"Scaler loaded from {scaler_path}")

# Load the trained model
def load_model(model_path):
    with open(model_path, 'rb') as model_file:
        model = joblib.load(model_file)
    return model

# Preprocess the input symptoms (you may need to modify this based on your training data)
def preprocess_symptoms(symptoms, all_symptoms_list):
    """
    Symptoms: list of symptoms from user input
    all_symptoms_list: the list of all possible symptoms used during model training
    """
    # Create an empty vector of 0s representing all symptoms
    input_vector = [0] * len(all_symptoms_list)
    
    # Set 1 for the symptoms that the user has
    for symptom in symptoms:
        if symptom in all_symptoms_list:
            index = all_symptoms_list.index(symptom)
            input_vector[index] = 1
    #print(input_vector)
    return np.array([input_vector])  # Model expects input in 2D array form

# Predict the disease
def predict(symptoms, model, all_symptoms_list, disease_labels):
    """
    symptoms: list of symptoms from user input
    model: the loaded machine learning model
    all_symptoms_list: list of all symptoms the model was trained on
    disease_labels: list of disease names corresponding to model output
    """
    # Preprocess the input
    input_data = preprocess_symptoms(symptoms, all_symptoms_list)

    # Debugging: Show the input vector
    print(f"Input vector (before scaling): {input_data}")

    # Scale the input data using the same scaler used during training
    input_data_scaled = scaler.transform(input_data)

    # Debugging: Show the scaled input vector
    print(f"Input vector (after scaling): {input_data_scaled}")
    
     # Predict using the model
    prediction = model.predict(input_data_scaled)

    # Debugging: Show the raw prediction (numeric)
    print(f"Raw prediction (numeric): {prediction}")

    # Convert the numeric prediction back to a disease label
    predicted_disease = label_encoder.inverse_transform(prediction)

    # Debugging: Show the predicted disease
    print(f"Predicted Disease: {predicted_disease}")

    return predicted_disease[0]

# Example usage

model_path = r"C:\Users\SWAPNIL\Documents\DoctorsApp-4thYear\Doctor-s-App\Prediction\disease_prediction_model.pkl"  # Path to your model file
all_symptoms_list = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 
'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 
'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 
'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 
'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 
'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 
'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 
'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 
'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 
'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 
'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 
'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 
'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 
'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 
'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 
'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 
'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 
'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 
'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 
'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 
'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 
'red_sore_around_nose', 'yellow_crust_ooze']  # The full list of symptoms from your training data

disease_labels = ['(vertigo) Paroymsal  Positional Vertigo','AIDS', 'Acne',
 'Alcoholic hepatitis' ,'Allergy' ,'Arthritis', 'Bronchial Asthma',
 'Cervical spondylosis', 'Chicken pox', 'Chronic cholestasis', 'Common Cold',
 'Dengue' ,'Diabetes', 'Dimorphic hemmorhoids(piles)', 'Drug Reaction',
 'Fungal infection', 'GERD', 'Gastroenteritis', 'Heart attack', 'Hepatitis B',
 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Hypertension ',
 'Hyperthyroidism', 'Hypoglycemia', 'Hypothyroidism', 'Impetigo', 'Jaundice',
 'Malaria', 'Migraine', 'Osteoarthristis', 'Paralysis (brain hemorrhage)',
 'Peptic ulcer diseae' ,'Pneumonia', 'Psoriasis' ,'Tuberculosis' ,'Typhoid',
 'Urinary tract infection', 'Varicose veins', 'hepatitis A']  # The possible diseases the model can predict

    # Load the model
# model = load_model(model_path)

    # Get symptoms from user (example input)
# user_symptoms =  ['continuous_sneezing','high_fever','cough']

    # Predict the disease
# predicted_disease = predict(user_symptoms, loaded_model, all_symptoms_list, disease_labels)


# print(f"Predicted Disease: {predicted_disease}")


@app.route('/predict', methods=['POST'])
def predict_disease():
    data = request.json
    user_symptoms = data['symptoms']
    predicted_disease = predict(user_symptoms, loaded_model, all_symptoms_list, disease_labels)
    print(f"Predicted Disease: {predicted_disease}")
    print(f"user symptoms: {user_symptoms}")
    return jsonify({'predicted_disease': predicted_disease})

if __name__ == '__main__':
    app.run(port=5000)  # You can choose any available port