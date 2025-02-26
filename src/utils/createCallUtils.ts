import { tokenContract } from '../contracts/token'
import { factoryContract } from '../contracts/leagueFactory'
import { leagueContract } from '../contracts/league'

export function getApproveCall (tokenAddress: `0x${string}`, spenderAddress: `0x${string}`, amount: number) {
    return {
        address: tokenAddress,
        abi: tokenContract.abi,
        functionName: 'approve',
        args: [spenderAddress, amount],
    }
}

export function getCreateLeagueCall (leagueName: string, dues: number, teamName: string) {
    return {
        address: factoryContract.address,
        abi: factoryContract.abi,
        functionName: 'createLeague',
        args: [leagueName, dues, teamName],
    }
}

export function getCreateSeasonCall (leagueAddress: `0x${string}`, dues: number) {
    return {
        address: leagueAddress,
        abi: leagueContract.abi,
        functionName: 'createSeason',
        args: [dues],
    }
}

export function getJoinLeagueCall (leagueAddress: `0x${string}`, teamName: string) {
    return {
        address: leagueAddress,
        abi: leagueContract.abi,
        functionName: 'joinSeason',
        args: [teamName],
    }
}

export function getAllocateRewardCall(leagueAddress: `0x${string}`, teamAddress: `0x${string}`, rewardName: string, amount: number) {
    return {
        address: leagueAddress,
        abi: leagueContract.abi,
        functionName: 'allocateReward',
        args: [teamAddress, rewardName, amount],
    }
}

export function getClaimRewardCall(leagueAddress: `0x${string}`, imgURLs: string[]) {
    return {
        address: leagueAddress,
        abi: leagueContract.abi,
        functionName: 'claimReward',
        args: [imgURLs],
    }
}

export function getDepositCall(leagueAddress: `0x${string}`, vaultAddress: `0x${string}`, amount: number) {
    return {
        address: leagueAddress,
        abi: leagueContract.abi,
        functionName: 'depositToVault',
        args: [vaultAddress, amount],
    }
}

export function getWithdrawCall(leagueAddress: `0x${string}`, vaultAddress: `0x${string}`, amount: number) {
    return {
        address: leagueAddress,
        abi: leagueContract.abi,
        functionName: 'withdrawFromVault',
        args: [vaultAddress, amount],
    }
}