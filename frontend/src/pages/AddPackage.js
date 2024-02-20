import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DropdownList from '../components/DropdownList';
import Styles from '../assets/css/AddPackage.module.css'
import { Typography } from "antd";
import validator from 'validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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

  /* For validation state - type of useState boolean and initial state true */
  const [ isValidName, setIsValidName ] = useState(true);
  const [ isValidPrice, setIsValidPrice] = useState(true);
  const [ isValidDescription, setIsValidDescription ] = useState(true);
  const [ isValidType, setIsValidType ] = useState(true);
  const [ isValidDate, setIsValidDate ] = useState(true);
  const [ isValidDuration, setIsValidDuration ] = useState(true);
  const [ isValidImage, setIsValidImage ] = useState(true);
  const [ isValidHotel, setIsValidHotel ] = useState(true);
  const [ isValidCountry, setIsValidCountry ] = useState(true);
  const [ isValidDestinationNames, setIsValidDestinationNames ] = useState(true);
  const [ isValidActivityNames, setIsValidActivityNames ] = useState(true);
  const [ isValidActivityDescriptions, setIsValidActivityDescriptions ] = useState(true);
  

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
    if (selectedType !== 'Type') { 
      setFormData({ ...formData, type: selectedType });
      setIsValidType(true);
    } 
    else {
      setIsValidType(false); 
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImg: e.target.files[0] });
  };

  /*const handleHotelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelId: [...prevFormData.hotelId, value],
      }));
    } 
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelId: prevFormData.hotelId.filter((id) => id !== value),
      }));
    }
  };
  */
  const handleHotelChange = (e) => {
    const { value, checked } = e.target;
    const isHotelSelected = formData.hotelId.includes(value);
    if (checked && formData.hotelId.length < 4 && !isHotelSelected) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelId: [...prevFormData.hotelId, value],
      }));
    } 
    else if (!checked && isHotelSelected) {
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
      if (newAccessToken) {
        user.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user})
        /*console.log('New access token saved:', newAccessToken);*/
      }

      const json = await response.json();
      /*console.log('Packages for this company: ', json); */
      
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
      if (newAccessToken) {
        user.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user})
        /*console.log('New access token saved:', newAccessToken);*/
      }

      const hotelData = await response.json();
      /*console.log('Hotels for this company: ', hotelData);*/
      
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

  /* Action on submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset validation states
    setIsValidName(true);
    setIsValidPrice(true);
    setIsValidDescription(true);
    setIsValidType(true);
    setIsValidDate(true);
    setIsValidDuration(true);
    setIsValidImage(true);
    setIsValidHotel(true);
    setIsValidCountry(true);
    setIsValidDestinationNames(true);
    setIsValidActivityNames(true);
    setIsValidActivityDescriptions(true);

    let isValidForm = true;

    if (!formData.hotelId.length) { 
      setIsValidHotel(false); 
      isValidForm = false;
    }

    if (!formData.name || validator.isEmpty(formData.name) || !validator.matches(formData.name, /^[a-zA-Z\s]+$/)) {
      setIsValidName(false);
      isValidForm = false;
    }

    if (!formData.country || validator.isEmpty(formData.country) || !validator.matches(formData.country, /^[a-zA-Z\s]+$/)) {
      setIsValidCountry(false);
      isValidForm = false;
    }

    formData.destinations.forEach((destination) => {
      if(!destination.destinationName || validator.isEmpty(destination.destinationName) || !validator.matches(destination.destinationName, /^[a-zA-Z\s]+$/)) {
        setIsValidDestinationNames(false);
        isValidForm = false;
      }
    })

    formData.destinations.forEach((destination) => {
      destination.activities.forEach((activity) => {
        if(!activity.activityName || validator.isEmpty(activity.activityName) || !validator.matches(activity.activityName, /^[a-zA-Z\s]+$/)) {
          setIsValidActivityNames(false);
          isValidForm = false;
        }
        if (!activity.activityDescription || validator.isEmpty(activity.activityDescription)) {
          setIsValidActivityDescriptions(false);
          isValidForm = false;
        }
      })
    })

    if (!formData.pricePerOne || validator.isEmpty(formData.pricePerOne) || !validator.isNumeric(formData.pricePerOne) || parseInt(formData.pricePerOne) > 2000) {
      setIsValidPrice(false);
      isValidForm = false;
    }

    if (!formData.coverImg) {
      setIsValidImage(false);
      isValidForm = false;
    }

    if (!formData.description || validator.isEmpty(formData.description)) {
      setIsValidDescription(false);
      isValidForm = false;
    }

    if (!formData.startDate || validator.isEmpty(formData.startDate)) {
      setIsValidDate(false);
      isValidForm = false;
    }

    if (!formData.duration || validator.isEmpty(formData.duration)) {
      setIsValidDuration(false);
      isValidForm = false;
    }

    /*console.log(formData.type);*/
    if (!formData.type || validator.isEmpty(formData.type)) {
      setIsValidType(false);
      isValidForm = false;
    }

    /*console.log(isValidForm);*/
    if (isValidForm) {
      const MySwal = withReactContent(Swal);

      const handleSuccess = (responseData) => {
        MySwal.fire({
          icon: 'success',
          title: responseData.message,
          time: 4000,
        });
      };

      const handleFailure = (responseData) => {
        MySwal.fire({
          icon: 'error',
          title: responseData.message,
          time: 4000,
        });
      };

      const handleClearForm = () => {
        setFormData({
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
          type: 'Type',
          startDate: '',
          duration: '',
        });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = ''; 
        }

      }

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
        //formDataForApi.append('coverImg', formData.coverImg);
        formDataForApi.append('description', formData.description);
        formDataForApi.append('type', formData.type);
        formDataForApi.append('startDate', formData.startDate);
        formDataForApi.append('duration', formData.duration);
  
        // Log formDataForApi for debugging
        // console.log('name:', formDataForApi.get('name'));
        // console.log('Destinations Array:', formData.destinations);

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
    
        const responseData = await response.json();
        if (response.ok) {
          handleSuccess(responseData);
          handleClearForm();
          console.log(responseData.message);
        } 
        else {
          console.error(responseData.message);
          handleFailure(responseData);

        }
      }  
      catch (error) {
        console.error('Error adding package:', error);
      }
    }
  };

  return (
    <div className={Styles.addPackage_contianer}>
      
      <div>
        <Typography.Title level={4}>Add Package</Typography.Title>
      </div>
      
      <div className={Styles.addPackage_container}>
        <form onSubmit={handleSubmit} className={Styles.addPackage_form}>
          
          <div className={Styles.form_sectionOne}>
            <div className={Styles.form_leftSide}>
              <h4 className={Styles.addPackage_Heading}>1. Package Informations</h4>
              <div className={Styles.packageInformation_container}>
                <div className={Styles.packageName}>
                  <input
                    type="text"
                    name="name"
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setIsValidName(true)}
                  />
                  <br />
                  {!isValidName && <span className={Styles.error}> Please enter a valid name. </span>}
                </div>
                <div className={Styles.packagePrice}>
                  <input
                    type="number"
                    name="pricePerOne"
                    placeholder='Price'
                    value={formData.pricePerOne}
                    onChange={handleChange}
                    onFocus={() => setIsValidPrice(true)}
                  />
                  <br />
                  {!isValidPrice && <span className={Styles.error}> Please enter a price less than 2000. </span>}
                </div>
                <div className={Styles.packageDescription}>
                  <textarea
                    name="description"
                    placeholder='Description'
                    value={formData.description}
                    onChange={handleChange}
                    onFocus={() => setIsValidDescription(true)}
                  ></textarea>
                  <br />
                  {!isValidDescription && <span className={Styles.error}>Please enter a valid Description.</span>}
                </div>
              </div>
            </div>
            <div className={Styles.form_rightSide}>
              <h4 className={Styles.addPackage_Heading}> 2. Travel Details</h4>
              <div className={Styles.traveLDetails_container}>
                <div className={Styles.packageType}>
                  <DropdownList
                    options={packageTypes}
                    value={formData.type}
                    onChange={handleTypeChange}
                    onFocus={() => setIsValidType(true)}
                  />
                  {!isValidType && <span className={Styles.error}>Please select a Type.</span>}
                </div>
                <div className={Styles.packageDate}>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    onFocus={() => setIsValidDate(true)}
                  />
                  <br />
                  {!isValidDate && <span className={Styles.error}>Please select a valid Date.</span>}
                </div>
                <div className={Styles.packageDuration}>
                  <input
                    type="text"
                    name="duration"
                    placeholder='Duration'
                    value={formData.duration}
                    onChange={handleChange}
                    onFocus={() => setIsValidDuration(true)}
                  />
                  <br />
                  {!isValidDuration && <span className={Styles.error}>Please enter a valid Duration.</span>}
                </div>
                <div className={Styles.packageImage}>
                  <input 
                    type="file" 
                    name="coverImg"
                    onChange={handleFileChange} 
                    onFocus={() => setIsValidImage(true)}
                  />
                  <br />
                  {!isValidImage && <span className={Styles.error}>Please upload an image.</span>}
                </div>
              </div>
            </div>
          </div>


          <div className={Styles.form_sectionTwo}>
            <div className={Styles.form_leftSide}>
              <h4 className={Styles.addPackage_Heading}> 3. Accommodations</h4>
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
                      onFocus={() => setIsValidHotel(true)}
                    />
                    <label htmlFor={hotel._id}>{hotel.name}</label>
                    </div>
                ))}
                {!isValidHotel && <span className={Styles.error}>Please select Hotels.</span>}
                <div style={{display:'none'}}>
                  <ul>
                    {formData.hotelId.map((hotelIdd) => (
                      <li key={hotelIdd}>{hotelIdd}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={Styles.form_rightSide}>
              <h4 className={Styles.addPackage_Heading}> 4. Location & Activities</h4>
              <div className={Styles.location_container}>
                <div className={Styles.packageCountry}>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    onFocus={() => setIsValidCountry(true)}
                  />
                  <br />
                  {!isValidCountry && <span className={Styles.error}>Please enter a valid country name.</span>}
                </div>
                {formData.destinations.map((destination, destIndex) => (
                  <div key={destIndex} className={Styles.addPackage_destinationInputs}>
                    <input
                      type="text"
                      name={`destinations-${destIndex}-destinationName`}
                      placeholder={`Destination ${destIndex + 1}`}
                      value={destination.destinationName}
                      onChange={handleChange}
                      onFocus={() => setIsValidDestinationNames(true)}
                    />
                    {!isValidDestinationNames && <span className={Styles.error}>This field is required.</span>}
                    {destination.activities && destination.activities.map((activity, actIndex) => (
                      <div key={actIndex} className={Styles.addPackage_activityInputs}>
                        <input
                          type="text"
                          name={`destinations-${destIndex}-activities-${actIndex}-activityName`}
                          placeholder={`Activity ${actIndex + 1}`}
                          value={activity.activityName}
                          onChange={(e) => handleChange(e, destIndex, actIndex, 'activityName')}
                          onFocus={() => setIsValidActivityNames(true)}
                        />
                        {!isValidActivityNames && <span className={Styles.error}>This field is required.</span>}
                        <input
                          type="text"
                          name={`destinations-${destIndex}-activities-${actIndex}-activityDescription`}
                          placeholder={`Activity Description ${actIndex + 1}`}
                          value={activity.activityDescription}
                          onChange={(e) => handleChange(e, destIndex, actIndex, 'activityDescription')}
                          onFocus={() => setIsValidActivityDescriptions(true)}
                      
                        />
                        {!isValidActivityDescriptions && <span className={Styles.error}>This field is required.</span>}
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`${Styles.Btn} ${Styles.addActivityBtn}`}
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
                  className={`${Styles.Btn} ${Styles.addDestinationBtn}`}
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
            </div>
          </div>


          <button
            className={`${Styles.Btn} ${Styles.addPackageBtn}`}
          >
            Add 
          </button>  
        </form>
      </div>

    </div>
  );
}
