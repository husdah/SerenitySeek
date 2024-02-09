import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export default function AddPackage() {
  const [hotelData, setHotelData] = useState([]);
  const { user, dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    hotelId: '',
    name: '',
    country: '',
    destinations: [
      {
        destinationName: '',
        activities: [{ activityName: '', activityDescription: '' }],
      },
    ],
    pricePerOne: '',
    coverImg: null,
    description: '',
    type: '',
    startDate: '',
    duration: '',
  });


  /*const fetchPackagesForCompany = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/packageForCompany`
        ,{
          method: "GET",
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
          credentials: 'include'
      });

      const newAccessToken = response.headers.get('New-Access-Token');
      // Check if a new access token is present
      if (newAccessToken) {
        // Update the access token in LocalStorage
        user.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user})
        console.log('New access token saved:', newAccessToken);
      }

      const json = await response.json();
      console.log('Packages for this company: ', json); 
      
      if (response.ok) {
        setPackageData(json);
      }
      else{
        console.log('No Available Package');
      }
    } catch (error) {
      console.error('An error occurred while fetching data', error);
    }
  };*/

  const fetchHotels = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/hotel`
        ,{
          method: "GET",
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
          credentials: 'include'
      });

      const newAccessToken = response.headers.get('New-Access-Token');
      // Check if a new access token is present
      if (newAccessToken) {
        // Update the access token in LocalStorage
        user.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user})
        console.log('New access token saved:', newAccessToken);
      }

      const hotelData = await response.json();
      console.log('Hotels for this company: ', hotelData); 
      
      if (response.ok) {
        setHotelData(hotelData);
      }
      else{
        console.log('No Available Package');
      }
    } catch (error) {
      console.error('An error occurred while fetching data', error);
    }
  };


  useEffect(() => {
    //fetchPackagesForCompany();
    fetchHotels();
  });



  
  const handleChange = (e, destIndex, actIndex, nestedName) => {
    const { name, value } = e.target;
    
    if (name.startsWith('destinations')) {
      const [prefix, currentDestIndex, currentNestedName] = name.split('-');
      setFormData((prevFormData) => {
        const updatedDestinations = [...prevFormData.destinations];
        const destination = updatedDestinations[destIndex];
        if (currentNestedName === 'destinationName') {
          updatedDestinations[currentDestIndex] = {
            ...updatedDestinations[currentDestIndex],
            destinationName: value,
          };
        } else if (nestedName === 'destinationName') {
          destination.destinationName = value;
        } else if (nestedName === 'activityName' || nestedName === 'activityDescription') {
          const updatedActivities = destination.activities || [];
          const activity = updatedActivities[actIndex] || {};
  
          activity[nestedName] = value;
  
          if (!updatedActivities[actIndex]) {
            // If activity is undefined, create a new one
            updatedActivities[actIndex] = activity;
          }
  
          destination.activities = updatedActivities;
        }
  
        return { ...prevFormData, destinations: updatedDestinations };
      });
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImg: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataForApi = new FormData();
      formDataForApi.append('hotelId', formData.hotelId);
      formDataForApi.append('name', formData.name);
      formDataForApi.append('country', formData.country);
  
      formData.destinations.forEach((dest, destIndex) => {
        formDataForApi.append(`destinations[${destIndex}][destinationName]`, dest.destinationName);
  
        dest.activities.forEach((act, actIndex) => {
          formDataForApi.append(`destinations[${destIndex}][activities][${actIndex}][activityName]`, act.activityName);
          formDataForApi.append(`destinations[${destIndex}][activities][${actIndex}][activityDescription]`, act.activityDescription);
        });
      });
      
      formDataForApi.append('pricePerOne', formData.pricePerOne);
      if (formData.coverImg) {
        formDataForApi.append('coverImg', formData.coverImg);
      }
      formDataForApi.append('description', formData.description);
      formDataForApi.append('type', formData.type);
      formDataForApi.append('startDate', formData.startDate);
      formDataForApi.append('duration', formData.duration);
  
      
  
      // Log formDataForApi for debugging
      console.log('name:', formDataForApi.get('name'));
      // Log destinations array before API call
      console.log('Destinations Array:', formData.destinations);


      const response = await fetch('http://localhost:4000/api/package', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: formDataForApi,
        credentials: 'include',
      });
  
      const newAccessToken = response.headers.get('New-Access-Token');
      if (newAccessToken) {
        user.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: user });
      }
  
      const data = await response.json();

      console.log('API Response:', response);

      if (response.ok) {
        console.log('Package added successfully!', data.message);
      } else {
        console.error('Failed to add package:', data.error);
      }
    }  catch (error) {
      console.error('Error adding package:', error);
  
      // Log the response body in case of an error
      const responseBody = await error.response.text();
      console.log('Error response body:', responseBody);
    }
  };

  return (
    <div>
      <h2>Add Package</h2>
      <form onSubmit={handleSubmit} >
        <label>Hotel:</label>
        <input type="text" name="hotelId" value={formData.hotelId} onChange={handleChange} />
        <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label>country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            {formData.destinations.map((destination, destIndex) => (
              <div key={destIndex}>
                <label>{`Destination ${destIndex + 1}:`}</label>
                <input
                  type="text"
                  name={`destinations-${destIndex}-destinationName`}
                  value={destination.destinationName}
                  onChange={handleChange}
                />
               {destination.activities && destination.activities.map((activity, actIndex) => (
                <div key={actIndex}>
                  <label>{`Activity ${actIndex + 1}:`}</label>
                  <input
                    type="text"
                    name={`destinations-${destIndex}-activities-${actIndex}-activityName`}
                    value={activity.activityName}
                    onChange={(e) => handleChange(e, destIndex, actIndex, 'activityName')}
                  />
                  <label>{`Activity Description ${actIndex + 1}:`}</label>
                  <input
                    type="text"
                    name={`destinations-${destIndex}-activities-${actIndex}-activityDescription`}
                    value={activity.activityDescription}
                    onChange={(e) => handleChange(e, destIndex, actIndex, 'activityDescription')}
                  />
                </div>
              ))}

                <button
                  type="button"
                  onClick={() => {
                    const updatedDestinations = [...formData.destinations];
                    updatedDestinations[destIndex].activities.push({
                      activityName: '',
                      activityDescription: '',
                    });
                    setFormData({ ...formData, destinations: updatedDestinations });
                  }}
                >
                  Add Activity
                </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    destinations: [
                      ...formData.destinations,
                      {
                        destinationName: '',
                        activities: [{ activityName: '', activityDescription: '' }],
                      },
                    ],
                  });
                }}
              >
              Add Destination
            </button>
            <label>pricePerOne:</label>
            <input
              type="text"
              name="pricePerOne"
              value={formData.pricePerOne}
              onChange={handleChange}
            />
            <label>coverImg:</label>
            <input 
              type="file" 
              name="coverImg" 
              onChange={handleFileChange} 
            />
            <label>description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <label>type:</label>
            {/*<input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              />*/}
            <label>startDate:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <label>duration:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
        <button>Add Package</button>
      </form>
    </div>
  );
}
