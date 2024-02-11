import React, { useState, useEffect } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { FaSearch } from "react-icons/fa";
import Styles from '../assets/css/packagePage.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import UpdatePackage from '../components/UpdatePackage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function PackagePage() {
  const [packages, setPackages]                   = useState([]);
  const [filteredPackages, setFilteredPackages]   = useState([]); 
  const { user, dispatch }                        = useAuthContext();
  const [modalOpen, setModalOpen]                 = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [searchQuery, setSearchQuery]             = useState({
    price: '',
    discount: '',
    date: ''
  });

  const filterPackages = () => {
    const filtered = packages.filter(packageItem => {
      const packageStartDate  = new Date(packageItem.startDate);
      const packageStartDay   = packageStartDate.getDate();
      const packageStartMonth = packageStartDate.getMonth() + 1; 
      const packageStartYear  = packageStartDate.getFullYear();
  
      if (searchQuery.price && parseFloat(packageItem.pricePerOne) !== parseFloat(searchQuery.price)) {
        return false;
      }
      if (searchQuery.discount && parseFloat(packageItem.discount) !== parseFloat(searchQuery.discount)) {
        return false;
      }
      if (searchQuery.date) {
        const [searchYear, searchMonth, searchDay] = searchQuery.date.split('-').map(Number);
        if (packageStartYear !== searchYear || packageStartMonth !== searchMonth || packageStartDay !== searchDay) {
          return false;
        }
      }
      return true;
    });
  
    setFilteredPackages(filtered);
  };
  
  useEffect(() => {
    filterPackages();
  }, [searchQuery]);

  /* Function to handle changes in search input fields */
   const handleInputChange = (field, value) => {
    setSearchQuery(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  /* Fetch the package of this compny */
  const fetchPackagesForCompany = async () => {
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
      if (newAccessToken) {
        user.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user})
      }

      const json = await response.json();
      if (response.ok) {
        setPackages(json);
      }
      else{
        console.log('No Available Package');
      }
    } catch (error) {
      console.error('An error occurred while fetching data', error);
    }
  };
  
  useEffect(() => {
    fetchPackagesForCompany();
  }, [user, dispatch]);

  const MySwal = withReactContent(Swal);

  const handleSuccess = (responseData) => {
    MySwal.fire({
      icon: 'success',
      title: responseData.message,
      time: 4000,
    });
  };

  const handleFailure = (errorData) => {
    MySwal.fire({
      icon: 'error',
      title: errorData.message,
      time: 4000,
    });
  };

  /* Delete a package */
  const handleDeletePackage = async (packageId) => {
    const willDelete = await MySwal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/package/${packageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          credentials: 'include'
        });
        
        /* Check if the user is authorized */
        const newAccessToken = response.headers.get('New-Access-Token');
        if (newAccessToken) {
          user.accessToken = newAccessToken;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({type: 'LOGIN', payload: user})
          //console.log('New access token saved:', newAccessToken);
        }

        /* Read the response status and handle the result */
        if (response.status === 201) {
          const responseData = await response.json();
          handleSuccess(responseData);
          // Remove the deleted package from the state
          setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== packageId));
          fetchPackagesForCompany();
          console.log(responseData.message);
        } else {
          const errorData = await response.json();
          handleFailure(errorData);
          console.error(errorData.message);
        }
      } catch (error) {
        console.error('An error occurred while deleting the package', error);
      }
    }
  };

  /* Open the modal with package details for editing */
  const handleEditPackage = async (packageId) => {
    setSelectedPackageId(packageId);
    setModalOpen(true);
  };

  return (
    <div className={Styles.content}>
      <h4>Filter By: </h4>
      <div className={Styles.packageHeader}>
        <div className={`${Styles.input_control}`}>
          <input 
            type="text" 
            id="price" 
            placeholder='Price'
            value={searchQuery.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
          <FaSearch  className={Styles.searchIcon}/>
        </div>

        <div className={`${Styles.input_control}`}>
          <input 
            type="text" 
            id="discount"
            placeholder='Discount'
            value={searchQuery.discount}
            onChange={(e) => handleInputChange('discount', e.target.value)}
          />
          <FaSearch  className={Styles.searchIcon}/>
        </div>

        <input 
          type="date"
          id="date"
          value={searchQuery.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </div>

      <h4>List of Packages</h4>

      <div className={Styles.Table_wrapper}>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Country</th>
              <th>Type</th>
              <th>Price</th>
              <th>discount</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery.price || searchQuery.discount || searchQuery.date ? (
              filteredPackages.map((packageItem) => (
                <tr key={packageItem.id}>
                  <td>{packageItem.name}</td>
                  <td><img src={`http://localhost:4000/uploads/${packageItem.coverImg}`} className={Styles.packageImg} alt='package_logo' crossOrigin="anonymous" /></td>
                  <td>{packageItem.country}</td>
                  <td>{packageItem.type}</td>
                  <td>{packageItem.pricePerOne}</td>
                  { packageItem.discount  ? <td>{packageItem.discount}</td>: <td> NULL</td> }
                  <td>{new Date(packageItem.startDate).toLocaleDateString("en-US")}</td>
                  <td>{packageItem.duration}</td>
                  <td>
                    <span className={Styles.actions}>
                      <BsFillTrashFill
                        className={Styles.delete_btn}
                        onClick={() => handleDeletePackage(packageItem._id)}
                      />
                      <BsFillPencilFill 
                        onClick={() => handleEditPackage(packageItem._id)} 
                      />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              packages.map((packageItem) => (
                <tr key={packageItem.id}>
                  <td>{packageItem.name}</td>
                  <td><img src={`http://localhost:4000/uploads/${packageItem.coverImg}`} className={Styles.packageImg} alt='package_logo' crossOrigin="anonymous" /></td>
                  <td>{packageItem.country}</td>
                  <td>{packageItem.type}</td>
                  <td>{packageItem.pricePerOne}</td>
                  { packageItem.discount  ? <td>{packageItem.discount}</td>: <td> NULL</td> }
                  <td>{new Date(packageItem.startDate).toLocaleDateString("en-US")}</td>
                  <td>{packageItem.duration}</td>
                  <td>
                    <span className={Styles.actions}>
                      <BsFillTrashFill
                        className={Styles.delete_btn}
                        onClick={() => handleDeletePackage(packageItem._id)}
                      />
                      <BsFillPencilFill 
                        className={Styles.edit_btn}
                        onClick={() => handleEditPackage(packageItem._id)} 
                      />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {modalOpen &&  (
          <UpdatePackage
            closeModal={() => {
              setModalOpen(false);
              fetchPackagesForCompany();
            }}
            packageId = { selectedPackageId }
          />
        )}
      </div>
    </div>
  );
}

