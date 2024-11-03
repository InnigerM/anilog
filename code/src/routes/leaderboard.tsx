import { createFileRoute } from '@tanstack/react-router'
import {Leaderboard} from "@/components/leaderboard";

export const Route = createFileRoute('/leaderboard')({
  component: LeaderboardComponent,
})

function LeaderboardComponent() {
  return <Leaderboard />
}
