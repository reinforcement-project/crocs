/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SettingsReg = (props) => {
  // holds the new skills the user may want to teach 
  const [availableSkills, setAvailableSkills] = useState([]);
  // holds skills the user already teaches
  const [currentSkills, setCurrentSkills] = useState([]);
  // slice of state that holds info for all skills (available and current) on whether the checkboxes assigned to them in the settings page are checked (true) or not checked (false)
  const [userSkills, setUserSkills] = useState({});
  // states below represent different errors
  const [error, setError] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  const emailLS = localStorage.getItem('email');
  const [email, setNewEmail] = useState(emailLS);
  const [emailChange, setEmailChange] = useState(false);

  // email validation func, returns boolean;
  function validateEmail(str) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
  }

  // handle changes to availableSkills and currentSkills based on checkbox click
  const handleSkillsChange = (e) => {
    setAvailableSkills();
    setCurrentSkills();
  };

  // updates userSkills whenever availableSkills or currentSkills are changed
  useEffect(() => {
    const newSkillsObj = {};
    for (const x of availableSkills) {
      newSkillsObj[x.name] = false;
    }
    for (const y of currentSkills) {
      newSkillsObj[y.name] = true;
    }
    setUserSkills(newSkillsObj);
  },[availableSkills,currentSkills]);

  // calls func to fetch allSkills on mount;
  useEffect(() => {
    fetchData();
  }, []);

  // useEffects below set timeout to udate states of errors if errors are true in 1.5 sec;

  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  }, [error]);

  useEffect(() => {
    if (emailChange === true) {
      setTimeout(() => {
        setEmailChange(false);
      }, 1500);
    }
  }, [emailChange]);

  useEffect(() => {
    if (errorExist === true) {
      setTimeout(() => {
        setErrorExist(false);
      }, 1500);
    }
  }, [errorExist]);

  useEffect(() => {
    if (errorEmail === true) {
      setTimeout(() => {
        setErrorEmail(false);
      }, 1500);
    }
  }, [errorEmail]);

  useEffect(() => {
    if (wrongEmail === true) {
      setTimeout(() => {
        setWrongEmail(false);
      }, 1500);
    }
  }, [wrongEmail]);

  // fetches data on mount;
  // GET request;
  // sorting skills to 2 states - availableSkills and currentSkills by finding if user id is present in skills teachers array of objects;

  const fetchData = async () => {
    try {
      const res = await fetch('/api/allSkills/all');
      const response = await res.json();
      response.sort((a, b) => (a.name > b.name ? 1 : -1));
      const userAvailableSkills = [];
      const userCurrentSkills = [];
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < response[i].teachers.length; j++) {
          if (response[i].teachers[j].email === email) {
            userCurrentSkills.push(response[i]);
            break;
          }
        }
        if (userCurrentSkills.length === 0) {
          userAvailableSkills.push(response[i]);
        } else if (
          userCurrentSkills[userCurrentSkills.length - 1].name !== response[i].name
        ) {
          userAvailableSkills.push(response[i]);
        }
      }
      // update state: availableSkills and currentSkills
      setAvailableSkills(userAvailableSkills);
      setCurrentSkills(userCurrentSkills);
    } catch (err) {
      console.log(err);
    }
  };

  const emailTyped = (e) => {
    if (e.target.value === '') {
      setNewEmail(emailLS);
    } else {
      setNewEmail(e.target.value);
    }
  };

  const updateEmail = async () => {
    try {
      if (!validateEmail(email) || email === emailLS) {
        setWrongEmail(true);
        return;
      }
      const res = await fetch('api/updateemail', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail: email, currentEmail: emailLS }),
      });
      const data = await res.json();
      console.log('data:', data);
      if (data === true) {
        console.log('update local and state email');
        localStorage.removeItem('email');
        localStorage.setItem('email', email);
        setEmailChange(true);
        setNewEmail(email);
        document.getElementsByClassName('change-email-form')[0].reset();
      } else {
        setErrorEmail(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //triggered in SkillAdmin Component;
  //sends POST request to add the skill;
  //response - new list of all skills;
  //sorting skills to 2 states - newSkills and userSkills by finding if user id is present in skills teachers array of objects
  const addNewSkill = async (arg) => {
    try {
      const res = await fetch('api/adduserskill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skillName: arg, email: email }),
      });
      const response = await res.json();
      response.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log('response is -->', response);
      const userAvailableSkills = [];
      const userCurrentSkills = [];
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < response[i].teachers.length; j++) {
          if (response[i].teachers[j].email === email) {
            userCurrentSkills.push(response[i]);
            break;
          }
        }
        if (userCurrentSkills.length === 0) {
          userAvailableSkills.push(response[i]);
        } else if (
          userCurrentSkills[userCurrentSkills.length - 1].name !== response[i].name
        ) {
          userAvailableSkills.push(response[i]);
        }
      }
      setAvailableSkills(userAvailableSkills);
      setCurrentSkills(userCurrentSkills);
    } catch (err) {
      console.log(err);
    }
  };

  //triggered in SkillAdmin Component;
  //sends delete request to delete the skill;
  //response - new list of all skills;
  //sorting skills to 2 states - newSkills and userSkills by finding if user id is present in skills teachers array of objects
  const deleteUserSkill = async (arg) => {
    try {
      const res = await fetch('api/deleteuserskill', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skillName: arg, email: email }),
      });
      const response = await res.json();
      response.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log('response is -->', response);
      const userAvailableSkills = [];
      const userCurrentSkills = [];
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < response[i].teachers.length; j++) {
          if (response[i].teachers[j].email === email) {
            userCurrentSkills.push(response[i]);
            break;
          }
        }
        if (userCurrentSkills.length === 0) {
          userAvailableSkills.push(response[i]);
        } else if (
          userCurrentSkills[userCurrentSkills.length - 1].name !== response[i].name
        ) {
          userAvailableSkills.push(response[i]);
        }
      }
      setAvailableSkills(userAvailableSkills);
      setCurrentSkills(userCurrentSkills);
    } catch (err) {
      console.log(err);
    }
  };

  // create error variable for MUI FormControl that evaluates true if user doesn't select at least one skill 
  const userSkillsBooleanArr = [];
  for (const skill in userSkills) {
    userSkillsBooleanArr.push(userSkills[skill]);
  }
  console.log('userSkillsBooleanArr is -->', userSkillsBooleanArr);
  const err = userSkillsBooleanArr.filter((skillBoolean) => skillBoolean).length < 1;

  return (
    <div className="admin-settings-internal">
      <div> 
        <h1> Settings </h1>
        <p> The adjustments made here will take effect as soon as they are set. </p> 
      </div>
      <hr></hr>
      <div id='settings-update-email'>
        <h2>Email</h2>
        {emailChange && (
          <div>Email successfully updated</div>
        )}
        {errorEmail && (
          <div>
            Technical error occured. Please contact Support
          </div>
        )}
        {wrongEmail && (
          <div>Please enter correct email</div>
        )}
        <div>
          <p>Update your email here.</p>
          <input
            type="text"
            placeholder={`${email}`}
            onChange={emailTyped}
          />
          <button type="button" onClick={updateEmail}>
            Update
          </button>
        </div>
      </div>
      <hr></hr>
      <h2>Skills</h2>
      <div id='settings-update-skills'>
        <div>
          <FormControl
            required
            error={err}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Pick at least one skill.</FormLabel>
            <FormGroup>
              {availableSkills.map((skill) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox key={skill._id} checked={userSkills[skill.name]} onChange={handleSkillsChange} name={skill.name}  />
                    }
                    label={skill.name}
                  />
                );
              })}
              {currentSkills.map((skill) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox key={skill._id} checked={userSkills[skill.name]} onChange={handleSkillsChange} name={skill.name}  />
                    }
                    label={skill.name}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </div>
      </div>
      {/* <div className="user-settings-newskills">
        <div className="form-title">ADD SKILLS TO TEACH</div>
        {availableSkills.length === 0 && (
          <div className="noskills">No new skills at this time</div>
        )}
        <div className="listofskills">
          {availableSkills.map((skill) => {
            return (
              <SkillAdmin
                key={skill._id}
                handleClick={addNewSkill}
                functionality="+"
                name={skill.name}
              />
            );
          })}
        </div>
      </div>
      <div className="user-settings-newskills">
        <div className="form-title">SKILLS YOU TEACH</div>
        {currentSkills.length === 0 && (
          <div className="noskills">No data to display at this time</div>
        )}
        <div className="listofskills">
          {currentSkills.map((skill) => {
            return (
              <SkillAdmin
                key={skill._id}
                functionality="-"
                handleClick={deleteUserSkill}
                name={skill.name}
              />
            );
          })}
        </div> */}
    </div>
  );
};

export default SettingsReg;
