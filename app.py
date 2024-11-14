from flask import Flask, render_template, request
import pickle
import numpy as np
from database import save_to_database  # Import fungsi save_to_database

app = Flask(__name__)

# Load model dari folder `models`
with open('models/model_stres_level.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Ambil input data dari form
        data = [
            request.form.get('anxiety_level'),
            request.form.get('self_esteem'),
            1 if request.form.get('mental_health_history').lower() == 'ya' else 0,  # Mengonversi YA/TIDAK menjadi 1/0
            request.form.get('depression'),
            request.form.get('headache'),
            request.form.get('blood_pressure'),
            request.form.get('sleep_quality'),
            request.form.get('breathing_problem'),
            request.form.get('noise_level'),
            request.form.get('living_conditions'),
            request.form.get('safety'),
            request.form.get('basic_needs'),
            request.form.get('academic_performance'),
            request.form.get('study_load'),
            request.form.get('teacher_student_relationship'),
            request.form.get('future_career_concerns'),
            request.form.get('social_support'),
            request.form.get('peer_pressure'),
            request.form.get('extracurricular_activities'),
            request.form.get('bullying')
        ]

        # Konversi data menjadi array numpy dan ubah ke tipe data float
        data = np.array(data, dtype=float).reshape(1, -1)

        # Prediksi menggunakan model
        prediction = model.predict(data)

        # Simpan hasil prediksi ke database
        save_to_database(data.flatten().tolist(), prediction[0])

        # Tampilkan hasil di template `result.html` tanpa probabilitas
        return render_template('result.html', prediction=prediction[0])

    return render_template('index.html')

@app.route('/screening')
def screening():
    return render_template('screening.html')

if __name__ == '__main__':
    app.run(debug=True)
