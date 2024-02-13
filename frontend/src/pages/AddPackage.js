import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DropdownList from '../components/DropdownList';
import Styles from '../assets/css/AddPackage.module.css'

export default function AddPackage() {
  const [packageTypes, setPackageTypes] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const { user, dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    hotelId: [],
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

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({ ...formData, type: selectedType });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImg: e.target.files[0] });
  };

  const handleHotelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelId: [...prevFormData.hotelId, value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelId: prevFormData.hotelId.filter((id) => id !== value),
      }));
    }
  };
  
  const fetchPackageTypes = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/packageTypes`
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
        setPackageTypes(json);
      }
      else{
        console.log('No Available Package');
      }
    } catch (error) {
      console.error('An error occurred while fetching data', error);
    }
  };

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
    fetchPackageTypes();
    fetchHotels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataForApi = new FormData();
      formDataForApi.append('hotelId', formData.hotelId.join(','));
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
      if (response.ok) {
        console.log('Package added successfully!', data.message);
      } else {
        console.error('Failed to add package:', data.error);
      }
    }  catch (error) {
      console.error('Error adding package:', error);
    }
  };

  return (
    <div className={Styles.addPackage_contianer}>
      <h1 className={Styles.addPackage_pageTitle}> Manage Flight</h1>
        <form onSubmit={handleSubmit} >

          <h4 className={Styles.addPackage_Heading}><span className={Styles.number}> 1.</span> Package Informations</h4>
          <fieldset className={Styles.packageInformation_fieldSet}>
            <div className={Styles.packageInformation_container}>
              <div className={Styles.packageName}>
                {/*<label>Name</label>*/}
                <input
                  type="text"
                  name="name"
                  placeholder='Name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className={Styles.packagePrice}>
                {/*<label className={Styles.labelPR}>Price</label>*/}
                <input
                  type="number"
                  name="pricePerOne"
                  placeholder='Price'
                  value={formData.pricePerOne}
                  onChange={handleChange}
                />
              </div>
              <div className={Styles.packageImage}>
                {/*<label>Image</label>*/}
                <input 
                  type="file" 
                  name="coverImg"
                  onChange={handleFileChange} 
                />
              </div>
              <div className={Styles.packageDescription}>
                {/*<label>description</label>*/}
                <textarea
                  name="description"
                  placeholder='Description'
                  value={formData.description}
                  onChange={handleChange}
                >
                </textarea>
              </div>
            </div>
          </fieldset>

          <h4 className={Styles.addPackage_Heading}> 2. Travel Details</h4>
          <fieldset className={Styles.packageInformation_fieldSet}>
            <div className={Styles.traveLDetails_container}>
              <div className={Styles.packageType}>
                {/*<label>type</label>*/}
                <DropdownList
                  options={packageTypes}
                  value={formData.type}
                  onChange={handleTypeChange}
                />
              </div>
              <div className={Styles.packageDate}>
                {/*<label>startDate</label>*/}
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className={Styles.packageDuration}>
                {/*<label>duration</label>*/}
                <input
                  type="text"
                  name="duration"
                  placeholder='Duration'
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <h4 className={Styles.addPackage_Heading}> 3. Accommodations</h4>
          <fieldset className={Styles.packageInformation_fieldSet}>
            <div className={Styles.accommodation_container}>
                {hotelData.length > 0 && hotelData.map((hotel) => (
                  <div key={hotel._id} className={Styles.hotelDisplay}>
                    <input
                      type="checkbox"
                      id={hotel._id}
                      name={hotel._id}
                      value={hotel._id}
                      checked={Array.isArray(formData.hotelId) && formData.hotelId.includes(hotel._id)}
                      onChange={handleHotelChange}
                    />
                    <label htmlFor={hotel._id}>{hotel.name}</label>
                  </div>
                ))}
                {/* Display selected hotel IDs */}
                <div style={{display:'none'}}>
                  <ul>
                    {formData.hotelId.map((hotelIdd) => (
                      <li key={hotelIdd}>{hotelIdd}</li>
                    ))}
                  </ul>
                </div>
            </div>
          </fieldset>

          <h4 className={Styles.addPackage_Heading}> 4. Location & Activities</h4>
          <fieldset className={Styles.packageInformation_fieldSet}>
          <div className={Styles.location_container}>
            <div className={Styles.packageCountry}>
              <label>country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            {formData.destinations.map((destination, destIndex) => (
              <div key={destIndex} className={Styles.addPackage_destinationInputs}>
                <label>{`Destination ${destIndex + 1}`}</label>
                <input
                  type="text"
                  name={`destinations-${destIndex}-destinationName`}
                  value={destination.destinationName}
                  onChange={handleChange}
                />
                {destination.activities && destination.activities.map((activity, actIndex) => (
                  <div key={actIndex} className={Styles.addPackage_activityInputs}>
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
                  className={Styles.addPackageBtn}
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
              className={Styles.addPackageBtn}
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
          </div>
          </fieldset>
          
          <button
            className={Styles.addPackageBtn}
          >
            Add 
          </button>    
        </form>
      
    </div>
  );
}
