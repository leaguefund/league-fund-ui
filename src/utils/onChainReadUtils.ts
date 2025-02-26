import { useReadContract } from 'wagmi'
import { tokenContract } from '../contracts/token'
import { factoryContract } from '../contracts/leagueFactory'
import { leagueContract } from '../contracts/league'

export function getTokenBalance(tokenAddress: `0x${string}`, account: `0x${string}`) {
    const { data: balance } = useReadContract({
        ...tokenContract,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [account],
    })
    const decimalBalance = Number(balance) / 1e6
    console.log("User USDC balance:", decimalBalance)
    return (decimalBalance)
}

export function getLeagueNActiveTeams(leagueAddress: `0x${string}`) {
    const { data: activeTeams } = useReadContract({
        ...leagueContract,
        address: leagueAddress,
        functionName: 'getActiveTeams',
        args: [],
    })
    console.log("Active teams for League:", activeTeams)
    return (activeTeams?.length)
}

export function getTeamLeagues(teamAddress: `0x${string}`) {
    const { data: leagues } = useReadContract({
        ...factoryContract,
        functionName: 'getTeamLeagues',
        args: [teamAddress],
    })

    let allLeagues = []
    if (leagues) {
        for (const league of leagues) {
            if (league.joined) {
                allLeagues.push(league)
            }
        }
    }
    console.log("All Leagues for User", allLeagues)
    return (allLeagues)
}

export function getLeagueTotalBalance(leagueAddress: `0x${string}`) {
    const { data: totalBalance } = useReadContract({
        ...leagueContract,
        address: leagueAddress,
        functionName: 'totalLeagueBalance',
        args: [],
    })
    const decimalBalance = Number(totalBalance) / 1e6
    console.log("Total USDC balance for League:", decimalBalance)
    return (decimalBalance)
}

export function getLeagueName(leagueAddress: `0x${string}`) {
    const { data: name } = useReadContract({
        ...leagueContract,
        address: leagueAddress,
        functionName: 'name',
        args: [],
    })
    console.log("League name:", name)
    return (name)
}