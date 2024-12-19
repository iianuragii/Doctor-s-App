require('dotenv').config();
const { MongoClient } = require('mongodb');
const {convertToActualTime} = require('./time_conversion');
const uri = process.env.SECRET_KEY;
const client = new MongoClient(uri);

async function doc_allocation(input, department) {
    let sum = 0;

    const symptoms = {
        "red_sore_around_nose": 7,
        "fast_heart_rate": 10,
        "weight_gain": 5,
        "spinning_movements": 6,
        "cough": 9,
        "loss_of_appetite": 7,
        "weakness_of_one_body_side": 9,
        "muscle_weakness": 8,
        "diarrhoea": 8,
        "pain_during_bowel_movements": 8,
        "cold_hands_and_feets": 2,
        "sinus_pressure": 3,
        "yellowing_of_eyes": 9,
        "dizziness": 8,
        "swollen_extremeties": 9,
        "dark_urine": 9,
        "anxiety": 3,
        "knee_pain": 3,
        "vomiting": 9,
        "stomach_pain": 7,
        "breathlessness": 8,
        "excessive_hunger": 9,
        "mood_swings": 3,
        "blister": 8,
        "rusty_sputum": 9,
        "pain_in_anal_region": 9,
        "blurred_and_distorted_vision": 9,
        "mucoid_sputum": 6,
        "irritability": 9,
        "cramps": 8,
        "restlessness": 6,
        "irregular_sugar_level": 9,
        "painful_walking": 6,
        "hip_joint_pain": 5,
        "swelling_of_stomach": 8,
        "red_spots_over_body": 9,
        "continuous_sneezing": 5,
        "weakness_in_limbs": 9,
        "small_dents_in_nails": 5,
        "prominent_veins_on_calf": 9,
        "skin_rash": 9,
        "back_pain": 2,
        "dehydration": 8,
        "high_fever": 7,
        "ulcers_on_tongue": 4,
        "constipation": 4,
        "watering_from_eyes": 9,
        "stomach_bleeding": 9,
        "spotting_urination": 9,
        "sunken_eyes": 3,
        "bloody_stool": 9,
        "receiving_unsterile_injections": 9,
        "bruising": 4,
        "lack_of_concentration": 3,
        "joint_pain": 4,
        "shivering": 3,
        "silver_like_dusting": 5,
        "internal_itching": 5,
        "mild_fever": 2,
        "swollen_legs": 9,
        "swollen_blood_vessels": 8,
        "bladder_discomfort": 8,
        "foul_smell_of_urine": 9,
        "acute_liver_failure": 10,
        "extra_marital_contacts": 2,
        "toxic_look_(typhos)": 9,
        "increased_appetite": 8,
        "obesity": 5,
        "runny_nose": 2,
        "lethargy": 7,
        "brittle_nails": 5,
        "yellow_urine": 9,
        "muscle_wasting": 8,
        "nausea": 8,
        "unsteadiness": 6,
        "patches_in_throat": 8,
        "slurred_speech": 9,
        "polyuria": 9,
        "fluid_overload": 8,
        "chest_pain": 10,
        "visual_disturbances": 9,
        "blood_in_sputum": 9,
        "movement_stiffness": 4,
        "itching": 2,
        "irritation_in_anus": 7,
        "distention_of_abdomen": 3,
        "indigestion": 3,
        "receiving_blood_transfusion": 5,
        "passage_of_gases": 7,
        "palpitations": 8,
        "malaise": 7,
        "coma": 10,
        "scurring": 7,
        "muscle_pain": 3,
        "abnormal_menstruation": 9,
        "stiff_neck": 3,
        "loss_of_smell": 8,
        "burning_micturition": 9,
        "swelled_lymph_nodes": 9,
        "inflammatory_nails": 4,
        "weight_loss": 7,
        "family_history": 2,
        "nodal_skin_eruptions": 6,
        "blackheads": 5,
        "fatigue": 4,
        "history_of_alcohol_consumption": 3,
        "redness_of_eyes": 9,
        "sweating": 9,
        "swelling_joints": 5,
        "pus_filled_pimples": 3,
        "abdominal_pain": 7,
        "yellowish_skin": 8,
        "enlarged_thyroid": 9,
        "neck_pain": 3,
        "altered_sensorium": 8,
        "belly_pain": 7,
        "phlegm": 9,
        "dischromic_patches": 7,
        "pain_behind_the_eyes": 8,
        "skin_peeling": 7,
        "continuous_feel_of_urine": 9,
        "drying_and_tingling_lips": 7,
        "throat_irritation": 6,
        "acidity": 2,
        "chills": 3,
        "congestion": 8,
        "puffy_face_and_eyes": 9,
        "loss_of_balance": 6,
        "depression": 5,
        "yellow_crust_ooze": 7,
        "headache": 7
    };

    const ob = new Map(Object.entries(symptoms));

    for (let i = 0; i < input.length; i++) {
        sum += ob.get(input[i]) || 0;
    }

    console.log("Weighted Sum = ", sum);

    // Determine the priority based on sum
    let priority = sum >= 10 ? "High" : sum > 7 ? "Medium" : "Low";
    console.log("Priority:", priority);

    // MongoDB: Fetch doctor's details based on the department
    try {
        await client.connect();
        const db = client.db("doctordatabase");
        const collection = db.collection("doctorcollection");

        const doctorsCursor = collection.find({ Department: department });
        const doctors = await doctorsCursor.toArray();

        if (doctors.length > 0) {
            let currentDoctor = null;
            let availableDay = null;
            let earliestTime = null;

            const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            // Find the earliest available day and time for the doctor
                for (let doc of doctors) {
                    if (doc.Days_available) {
                        for (let [day, times] of Object.entries(doc.Days_available)) {
                            if (times) {
                                const sortedTimes = times.split(',').map(time => parseFloat(time)).sort((a, b) => a - b);
                                const dayIndex = weekOrder.indexOf(day);
                                const currentDayIndex = availableDay ? weekOrder.indexOf(availableDay) : Infinity;

                                // Compare day order first, then times
                                if (
                                    !earliestTime || 
                                    dayIndex < currentDayIndex || 
                                    (dayIndex === currentDayIndex && sortedTimes[0] < earliestTime)
                                ) {
                                    availableDay = day;
                                    earliestTime = sortedTimes[0];
                                    currentDoctor = doc;
                                }
                            }
                        }
                    }
                }

            if (currentDoctor && availableDay) {
                // Update the doctor’s availability by removing the earliest time
                const earliestTimeAllocated = convertToActualTime(earliestTime);
                let updatedTimes = currentDoctor.Days_available[availableDay]
                    .split(',')
                    .filter(time => parseFloat(time) !== earliestTime);

                // Update the database
                await collection.updateOne(
                    { _id: currentDoctor._id },
                    { $set: { [`Days_available.${availableDay}`]: updatedTimes.join(',') } }
                );

                console.log(`Allocated Department : ${department}`);
                console.log(`Doctor's Name: ${currentDoctor.Name}`);
                console.log(`Earliest Time: ${earliestTimeAllocated}`);
                console.log("Days Available:");
                Object.entries(currentDoctor.Days_available).forEach(([day, times]) => {
                    console.log(`${day}: "${times || "Not Available"}"`);
                });
                console.log(`Updated availability for ${currentDoctor.Name} on ${availableDay}: ${updatedTimes.join(',')}`);

                return {
                    doctorName: currentDoctor.Name,
                    designation: currentDoctor.Designation_yearsofexperience || "Unknown",
                    // day: availableDay,
                    visitTiming: earliestTimeAllocated,
                };
            }
        } else {
            console.log(`No doctors found for department: ${department}`);
        }
    } catch (error) {
        console.error("Error fetching or updating doctor's details:", error);
    } finally {
        await client.close();
    }
}

module.exports = { doc_allocation };
