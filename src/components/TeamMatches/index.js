// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches

// import {Component} from 'react'
// import LatestMatch from '../LatestMatch'

// class TeamMatches extends Component {
//   state = {teamMatchData: {}}

//   componentDidMount() {
//     this.getData()
//   }
//   getFormattedData = data => ({
//     umpires: data.umpires,
//     result: data.result,
//     manOfTheMatch: data.man_of_the_match,
//     id: data.id,
//     date: data.date,
//     venue: data.venue,
//     competingTeam: data.competing_team,
//     competingTeamLogo: data.competing_team_logo,
//     firstInnings: data.first_innings,
//     secondInnings: data.second_innings,
//     matchStatus: data.match_status,
//   })
//   getData = async () => {
//     const {match} = this.props
//     const {params} = match
//     const {id} = params
//     const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
//     const data = await response.json()

//     const updateData = {
//       teamBannerUrl: data.team_banner_url,
//       lastMatches: this.getFormattedData(data.latest_match_details),
//     }
//     this.setState({teamMatchData: updateData})

//     //console.log(data)
//   }

//   renderTeamMatches = () => {
//     const {teamMatchData} = this.state
//     const {teamBannerUrl, lastMatches} = teamMatchData
//     //console.log(teamMatchData, lastMatches)
//     return (
//       <div className="responsive-container">
//         <img src={teamBannerUrl} alt="team banner" className="team-banner" />
//         <LatestMatch list={lastMatches} />
//       </div>
//     )
//   }
//   render() {
//     const {teamMatchData} = this.state
//     const {lastMatches, teamBannerUrl} = teamMatchData
//     //console.log(lastMatches)
//     return <>{this.renderTeamMatches()}</>
//   }
// }

// export default TeamMatches
