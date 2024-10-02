import React, { useState } from 'react';
import axios from 'axios';
import '../components/Predict.css';

const Predictor = () => {
    const [age, setAge] = useState('');
    const [flightDistance, setFlightDistance] = useState('');
    const [genderMale, setGenderMale] = useState(0);
    const [cleanliness, setCleanliness] = useState('');
    const [legRoomService, setLegRoomService] = useState('');
    const [departureDelay, setDepartureDelay] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/predict', {
                features: [age, flightDistance, genderMale, cleanliness, legRoomService, departureDelay],
            });
            setPrediction(response.data.prediction);
        } catch (err) {
            setError('Error fetching prediction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="title">Customer Satisfaction Predictor</h1>
            <form onSubmit={handleSubmit} className="predictor-form">
                <div className="form-group">
                    <label>
                        Age:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Flight Distance (1-10000 km):
                        <input
                            type="number"
                            value={flightDistance}
                            onChange={(e) => setFlightDistance(e.target.value)}
                            required
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Gender:
                        <select
                            value={genderMale}
                            onChange={(e) => setGenderMale(Number(e.target.value))}
                            className="input-field"
                        >
                            <option value={0}>Female</option>
                            <option value={1}>Male</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Cleanliness (1-10):
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={cleanliness}
                            onChange={(e) => setCleanliness(e.target.value)}
                            required
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Leg Room Service (1-10):
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={legRoomService}
                            onChange={(e) => setLegRoomService(e.target.value)}
                            required
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Departure Delay (in Minutes):
                        <input
                            type="number"
                            value={departureDelay}
                            onChange={(e) => setDepartureDelay(e.target.value)}
                            required
                            className="input-field"
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Loading...' : 'Predict'}
                </button>
            </form>
            <div className="prediction-container">
                {prediction !== null && <h2 className="prediction">Prediction: {prediction}</h2>}
                {error && <h2 className="error">{error}</h2>}
            </div>
        </>
    );
};

export default Predictor;
