import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageURL} = teamDetails

  return (
    <li className="team-item">
      <Link to={`/team-matches/${id}`} className="link-item">
        <img src={teamImageURL} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard

// import {Link} from 'react-router-dom'

// const TeamCard = props => {
//   const {teamData} = props
//   const {id, teamName} = teamData

//   return (
//     <Link to={`/team-matches/${id}`}>
//       <p>{teamName}</p>
//     </Link>
//   )
// }
// export default TeamCard
