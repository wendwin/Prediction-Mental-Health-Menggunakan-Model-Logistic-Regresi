import mysql.connector
from mysql.connector import Error
import numpy as np

# Fungsi untuk menyimpan hasil ke database
def save_to_database(data, prediction):
    connection = None  # Inisialisasi variabel connection
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='berkah_abadidb',
            user='root',
            password='pongkowulu114117'
        )
        if connection.is_connected():
            cursor = connection.cursor()

            # Konversi elemen data ke tipe Python standar
            data = [int(x) if isinstance(x, np.integer) else float(x) if isinstance(x, np.floating) else x for x in data]
            prediction = int(prediction) if isinstance(prediction, np.integer) else prediction
            
            # Query untuk menyimpan hasil prediksi
            query = """INSERT INTO screening_results (anxiety_level, self_esteem, mental_health_history,
                     depression, headache, blood_pressure, sleep_quality, breathing_problem, noise_level,
                     living_conditions, safety, basic_needs, academic_performance, study_load,
                     teacher_student_relationship, future_career_concerns, social_support, peer_pressure,
                     extracurricular_activities, bullying, stress_zone)
                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            cursor.execute(query, data + [prediction])
            connection.commit()
    except Error as e:
        print("Error:", e)
    finally:
        # Hanya menutup koneksi jika berhasil terhubung
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
