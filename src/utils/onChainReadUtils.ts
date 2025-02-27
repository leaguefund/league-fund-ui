/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContract } from 'viem'
import { tokenContract } from '../contracts/token'
import { factoryContract } from '../contracts/leagueFactory'
import { leagueContract } from '../contracts/league'
import { publicClient, walletClient } from './client'
import { WalletLeague } from '@/types/state'

export async function getTokenBalance(tokenAddress: `0x${string}`, account: `0x${string}`) {
    const contract = getContract({
        address: tokenAddress,
        abi: tokenContract.abi,
        client: { public: publicClient, wallet: walletClient }
    })

    const tokenBalance = await contract.read.balanceOf([account])
    const decimalBalance = Number(tokenBalance) / 1e6
    console.log("User USDC balance:", decimalBalance)
    return (decimalBalance)
}

export async function getLeagueNActiveTeams(leagueAddress: `0x${string}`) {
    const contract = getContract({
        address: leagueAddress,
        abi: leagueContract.abi,
        client: { public: publicClient, wallet: walletClient }
    })

    const activeTeams = await contract.read.getActiveTeams()
    console.log("Active teams for League:", activeTeams)
    return (activeTeams?.length)
}

export async function getUserLeagues(userAddress: `0x${string}`) {
    const contract = getContract({
        address: factoryContract.address,
        abi: factoryContract.abi,
        client: { public: publicClient, wallet: walletClient }
    })

    const allLeagues = await contract.read.getTeamLeagues([userAddress])

    const userLeagues = await Promise.all(
        allLeagues.map(async (league: any) => {
            if (league.joined) {
                return league
            }
            return undefined
        })
    ) as (WalletLeague | undefined)[]

    return userLeagues.filter((league): league is WalletLeague => league !== undefined)
}

export async function getLeagueTotalBalance(leagueAddress: `0x${string}`) {
    const contract = getContract({
        address: leagueAddress,
        abi: leagueContract.abi,
        client: { public: publicClient, wallet: walletClient }
    })

    const totalBalance = await contract.read.totalLeagueBalance()
    const decimalBalance = Number(totalBalance) / 1e6
    console.log("Total USDC balance for League:", decimalBalance)
    return (decimalBalance)
}

export async function getLeagueName(leagueAddress: `0x${string}`) {
    const contract = getContract({
        address: leagueAddress,
        abi: leagueContract.abi,
        client: { public: publicClient, wallet: walletClient }
    })

    const name = await contract.read.name()
    console.log("League name:", name)
    return (name)
}

export async function getLeagueDues(leagueAddress: `0x${string}`) {
    const contract = getContract({
        address: leagueAddress,
        abi: leagueContract.abi,
        client: { public: publicClient, wallet: walletClient }
    })

    const seasonData = await contract.read.currentSeason()
    const dues = Number(seasonData?.dues) / 1e6
    console.log("League dues:", dues)
    return (dues)
}