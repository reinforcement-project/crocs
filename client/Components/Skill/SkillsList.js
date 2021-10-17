import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SkillButton from "./SkillButtonMain";

/*
component is rendered on MainPage;
onClick on button which is skill will fetch GraphData and pass it to parent component to rerender ForceGraph;
 */
const SkillsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 0 20px 0;
`;
const SkillsInnerContainer = styled.div`
  max-width: 800px;
  max-height: 80px;
  margin-top: 20px;
`;

const SkillsList = (props) => {
  const [allSkills, setAllSkills] = useState(props.skills);
  const [skillSelection, setSkillSelection] = useState({});

  useEffect(() => {
    const hydrateSkills = {};
    for (let skill of allSkills) {
      hydrateSkills[skill] = false;
    }
    setSkillSelection(hydrateSkills);
  }, []);

  const handleClick = async (e) => {
    const selectedSkill = e.target.innerHTML;
    try {
      // If the selected skill doesn't have the value true, we need to set all other skills to false, but set it to true.
      if (!skillSelection[selectedSkill]) {
        setSkillSelection((prevState) => {
          for (let skill in prevState) {
            if (skill === selectedSkill) {
              prevState[skill] = true;
            } else {
              prevState[skill] = false;
            }
          }
          return prevState;
        });
        // Filter the graph
        const resp = await fetch("/api/nodes/" + selectedSkill);
        const data = await resp.json();
        props.setGraphData(data);
      }
      // If the selected skill does have the value true, we need to set all of the skills to false.
      else if (skillSelection[selectedSkill]) {
        setSkillSelection((prevState) => {
          for (let skill in prevState) {
            prevState[skill] = false;
          }
          return prevState;
        });
        // Unfilter the graph
        const resp = await fetch("/api/nodes/all");
        const data = await resp.json();
        props.setGraphData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SkillsContainer>
      <SkillsInnerContainer>
        {allSkills.map((skill) => (
          <SkillButton
            type="button"
            key={skill}
            id={skill}
            setSelectedUser={props.setSelectedUser}
            setGraphData={props.setGraphData}
            handleClick={handleClick}
            selected={skillSelection[skill]}
          >
            {skill}
          </SkillButton>
        ))}
      </SkillsInnerContainer>
    </SkillsContainer>
  );
};

export default SkillsList;
