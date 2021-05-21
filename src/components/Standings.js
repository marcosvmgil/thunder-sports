import React, { useEffect, useState } from "react"
import { getDriverRankings, getTeamsRanking } from '../contexts/F1Context'
import { getStandingsByLeague } from "../contexts/NBAContext"
import "./Standings.css"
import { NBATeams } from './ComboOptions'

export default function Tabs(props) {
    const [toggleState, setToggleState] = useState(1)
    const [lesteTable, setLesteTable] = useState([])
    const [oesteTable, setOesteTable] = useState([])
    const [driversRankings, setDriversRankings] = useState([])
    const [teamsRankings, setTeamsRankings] = useState([])


    const isF1 = window.location.href.split("/")[3];

    const toggleTab = (index) => {
        setToggleState(index);
    }

    async function getDriverTable(year = 2021) {
        let table = await getDriverRankings(year)
        console.log(table)
        setDriversRankings(table)
    }

    async function getTeamTable(year = 2021) {
        let table = await getTeamsRanking(year)
        console.log(table)
        setTeamsRankings(table)
    }

    async function getTable(league = "standard", year = 2020) {
        let table = await getStandingsByLeague(league, year)
        console.log(table)
        const leste = [];
        const oeste = [];
        // dividir dados das tabelas
        table.forEach(element => {
            if (element.conference.name == "east")
                leste.push(element)
            else if (element.conference.name == "west")
                oeste.push(element)
        });

        leste.sort(function (a, b) {
            return parseInt(a.conference.rank) - parseInt(b.conference.rank)
        })
        oeste.sort(function (a, b) {
            return parseInt(a.conference.rank) - parseInt(b.conference.rank)
        })

        setLesteTable(leste);
        setOesteTable(oeste);
        console.log(leste)
        console.log(oeste)
    }

    function teamIdToName(id) {
        for (let i = 0; i < NBATeams.length; i++) {
            if (id == NBATeams[i].value)
                return NBATeams[i].label.split(" ")[NBATeams[i].label.split(" ").length - 1];
        }
    }

    // function streakToString(result) {
    //     result.winStreak ? 
    // }

    function MountTableF1Racers(props) {
        return (<table className="ResultTable">
                <thead>
                    <tr>
                        <th>Pos.</th>
                        <th>Piloto</th>
                        <th>Pontos</th>                      
                    </tr>
                </thead>
                {props.results.map((result, i) => (
                    <tbody>
                        <tr key={result.team.id} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{result.position}</td>
                            <td>{result.driver.name} <a style={{ 
                                fontSize: "10px",
                                marginBottom: "0px"
                                }}>
                                    {result.team.name}</a></td>
                            <td>{result.points}</td>
                        </tr>
                    </tbody>
                ))}
            </table>)
    }
    

    function MountTableF1Teams(props) {
        console.log(props)
            return (<table className="ResultTable">
                <thead>
                    <tr>
                        <th>Pos.</th>
                        <th>Equipe</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                {props.results.map((result, i) => (
                    <tbody>
                        <tr key={result.team.id} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{result.position}</td>
                            <td>{result.team.name}</td>
                            <td>{result.points}</td>
                        </tr>
                    </tbody>
                ))}
            </table>)
      
    }

    function MountTableNBA(props) {

        return (
            <table className="ResultTable">
                <thead>
                    <tr>
                        <th>Equipe</th>
                        <th>V</th>
                        <th>D</th>
                        <th>%</th>
                        <th>JA</th>
                        <th>Conf</th>
                        <th>Casa</th>
                        <th>Fora</th>
                        <th>Seq</th>
                    </tr>
                </thead>
                {props.results.map((result, i) => (
                    <tbody>
                        <tr key={result.teamId} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{i + 1 + " " + teamIdToName(result.teamId)}</td>
                            <td>{result.win}</td>
                            <td>{result.loss}</td>
                            <td>{result.winPercentage}</td>
                            <td>{result.gamesBehind}</td>
                            <td>{result.conference.win - result.conference.loss}</td>
                            <td>{result.home.win + "-" + result.home.loss}</td>
                            <td>{result.away.win + "-" + result.away.loss}</td>
                            <td>{result.winStreak === "1" ? (result.streak + "V") : (result.streak + "D")}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
        )
    }


    useEffect(() => {
        if (isF1 === "f1" || isF1 === "f1Season") {
            getTeamTable(props.year)
            getDriverTable(props.year)
        } else {
            getTable(props.league, props.year);
        }
    }, []);
    return (
        <div className="tabContainer">
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    {isF1 === "f1" || isF1 === "f1Season" ? "Atletas" : "Leste"}
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    {isF1 === "f1" || isF1 === "f1Season" ? "Equipes" : "Oeste"}
                </button>
            </div>
            <div className="content-tabs">
                <div className={toggleState === 1 ? "content active-content" : "content"}>
                    {isF1 === "f1" || isF1 === "f1Season" ? <MountTableF1Racers results={driversRankings} /> : <MountTableNBA results={lesteTable} />}
                </div>
                <div className={toggleState === 2 ? "content active-content" : "content"}>
                    {isF1 === "f1" || isF1 === "f1Season" ? <MountTableF1Teams results={teamsRankings} /> : <MountTableNBA results={oesteTable} />}
                </div>
            </div>
        </div>
    )
}