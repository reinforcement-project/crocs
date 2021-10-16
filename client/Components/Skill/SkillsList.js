import React, { useState } from "react";
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
  const [classname, setClassName] = useState("skillslist-button");
  const [selectedSkill, setSelectedSkill] = useState("");

  return (
    <SkillsContainer>
      <SkillsInnerContainer>
        {allSkills.map((skill) => (
          <SkillButton
            type="button"
            key={skill}
            id={skill}
            setSelectedUser={props.setSelectedUser}
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            setGraphData={props.setGraphData}
          >
            {skill}
          </SkillButton>
        ))}
      </SkillsInnerContainer>
    </SkillsContainer>
  );
};

export default SkillsList;
