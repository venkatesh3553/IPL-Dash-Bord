import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const fetchedData = await response.json()
    const formattedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))

    this.setState({
      teamsData: formattedData,
      isLoading: false,
    })
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(teamDetails => (
          <TeamCard teamDetails={teamDetails} key={teamDetails.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home

// import {Component} from 'react'
// import TeamCard from '../TeamCard'

// class Home extends Component {
//   state = {teamData: [], lodingIs: true}

//   componentDidMount() {
//     this.getData()
//   }

//   getData = async () => {
//     const response = await fetch('https://apis.ccbp.in/ipl')
//     const data = await response.json()
//     const updateData = data.teams.map(eachItem => ({
//       id: eachItem.id,
//       teamName: eachItem.name,
//       teamImgUrl: eachItem.team_image_url,
//     }))
//     this.setState({teamData: updateData})
//     // console.log(data)
//   }

//   render() {
//     const {teamData} = this.state
//     return (
//       <div>
//         <p>Home</p>
//         {teamData.map(eachItem => (
//           <TeamCard teamData={eachItem} key={eachItem.id} />
//         ))}
//       </div>
//     )
//   }
// }

// export default Home

// // git remote add origin git@github.com:venkatesh3553/IPL-Dashboard-App.git
