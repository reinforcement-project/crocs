import React, { useState } from "react"
import { useEffect } from "react"
import { ForceGraph } from "./ForceGraph/ForceGraph"
import { CircularProgress } from "@material-ui/core"
import { Link } from "react-router-dom"
import SendMessage from "./SendMessage"
import SkillsList from "./SkillsList"

const MainPage = (props) => {
  console.log("main.jsx rendered")
  const [selectedUser, setSelectedUser] = useState({})
  const [graphData, setGraphData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeStyle, setActiveStyle] = useState("text-active")
  const isRead = localStorage.getItem("isRead")

  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`
  }, [])

  function getNodeInfo(nodeInfo) {
    return setSelectedUser(nodeInfo)
  }

  const dataFetch = async () => {
    try {
      const resp = await fetch("/api/nodes/all")
      const data = await resp.json()
      console.log("Fetch ", data)
      setGraphData(data)

      //uncomment after request works
      //props.setRequests(data.messages);
      // data.messages.forEach(message => {if(message.isRead === false){props.setIsRead(false);}});
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (activeStyle === "text-inactive") setActiveStyle("text-active")
    }, 2000)
  }, [activeStyle])

  useEffect(() => {
    // console.log("called")
    dataFetch()
  }, [])

  const cancelMessage = () => {
    setSelectedUser({})
  }

  console.log("Graph data", graphData)
  return (
    <div className="mainpage">
      <div className="navbar">
        <div className="main-navbuttoncontainer1">Logo</div>
        <div className="navbuttoncontainer2">
          <Link to="/requests">
            <button
              className={
                isRead === null ? "requestsbutton" : "requestsbutton-a"
              }
            >
              R
            </button>
          </Link>
        </div>
        <div className="navbuttoncontainer2">
          <Link to="/settings">
            <button className="authbutton">Settings</button>
          </Link>
        </div>
        <div className="navbuttoncontainer3">
          <button
            className="authbutton"
            onClick={(e) => {
              localStorage.clear()
              props.setAuth(false)
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <section>
          {graphData.nodes !== undefined && (
            <>
              <SkillsList
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
                graphData={graphData}
                setGraphData={setGraphData}
                activeStyle={activeStyle}
                setActiveStyle={setActiveStyle}
              />
              <ForceGraph
                skillsData={graphData.skills}
                linksData={graphData.links}
                nodesData={graphData.nodes}
                nodeHoverTooltip={nodeHoverTooltip}
                getNodeInfo={getNodeInfo}
                setActiveStyle={setActiveStyle}
                activeStyle={activeStyle}
              />
            </>
          )}
        </section>
      )}
      {/* <section className="Main">
        {graphData.nodes !== undefined && (
        )}
      </section> */}
      {/* {graphData.nodes !== undefined && (
        <ForceGraph
          getNodeInfo={getNodeInfo}
          setActiveStyle={setActiveStyle}
          activeStyle={activeStyle}
          graphData={graphData}
        />
      )} */}
      {selectedUser.id && graphData.skills.length === 1 && (
        <SendMessage
          selectedUser={selectedUser}
          graphData={graphData}
          cancelMessage={cancelMessage}
        />
      )}
    </div>
  )
}

export default MainPage
